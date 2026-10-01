import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FileUpload } from "./FileUpload";

describe("FileUpload", () => {
  it("shows the select-file affordance when there is no value", () => {
    render(<FileUpload label="Banner" value={null} onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Selecionar arquivo" })).toBeInTheDocument();
  });

  it("shows preview and replace/remove actions when a value is set", () => {
    render(<FileUpload label="Banner" value="blob:preview" onChange={() => {}} />);
    expect(screen.getByAltText("Pré-visualização")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Substituir" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remover" })).toBeInTheDocument();
  });

  it("calls onChange with null when removed", async () => {
    const onChange = vi.fn();
    render(<FileUpload label="Banner" value="blob:preview" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Remover" }));
    expect(onChange).toHaveBeenCalledWith(null, null);
  });

  it("revokes the previous preview URL and lets the same file be picked again", async () => {
    const createObjectURL = vi.fn().mockReturnValueOnce("blob:1").mockReturnValueOnce("blob:2");
    const revokeObjectURL = vi.fn();
    vi.stubGlobal("URL", Object.assign(URL, { createObjectURL, revokeObjectURL }));
    const onChange = vi.fn();
    render(<FileUpload label="Banner" value={null} onChange={onChange} />);
    const input = screen.getByLabelText("Banner") as HTMLInputElement;
    const file = new File(["x"], "banner.png", { type: "image/png" });

    await userEvent.upload(input, file);
    expect(onChange).toHaveBeenLastCalledWith(file, "blob:1");
    expect(input.value).toBe("");

    await userEvent.upload(input, file);
    expect(onChange).toHaveBeenLastCalledWith(file, "blob:2");
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:1");
    vi.unstubAllGlobals();
  });
});
