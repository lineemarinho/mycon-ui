import MuiPagination from "@mui/material/Pagination";

export type PaginationProps = {
  page: number;
  count: number;
  onChange: (page: number) => void;
  size?: "small" | "medium" | "large";
};

export function Pagination({ page, count, onChange, size = "medium" }: PaginationProps) {
  return (
    <MuiPagination
      page={page}
      count={count}
      size={size}
      shape="rounded"
      onChange={(_, value) => onChange(value)}
    />
  );
}
