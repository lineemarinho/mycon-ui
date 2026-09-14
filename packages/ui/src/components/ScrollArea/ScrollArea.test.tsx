import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollArea } from "./ScrollArea";

describe("ScrollArea", () => {
  it("renders children", () => {
    render(
      <ScrollArea>
        <p>conteúdo</p>
      </ScrollArea>,
    );
    expect(screen.getByText("conteúdo")).toBeInTheDocument();
  });

  it("applies maxHeight based on offsetHeight", () => {
    render(
      <ScrollArea offsetHeight={100}>
        <p>conteúdo</p>
      </ScrollArea>,
    );
    const container = screen.getByText("conteúdo").parentElement;
    expect(container).toHaveStyle({ maxHeight: "calc(100vh - 100px)" });
  });
});
