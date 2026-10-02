import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
};

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 1,
        py: 4,
        px: 1.5,
        color: "text.secondary",
        "& .MuiSvgIcon-root": { fontSize: 32, color: "text.secondary" },
      }}>
      {icon}
      <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1rem", color: "text.primary" }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360, fontSize: "0.85rem" }}>
          {description}
        </Typography>
      )}
      {action}
    </Box>
  );
}
