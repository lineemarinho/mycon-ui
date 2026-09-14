import MuiTooltip from "@mui/material/Tooltip";

export type TooltipProps = {
  title: string;
  children: React.ReactElement;
  placement?: "top" | "bottom" | "left" | "right";
};

export function Tooltip({ title, children, placement = "top" }: TooltipProps) {
  return (
    <MuiTooltip title={title} placement={placement}>
      {children}
    </MuiTooltip>
  );
}
