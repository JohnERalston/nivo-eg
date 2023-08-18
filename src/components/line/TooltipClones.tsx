import React, { FC } from "react";
import { CloneToooltip } from "./cloneToolTip";
import { TooltipClone } from "./TooltipClone";

interface Props {
  clones: CloneToooltip[];
}

export const TooltipClones: FC<Props> = ({ clones }) => {
  return (
    <div>
      {clones.map((c) => (
        <TooltipClone key={c.point.id} html={c.html} id={c.point.id} />
      ))}
    </div>
  );
};
