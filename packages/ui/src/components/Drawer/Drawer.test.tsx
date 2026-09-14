import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("renders children when open", () => {
    render(
      <Drawer open onClose={() => {}}>
        <p>Conteúdo do drawer</p>
      </Drawer>,
    );
    expect(screen.getByText("Conteúdo do drawer")).toBeInTheDocument();
  });
});
