import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
};

export type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string | number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (field: string) => void;
  page?: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
};

/**
 * Tabela com ordenação e paginação padronizadas. Fecha o maior gap
 * encontrado na auditoria: nenhum dos 11 repos tinha um componente de
 * tabela — `NewconQuotaConferencia` (transferencias) e `renderTable`
 * (validador-tabelas, nem sequer um componente React exportável)
 * reimplementavam ordenação/paginação do zero (ver AUDITORIA.md).
 */
export function DataTable<T>({
  columns,
  rows,
  getRowId,
  sortField,
  sortOrder = "asc",
  onSortChange,
  page,
  pageCount,
  onPageChange,
  emptyMessage = "Nenhum registro encontrado.",
}: DataTableProps<T>) {
  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.sortable && onSortChange ? (
                  <TableSortLabel
                    active={sortField === column.key}
                    direction={sortField === column.key ? sortOrder : "asc"}
                    onClick={() => onSortChange(column.key)}
                  >
                    {column.header}
                  </TableSortLabel>
                ) : (
                  column.header
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <Typography color="text.secondary" align="center">
                  {emptyMessage}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={getRowId(row)}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render
                      ? column.render(row)
                      : String((row as Record<string, unknown>)[column.key] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {pageCount !== undefined && page !== undefined && onPageChange && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination count={pageCount} page={page} onChange={(_, value) => onPageChange(value)} />
        </Box>
      )}
    </Box>
  );
}
