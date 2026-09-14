import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        if (isLast || !item.href) {
          return (
            <Typography key={item.label} color={isLast ? "text.primary" : "text.secondary"}>
              {item.label}
            </Typography>
          );
        }
        return (
          <MuiLink key={item.label} href={item.href} underline="hover">
            {item.label}
          </MuiLink>
        );
      })}
    </MuiBreadcrumbs>
  );
}
