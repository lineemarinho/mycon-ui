import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("renders title, content and actions when open", () => {
    render(
      <Modal open onClose={() => {}} title="Detalhes" actions={<button>Fechar</button>}>
        <p>Conteúdo do modal</p>
      </Modal>,
    );
    expect(screen.getByText("Detalhes")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo do modal")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fechar" })).toBeInTheDocument();
  });

  it("renders nothing visible when closed", () => {
    render(
      <Modal open={false} onClose={() => {}} title="Detalhes">
        <p>Conteúdo do modal</p>
      </Modal>,
    );
    expect(screen.queryByText("Conteúdo do modal")).not.toBeInTheDocument();
  });
});
