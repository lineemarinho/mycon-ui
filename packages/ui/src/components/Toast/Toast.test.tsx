import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toast } from "./Toast";

describe("Toast", () => {
  it("renders the message when open", () => {
    render(<Toast open onClose={() => {}} message="Link copiado!" variant="success" />);
    expect(screen.getByText("Link copiado!")).toBeInTheDocument();
  });

  it("does not render the message when closed", () => {
    render(<Toast open={false} onClose={() => {}} message="Link copiado!" />);
    expect(screen.queryByText("Link copiado!")).not.toBeInTheDocument();
  });
});
