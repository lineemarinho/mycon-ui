import MuiAvatar from "@mui/material/Avatar";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

const SIZE_PX: Record<AvatarSize, number> = { xs: 20, sm: 28, md: 36, lg: 48, xl: 64 };

export type AvatarProps = {
  src?: string;
  initials?: string;
  size?: AvatarSize;
  shape?: "circle" | "square" | "rounded";
  alt?: string;
};

export function Avatar({ src, initials, size = "md", shape = "circle", alt }: AvatarProps) {
  const px = SIZE_PX[size];
  const borderRadius = shape === "circle" ? "50%" : shape === "rounded" ? "25%" : 0;

  return (
    <MuiAvatar src={src} alt={alt ?? initials} sx={{ width: px, height: px, borderRadius, fontSize: px * 0.4 }}>
      {!src && initials}
    </MuiAvatar>
  );
}
