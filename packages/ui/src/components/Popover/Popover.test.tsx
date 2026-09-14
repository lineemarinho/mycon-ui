import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Popover } from "./Popover";

describe("Popover", () => {
  it("renders children when open with an anchor", () => {
    const anchor = document.createElement("button");
    document.body.appendChild(anchor);
    render(
      <Popover open anchorEl={anchor} onClose={() => {}}>
        <p>Conteúdo do popover</p>
      </Popover>,
    );
    expect(screen.getByText("Conteúdo do popover")).toBeInTheDocument();
  });
});
