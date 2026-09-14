import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AvatarGroup } from "./AvatarGroup";

describe("AvatarGroup", () => {
  it("renders an overflow indicator beyond max", () => {
    render(
      <AvatarGroup
        max={2}
        avatars={[
          { initials: "A" },
          { initials: "B" },
          { initials: "C" },
        ]}
      />,
    );
    expect(screen.getByText("+2")).toBeInTheDocument();
  });
});
