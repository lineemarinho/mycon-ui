import { Children, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { IconActionButton } from "../IconActionButton/IconActionButton";
import { semanticColors, surfaceColors, type SemanticColor } from "../../tokens/colors";
import { radius } from "../../tokens/radius";

/** Nº recomendado de colunas `KeyValueItem` por linha antes de precisar de `expandedContent`. */
export const LIST_ITEM_CARD_MAX_COLUMNS = 6;

export type ListItemCardMenuItem = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export type ListItemCardProps = {
  /** Cor da barra lateral (semântica de status), opcional. */
  status?: SemanticColor;
  /** Colunas `KeyValueItem`. Recomendado no máximo `LIST_ITEM_CARD_MAX_COLUMNS` (6) — além disso, use `expandedContent`. */
  children: React.ReactNode;
  /** Ações extras exibidas antes do botão de info/menu (ex.: outro `IconActionButton`). Pode ser mais de uma. */
  actions?: React.ReactNode[];
  /** Conteúdo exibido ao clicar no botão de info (ícone "i") — injeta o toggle automaticamente. */
  expandedContent?: React.ReactNode;
  /** Itens do menu hambúrguer — injeta o botão de menu automaticamente. */
  menuItems?: ListItemCardMenuItem[];
};

export type KeyValueItemProps = {
  title: string;
  value: React.ReactNode;
  /** Borda divisória à direita do item. Default true. */
  showBorder?: boolean;
  minWidth?: number;
  flex?: string;
};

/**
 * Célula "label + valor" usada dentro de um `ListItemCard`. Unifica o
 * `ListInfoItem`/`CardInfoItem`/`DataCell` reimplementado em pelo menos 9
 * dos 11 repos auditados (ver AUDITORIA.md — duplicação #2).
 */
export function KeyValueItem({ title, value, showBorder = true, minWidth = 160, flex = "1 1 160px" }: KeyValueItemProps) {
  return (
    <Box
      sx={{
        flex,
        minWidth,
        borderRight: showBorder ? `1px solid ${surfaceColors.border}` : "none",
        pr: showBorder ? 2 : 0,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h6" fontWeight={700} noWrap>
        {value}
      </Typography>
    </Box>
  );
}

/**
 * Card de item de lista com barra lateral colorida por status, colunas de
 * informação e ações à direita (info expansível + menu hambúrguer). Unifica
 * o padrão "row card com barra de status + colunas + info/menu" — o mais
 * repetido de toda a auditoria (HistoricoLanceItemCard, AnaliseListItem,
 * BlackListList, card de proposta em gestao-propostas, entre outros — ver
 * AUDITORIA.md §3). Compõe `KeyValueItem` como children.
 *
 * `children` deveria ter no máximo `LIST_ITEM_CARD_MAX_COLUMNS` (6) colunas
 * visíveis — dados extras vão em `expandedContent`, revelado pelo botão de
 * info. Em dev, um aviso no console sinaliza se esse limite for excedido.
 */
export function ListItemCard({ status, children, actions, expandedContent, menuItems }: ListItemCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const isProduction = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV === "production";
  if (!isProduction) {
    const columnCount = Children.count(children);
    if (columnCount > LIST_ITEM_CARD_MAX_COLUMNS) {
      // eslint-disable-next-line no-console
      console.warn(
        `ListItemCard: ${columnCount} colunas informativas — recomendado no máximo ${LIST_ITEM_CARD_MAX_COLUMNS}. Mova o excedente para "expandedContent".`,
      );
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: surfaceColors.raised,
        borderRadius: radius.md,
        borderLeft: status ? `8px solid ${semanticColors[status]}` : "none",
        boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, flex: 1 }}>{children}</Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
          {actions}
          {expandedContent && (
            <IconActionButton
              label={expanded ? "Ocultar detalhes" : "Ver detalhes"}
              icon={<InfoOutlinedIcon fontSize="small" />}
              onClick={() => setExpanded((prev) => !prev)}
            />
          )}
          {menuItems && menuItems.length > 0 && (
            <>
              <IconActionButton
                label="Mais ações"
                color="primary"
                icon={<MenuIcon fontSize="small" />}
                onClick={(event) => setMenuAnchor(event.currentTarget)}
              />
              <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    disabled={item.disabled}
                    onClick={() => {
                      setMenuAnchor(null);
                      item.onClick();
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Box>
      </Box>
      {expandedContent && (
        <Collapse in={expanded}>
          <Box sx={{ borderTop: `1px solid ${surfaceColors.border}`, p: 2 }}>{expandedContent}</Box>
        </Collapse>
      )}
    </Box>
  );
}
