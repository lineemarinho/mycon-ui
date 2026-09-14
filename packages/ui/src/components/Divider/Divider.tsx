import MuiDivider from "@mui/material/Divider";

export type DividerProps = {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed";
  children?: React.ReactNode;
};

export function Divider({ orientation = "horizontal", variant = "solid", children }: DividerProps) {
  return (
    <MuiDivider
      orientation={orientation}
      flexItem={orientation === "vertical"}
      sx={{ borderStyle: variant === "dashed" ? "dashed" : "solid" }}
    >
      {children}
    </MuiDivider>
  );
}
