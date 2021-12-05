/** @flow */

import type { RawData } from './types';

import React from 'react';
import { minWidthToDisplayText } from './constants';

import styles from './LabeledRect.css';

type Props = {|
  backgroundColor: string,
  color: string,
  containerWidth: number,
  disableDefaultTooltips: boolean,
  height: number,
  isDimmed?: boolean,
  label: string,
  onClick: Function,
  onMouseEnter: (event: SyntheticMouseEvent<*>, node: RawData) => void,
  onMouseLeave: (event: SyntheticMouseEvent<*>, node: RawData) => void,
  onMouseMove: (event: SyntheticMouseEvent<*>, node: RawData) => void,
  tooltip?: string,
  width: number,
  x: number,
  y: number,
|};

const LabeledRect = ({
  backgroundColor,
  color,
  containerWidth,
  disableDefaultTooltips,
  height,
  isDimmed = false,
  label,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  tooltip,
  width,
  x,
  y,
}: Props) => {
  // Aligning rects with the left border simplifies horizontal text alignment.
  // Otherwise, we would have to add left padding to ensure the text remains visible,
  // But width and padding animations would not line up, since their deltas would differ.
  // This approach is simpler and looks visually consistent.
  if (x < 0) {
    width += x;
    x = 0;
  }

  // Fake a border by shrinking the rect slightly.
  height -= 1;
  width = Math.min(width, containerWidth) - 1;

  // Fake opacity dim for nodes above the selected ones.
  // Using a filter prevents text from bleeding into other texts during animation.
  // See GitHub issue 1.
  const filter = isDimmed ? 'brightness(115%) grayscale(50%)' : undefined;

  return (
    <div
      className={styles.div}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      style={{
        backgroundColor,
        color,
        height,
        filter,
        transform: `translate(${x}px, ${y}px)`,
        width,
      }}
      title={disableDefaultTooltips ? null : tooltip != null ? tooltip : label}
    >
      &nbsp;{width >= minWidthToDisplayText ? label : ''}
    </div>
  );
  /*
  <g
    className={styles.g}
    transform={`translate(${x},${y})`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onMouseMove={onMouseMove}
  >
    {disableDefaultTooltips ? null : (
      <title>{tooltip != null ? tooltip : label}</title>
    )}
    <rect width={width} height={height} fill="white" className={styles.rect} />
    <rect
      width={width}
      height={height}
      fill={backgroundColor}
      onClick={onClick}
      className={styles.rect}
      style={{
        opacity: isDimmed ? 0.5 : 1,
      }}
    />
    {width >= minWidthToDisplayText && (
      <foreignObject
        width={width}
        height={height}
        className={styles.foreignObject}
        style={{
          opacity: isDimmed ? 0.75 : 1,
          paddingLeft: x < 0 ? -x : 0,
        }}
        y={height < textHeight ? -textHeight : 0}
      >
        <div className={styles.div} style={{ color }}>
          {label}
        </div>
      </foreignObject>
    )}
  </g>
  */
};

export default LabeledRect;
