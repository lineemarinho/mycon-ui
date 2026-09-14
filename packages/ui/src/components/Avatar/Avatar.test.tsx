import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders initials when there is no image", () => {
    render(<Avatar initials="FS" />);
    expect(screen.getByText("FS")).toBeInTheDocument();
  });

  it("renders the image when src is provided", () => {
    render(<Avatar src="/foto.jpg" alt="Fulano" />);
    expect(screen.getByRole("img", { name: "Fulano" })).toBeInTheDocument();
  });
});
