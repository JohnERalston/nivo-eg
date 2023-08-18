import {
  createElement,
  MouseEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { animated, to } from "@react-spring/web";
import { Container, useTheme } from "@nivo/core";
import { useTooltip } from "@nivo/tooltip";
import { BarDatum, BarItemProps } from "@nivo/bar";
// import { BarDatum, BarItemProps } from './types'

export const BarItem = <RawDatum extends BarDatum>({
  bar: { data, ...bar },

  style: {
    borderColor,
    color,
    height,
    labelColor,
    labelOpacity,
    labelX,
    labelY,
    transform,
    width,
  },

  borderRadius,
  borderWidth,

  label,
  shouldRenderLabel,

  isInteractive,
  onClick,
  onMouseEnter,
  onMouseLeave,

  tooltip,

  isFocusable,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
}: BarItemProps<RawDatum>) => {
  const [tooltipPinned, setTooltipPinned] = useState(false);
  const theme = useTheme();
  const { showTooltipFromEvent, showTooltipAt, hideTooltip } = useTooltip();

  const renderTooltip = useMemo(
    () => () => {
      const tt = (
        <div id={`${data.id}_tt`}>
          {createElement(tooltip, { ...bar, ...data })}
        </div>
      );
      return tt;
    },
    [tooltip, bar, data]
  );

  const handleClick = useCallback(
    (event: MouseEvent<SVGRectElement>) => {
      onClick?.({ color: bar.color, ...data }, event);
      showTooltipFromEvent(renderTooltip(), event);
      setTooltipPinned(true);
      // showTooltipFromEvent(() => <div>hello</div>, event);
    },
    [bar, data, onClick]
  );
  const handleTooltip = useCallback(
    (event: MouseEvent<SVGRectElement>) => {
      if (tooltipPinned) {
        return;
      }
      return showTooltipFromEvent(renderTooltip(), event);
    },
    [showTooltipFromEvent, renderTooltip]
  );
  const handleMouseEnter = useCallback(
    (event: MouseEvent<SVGRectElement>) => {
      if (tooltipPinned) {
        return;
      }
      onMouseEnter?.(data, event);
      showTooltipFromEvent(renderTooltip(), event);
    },
    [data, onMouseEnter, showTooltipFromEvent, renderTooltip]
  );
  const handleMouseLeave = useCallback(
    (event: MouseEvent<SVGRectElement>) => {
      if (tooltipPinned) {
        return;
      }

      onMouseLeave?.(data, event);
      hideTooltip();
    },
    [data, hideTooltip, onMouseLeave]
  );

  // extra handlers to allow keyboard navigation
  const handleFocus = useCallback(() => {
    if (tooltipPinned) {
      return;
    }
    showTooltipAt(renderTooltip(), [bar.absX + bar.width / 2, bar.absY]);
  }, [showTooltipAt, renderTooltip, bar]);
  const handleBlur = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);

  return (
    <animated.g transform={transform}>
      <animated.rect
        width={to(width, (value) => Math.max(value, 0))}
        height={to(height, (value) => Math.max(value, 0))}
        rx={borderRadius}
        ry={borderRadius}
        fill={data.fill ?? color}
        strokeWidth={borderWidth}
        stroke={borderColor}
        focusable={isFocusable}
        tabIndex={isFocusable ? 0 : undefined}
        aria-label={ariaLabel ? ariaLabel(data) : undefined}
        aria-labelledby={ariaLabelledBy ? ariaLabelledBy(data) : undefined}
        aria-describedby={ariaDescribedBy ? ariaDescribedBy(data) : undefined}
        onMouseEnter={isInteractive ? handleMouseEnter : undefined}
        onMouseMove={isInteractive ? handleTooltip : undefined}
        onMouseLeave={isInteractive ? handleMouseLeave : undefined}
        onClick={isInteractive ? handleClick : undefined}
        onFocus={isInteractive && isFocusable ? handleFocus : undefined}
        onBlur={isInteractive && isFocusable ? handleBlur : undefined}
      />
      {shouldRenderLabel && (
        <animated.text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          dominantBaseline="central"
          fillOpacity={labelOpacity}
          style={{
            ...theme.labels.text,
            pointerEvents: "none",
            fill: labelColor,
          }}
        >
          {label}
        </animated.text>
      )}
    </animated.g>
  );
};
