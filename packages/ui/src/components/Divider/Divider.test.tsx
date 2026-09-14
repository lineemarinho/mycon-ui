import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders a centered label when children are provided", () => {
    render(<Divider>ou</Divider>);
    expect(screen.getByText("ou")).toBeInTheDocument();
  });
});
