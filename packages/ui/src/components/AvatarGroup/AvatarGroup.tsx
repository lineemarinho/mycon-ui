import MuiAvatarGroup from "@mui/material/AvatarGroup";
import { Avatar, type AvatarSize } from "../Avatar/Avatar";
import { surfaceColors } from "../../tokens/colors";

export type AvatarGroupItem = {
  src?: string;
  initials?: string;
  alt?: string;
};

export type AvatarGroupProps = {
  avatars: AvatarGroupItem[];
  max?: number;
  size?: AvatarSize;
};

export function AvatarGroup({ avatars, max = 4, size = "md" }: AvatarGroupProps) {
  return (
    <MuiAvatarGroup
      max={max}
      spacing={10}
      slotProps={{ surplus: { sx: { bgcolor: surfaceColors.raised, color: "text.secondary", fontSize: 12 } } }}
    >
      {avatars.map((avatar, index) => (
        <Avatar key={avatar.alt ?? index} src={avatar.src} initials={avatar.initials} alt={avatar.alt} size={size} />
      ))}
    </MuiAvatarGroup>
  );
}
