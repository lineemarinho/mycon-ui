import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renderiza o SVG acessível com o título", () => {
    render(<Logo />);
    expect(screen.getByRole("img", { name: "Mycon" })).toBeInTheDocument();
  });

  it("aplica a cor escolhida aos paths", () => {
    const { container } = render(<Logo color="white" />);
    container.querySelectorAll("path").forEach((path) => expect(path.getAttribute("fill")).toBe("#FFFFFF"));
  });
});
