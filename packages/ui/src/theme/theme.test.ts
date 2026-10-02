import { describe, expect, it } from "vitest";
import { myconTheme } from "./theme";
import { fontFamilies } from "../tokens/typography";

describe("myconTheme", () => {
  it("usa Raleway no texto e Montserrat em títulos e botões", () => {
    expect(myconTheme.typography.fontFamily).toBe(fontFamilies.body);
    expect(myconTheme.typography.body1.fontFamily).toBe(fontFamilies.body);
    expect(myconTheme.typography.h1.fontFamily).toBe(fontFamilies.heading);
    expect(myconTheme.typography.h6.fontFamily).toBe(fontFamilies.heading);
    expect(myconTheme.typography.button.fontFamily).toBe(fontFamilies.heading);
  });
});
