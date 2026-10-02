import { describe, expect, it } from "vitest";
import { myconTheme } from "./theme";
import { fontFamilies } from "../tokens/typography";
import { brandColors } from "../tokens/colors";

describe("myconTheme", () => {
  it("usa Raleway no texto e Montserrat em h1–h3 e botões", () => {
    expect(myconTheme.typography.fontFamily).toBe(fontFamilies.body);
    expect(myconTheme.typography.body1.fontFamily).toBe(fontFamilies.body);
    expect(myconTheme.typography.h1.fontFamily).toBe(fontFamilies.heading);
    expect(myconTheme.typography.h3.fontFamily).toBe(fontFamilies.heading);
    expect(myconTheme.typography.h6.fontFamily).toBe(fontFamilies.body);
    expect(myconTheme.typography.button.fontFamily).toBe(fontFamilies.heading);
  });
});

describe("myconTheme paleta", () => {
  it("usa as cores de marca do design system", () => {
    expect(myconTheme.palette.primary.main).toBe(brandColors.primary);
    expect(myconTheme.palette.text.primary).toBe(brandColors.darkPrimary);
  });
});
