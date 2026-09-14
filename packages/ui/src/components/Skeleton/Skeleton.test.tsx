import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders without crashing with custom dimensions", () => {
    const { container } = render(<Skeleton variant="rectangular" width={120} height={40} />);
    expect(container.querySelector(".MuiSkeleton-root")).toBeInTheDocument();
  });
});
