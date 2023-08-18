import { BarTooltipProps } from "@nivo/bar";
import { BasicTooltip } from "@nivo/tooltip";
import { FC } from "react";
// import { ResponsiveBar, BarTooltipDatum } from '@nivo/bar';

interface Props {
  // bar: {
  id: string | number;
  value: number;
  formattedValue: string;
  index: number;
  indexValue: string | number;
  // datum associated to the current index (raw data)
  data: object;
  // };
  color: string;
  label: string;
}

// export const MyTooltip: FC<Props> = (props: Props) => {
//   return (
//     <div>
//       <h4>{props.bar.value}</h4>
//     </div>
//   );
// };

export const MyTooltip: React.FunctionComponent<
  BarTooltipProps<{ [key: string]: string }>
> = (props) => {
  // const dayStr = dayjs(props.data.month).format('ll');
  return (
    <div id={props.id + ""}>
      hello {props.value} | {props.color}
    </div>
  );
};
