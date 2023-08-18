import React, { FC } from "react";
import { removeTooltip } from "./cloneToolTip";

interface Props {
  id: string;
  html: string;
}

export const TooltipClone: FC<Props> = ({ html, id }) => {
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

// export const TooltipClone: FC<Props> = ({ html, id }) => {
// //   const node = new DOMParser().parseFromString(html, "text/html");
// //   const d = node.documentElement.querySelector("div:first-child");
// //   const style = d?.getAttribute("style");
// //   const newHtml = d?.innerHTML || "<div>Error</div>";

//   //   console.log(style);

//   //   console.log({ d });
//   return (
//     // <div STYLE={style}>

//     //   <button style={{ zIndex: 100 }} onClick={() => removeTooltip(id)}>
//         {/* X
//       </button> */}
//       <div dangerouslySetInnerHTML={{ __html: html }}></div>
//     {/* /</button></div> */}
//   );
// };
