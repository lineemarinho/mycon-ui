import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders links for all but the last item", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Propostas", href: "/propostas" },
          { label: "Detalhe" },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "Propostas" })).toBeInTheDocument();
    expect(screen.getByText("Detalhe")).toBeInTheDocument();
  });
});
