import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { KeyValueItem, ListItemCard } from "./ListItemCard";

describe("KeyValueItem", () => {
  it("renders title and value", () => {
    render(<KeyValueItem title="CPF" value="000.000.000-00" />);
    expect(screen.getByText("CPF")).toBeInTheDocument();
    expect(screen.getByText("000.000.000-00")).toBeInTheDocument();
  });
});

describe("ListItemCard", () => {
  it("renders children and custom actions", () => {
    render(
      <ListItemCard status="success" actions={[<button key="edit">Editar</button>]}>
        <KeyValueItem title="Nome" value="Fulano" />
      </ListItemCard>,
    );
    expect(screen.getByText("Fulano")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Editar" })).toBeInTheDocument();
  });

  it("toggles expandedContent via the info button", async () => {
    render(
      <ListItemCard expandedContent={<p>Detalhes completos</p>}>
        <KeyValueItem title="Nome" value="Fulano" />
      </ListItemCard>,
    );
    expect(screen.queryByText("Detalhes completos")).not.toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: "Ver detalhes" }));
    expect(screen.getByText("Detalhes completos")).toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: "Ocultar detalhes" }));
  });

  it("opens the hamburger menu and calls the clicked item's onClick", async () => {
    const onDelete = vi.fn();
    render(
      <ListItemCard menuItems={[{ label: "Excluir", onClick: onDelete }]}>
        <KeyValueItem title="Nome" value="Fulano" />
      </ListItemCard>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Mais ações" }));
    await userEvent.click(await screen.findByText("Excluir"));
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it("warns in dev when more than 6 columns are passed", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <ListItemCard>
        {Array.from({ length: 7 }, (_, i) => (
          <KeyValueItem key={i} title={`Campo ${i}`} value={i} />
        ))}
      </ListItemCard>,
    );
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("colunas informativas"));
    warnSpy.mockRestore();
  });
});
