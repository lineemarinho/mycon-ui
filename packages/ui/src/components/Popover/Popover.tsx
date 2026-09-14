import MuiPopover from "@mui/material/Popover";
import Box from "@mui/material/Box";

export type PopoverProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  children: React.ReactNode;
};

export function Popover({ open, anchorEl, onClose, children }: PopoverProps) {
  return (
    <MuiPopover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Box sx={{ p: 2 }}>{children}</Box>
    </MuiPopover>
  );
}
