import MuiSkeleton from "@mui/material/Skeleton";

export type SkeletonProps = {
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: number | string;
  height?: number | string;
};

export function Skeleton({ variant = "text", width, height }: SkeletonProps) {
  return <MuiSkeleton variant={variant} width={width} height={height} animation="wave" />;
}
