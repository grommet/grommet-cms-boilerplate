/* @flow */

export type LayoutProps = {
  children: any,
  section: {
    basis?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "full" | "1/2" | "1/3" | "2/3" | "1/4" | "3/4",
    pad?: "small" | "medium" | "large" | "none",
    direction?: "row" | "column",
    wrap?: boolean,
    justify?: "start" | "center" | "between" | "end",
    align?: "start" | "center" | "end" | "baseline" | "stretch",
    full?: "horizontal" | "vertical" | boolean
  },
  box: {
    pad?: "small" | "medium" | "large" | "none",
    size?: "auto" | "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "full",
    flex?: "grow" | "shrink" | boolean
  }
}
