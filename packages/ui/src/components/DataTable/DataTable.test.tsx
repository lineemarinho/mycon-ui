import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTable, type DataTableColumn } from "./DataTable";

type Row = { id: number; nome: string; status: string };

const columns: DataTableColumn<Row>[] = [
  { key: "nome", header: "Nome", sortable: true },
  { key: "status", header: "Status" },
];

const rows: Row[] = [
  { id: 1, nome: "Fulano", status: "Ativo" },
  { id: 2, nome: "Ciclano", status: "Pendente" },
];

describe("DataTable", () => {
  it("renders rows and columns", () => {
    render(<DataTable columns={columns} rows={rows} getRowId={(r) => r.id} />);
    expect(screen.getByText("Fulano")).toBeInTheDocument();
    expect(screen.getByText("Pendente")).toBeInTheDocument();
  });

  it("shows the empty message when there are no rows", () => {
    render(<DataTable columns={columns} rows={[]} getRowId={(r) => r.id} emptyMessage="Vazio" />);
    expect(screen.getByText("Vazio")).toBeInTheDocument();
  });

  it("calls onSortChange when a sortable header is clicked", async () => {
    const onSortChange = vi.fn();
    render(
      <DataTable columns={columns} rows={rows} getRowId={(r) => r.id} onSortChange={onSortChange} sortField="nome" />,
    );
    await userEvent.click(screen.getByText("Nome"));
    expect(onSortChange).toHaveBeenCalledWith("nome");
  });

  it("calls onPageChange when pagination changes", async () => {
    const onPageChange = vi.fn();
    render(
      <DataTable
        columns={columns}
        rows={rows}
        getRowId={(r) => r.id}
        page={1}
        pageCount={3}
        onPageChange={onPageChange}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Go to page 2" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
