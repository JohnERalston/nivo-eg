import { Point } from "@nivo/line";
import { createStore } from "outer-state";

export interface CloneToooltip {
  html: string;
  point: Point;
  event: React.MouseEvent<Element, MouseEvent>;
}

export interface CloneTooltips {
  tooltips: CloneToooltip[];
}

export const toolTipStore = createStore<CloneTooltips>({ tooltips: [] });

export function addToolTip(
  chartId: string,
  point: Point,
  event: React.MouseEvent<Element, MouseEvent>
) {
  const cont = document.getElementById(chartId);
  const ttCont = cont?.querySelector("svg+div")?.outerHTML;

  //TODO : - change the id to remove the duplicate id
  const { tooltips } = toolTipStore.data();
  tooltips.push({ html: ttCont!, point, event });

  toolTipStore.updateStore({ tooltips });
}

export function removeTooltip(pointId: string) {
  const { tooltips } = toolTipStore.data();
  const newTooltips = tooltips.filter((t) => t.point.id !== pointId);
  toolTipStore.updateStore({ tooltips: newTooltips });
}

function escapeListener(event: any) {
  if (event.key === "Escape") {
    toolTipStore.updateStore({ tooltips: [] });
  }
}

export function resetTooltips(e: any) {
  e.preventDefault();
  toolTipStore.updateStore({ tooltips: [] });
}

if (window) {
  window.document.addEventListener("keydown", escapeListener, false);
}
