import { describe, expect, test } from "vitest";
import { renderMarkdown } from "./markdown";

describe("renderMarkdown", () => {
  test("renders headings, emphasis and lists", () => {
    const html = renderMarkdown("## Judul\n\nTeks *miring* dan **tebal**.\n\n- satu\n- dua");
    expect(html).toContain("<h2>Judul</h2>");
    expect(html).toContain("<em>miring</em>");
    expect(html).toContain("<strong>tebal</strong>");
    expect(html).toContain("<li>satu</li>");
  });

  test("supports GFM tables", () => {
    const html = renderMarkdown("| A | B |\n|---|---|\n| 1 | 2 |");
    expect(html).toContain("<table>");
    expect(html).toContain("<td>1</td>");
  });

  test("drops raw HTML instead of passing it through", () => {
    const html = renderMarkdown('Halo <script>alert(1)</script><img src=x onerror="alert(1)">');
    expect(html).not.toContain("<script");
    expect(html).not.toContain("onerror");
    expect(html).not.toContain("<img");
    expect(html).toContain("Halo");
  });

  test("neutralises javascript: links", () => {
    const html = renderMarkdown("[klik](javascript:alert(1))");
    expect(html).not.toMatch(/javascript:/i);
  });

  test("returns an empty string for empty input", () => {
    expect(renderMarkdown("   ")).toBe("");
  });
});
