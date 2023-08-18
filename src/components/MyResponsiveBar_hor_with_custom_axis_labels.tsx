// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@nivo/core";
import { barData } from "./barData";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsiveBar = () => {
  return (
    <div style={{ height: "90vh", width: "80vw" }}>
      <ResponsiveBar
        data={barData}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 160 }}
        padding={0.3}
        layout="horizontal"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -1000,
          renderTick: ({
            opacity,
            textAnchor,
            textBaseline,
            textX,
            textY,
            value,
            x,
            y,
            animatedProps,
            format,
          }) => {
            const theme = useTheme();
            return (
              <g transform={`translate(${x},${y})`} style={{ opacity }}>
                <text
                  alignmentBaseline={textBaseline}
                  style={theme?.axis.ticks.text}
                  // style={animatedProps}

                  textAnchor={textAnchor}
                  transform={`translate(${textX},${textY})`}
                >
                  {getTspanGroups(value)}
                </text>
              </g>
            );
          },
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return (
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          );
        }}
      />
    </div>
  );
};

function getTspanGroups(value: string) {
  const [val, sub] = value.split("|");
  return (
    <>
      <tspan style={{ fontWeight: "bold" }} x="0" dy="-8">
        {val} etc
      </tspan>
      <tspan x="0" dy="20">
        {sub}
      </tspan>
    </>
  );
}

function getTspanGroupsOrig(
  value: string,
  maxLineLength: number = 1,
  maxLines: number = 2
) {
  const words = value.split(" ");

  type linesAcc = {
    lines: string[];
    currLine: string;
  };

  //reduces the words into lines of maxLineLength
  const assembleLines: linesAcc = words.reduce(
    (acc: linesAcc, word: string) => {
      //if the current line isn't empty and the word + current line is larger than the allowed line size, create a new line and update current line
      if ((word + acc.currLine).length > maxLineLength && acc.currLine !== "") {
        return {
          lines: acc.lines.concat([acc.currLine]),
          currLine: word,
        };
      }
      //otherwise add the word to the current line
      return {
        ...acc,
        currLine: acc.currLine + " " + word,
      };
    },
    { lines: [], currLine: "" }
  );

  //add the ending state of current line (the last line) to lines
  const allLines = assembleLines.lines.concat([assembleLines.currLine]);

  //for now, only take first 2 lines due to tick spacing and possible overflow
  const lines = allLines.slice(0, maxLines);
  let children: JSX.Element[] = [];
  let dy = 0;

  lines.forEach((lineText, i) => {
    children.push(
      <tspan x={0} dy={dy} key={i}>
        {
          // if on the second line, and that line's length is within 3 of the max length, add ellipsis
          1 === i && allLines.length > 2
            ? lineText.slice(0, maxLineLength - 3) + "..."
            : lineText
        }
      </tspan>
    );
    //increment dy to render next line text below
    dy += 15;
  });

  return children;
}
