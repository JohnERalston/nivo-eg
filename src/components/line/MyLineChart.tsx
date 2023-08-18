// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { Point, ResponsiveLine } from "@nivo/line";
import { addToolTip, resetTooltips, toolTipStore } from "./cloneToolTip";
import { lineData } from "./lineData";
import { TooltipClones } from "./TooltipClones";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const MyResponsiveLine = () => {
  function onLineClicked(
    point: Point,
    event: React.MouseEvent<Element, MouseEvent>
  ) {
    addToolTip("myLineChart", point, event);
  }

  const { tooltips } = toolTipStore.useStore();

  return (
    <div>
      <div style={{ paddingTop: "20px", paddingBottom: "5px" }}>
        <div>
          <strong>Nivo</strong>
        </div>
        <div>
          <em>Click a data point to pin the tooltip</em>
        </div>
        <div>
          <em>Hit escape to clear all pinned tooltips</em>
        </div>
        <div>
          <em>(Proof of concept only)</em>
        </div>
      </div>

      <div
        style={{ height: "600px", width: "60vw", position: "relative" }}
        id="myLineChart"
      >
        <ResponsiveLine
          data={lineData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "transportation",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          onClick={onLineClicked}
        />
        <div style={{ textAlign: "right", paddingBottom: "500px" }}>
          <h4>
            <a href="" onClick={resetTooltips}>
              Clear Pinned Tooltips
            </a>
          </h4>
        </div>

        <TooltipClones clones={tooltips} />
      </div>
    </div>
  );
};
