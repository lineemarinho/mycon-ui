import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DetailsCard } from "./DetailsCard";

describe("DetailsCard", () => {
  it("renders every row's label and value", () => {
    render(
      <DetailsCard
        rows={[
          { label: "Contrato", value: "00123.4" },
          { label: "Valor", value: "R$ 1.240,00" },
        ]}
      />,
    );
    expect(screen.getByText("Contrato")).toBeInTheDocument();
    expect(screen.getByText("R$ 1.240,00")).toBeInTheDocument();
  });
});
