import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";

export type TabItem = {
  value: string;
  label: string;
};

export type TabsProps = {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
};

export function Tabs({ items, value, onChange }: TabsProps) {
  return (
    <MuiTabs value={value} onChange={(_, next) => onChange(next)}>
      {items.map((item) => (
        <MuiTab key={item.value} value={item.value} label={item.label} />
      ))}
    </MuiTabs>
  );
}
