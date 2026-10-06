import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { dict } from "../i18n.tsx";
import type { Lang } from "../i18n.tsx";

describe("Localization Consistency and Parity Audit", () => {
  const baseLocale: Lang = "ru";
  const supportedLocales: Lang[] = ["ru", "ro", "en"];
  const baseKeys = Object.keys(dict[baseLocale]);

  it("should have all supported languages defined with keys", () => {
    for (const locale of supportedLocales) {
      expect(dict[locale]).toBeDefined();
      expect(Object.keys(dict[locale]).length).toBeGreaterThan(0);
    }
  });

  it("should have total key count parity across all locales", () => {
    const ruCount = Object.keys(dict.ru).length;
    const roCount = Object.keys(dict.ro).length;
    const enCount = Object.keys(dict.en).length;

    expect(roCount, `RO key count (${roCount}) should match RU (${ruCount})`).toBe(ruCount);
    expect(enCount, `EN key count (${enCount}) should match RU (${ruCount})`).toBe(ruCount);
  });

  it("should have no missing keys in any locale compared to base locale (RU)", () => {
    for (const locale of supportedLocales) {
      if (locale === baseLocale) continue;
      const localeKeys = new Set(Object.keys(dict[locale]));
      const missingKeys = baseKeys.filter(k => !localeKeys.has(k));

      expect(
        missingKeys,
        `Locale '${locale}' is missing keys present in base '${baseLocale}': ${missingKeys.slice(0, 10).join(", ")}`
      ).toEqual([]);
    }
  });

  it("should have no extra/orphan keys in secondary locales that are missing from base locale (RU)", () => {
    const baseSet = new Set(baseKeys);

    for (const locale of supportedLocales) {
      if (locale === baseLocale) continue;
      const localeKeys = Object.keys(dict[locale]);
      const extraKeys = localeKeys.filter(k => !baseSet.has(k));

      expect(
        extraKeys,
        `Locale '${locale}' has extra keys not present in base '${baseLocale}': ${extraKeys.slice(0, 10).join(", ")}`
      ).toEqual([]);
    }
  });

  it("should have no empty translation values in any supported locale", () => {
    for (const locale of supportedLocales) {
      const emptyKeys = Object.entries(dict[locale])
        .filter(([k, v]) => v === "" && k !== "brandLogo")
        .map(([k]) => k);

      expect(
        emptyKeys,
        `Locale '${locale}' contains empty translation strings for keys: ${emptyKeys.join(", ")}`
      ).toEqual([]);
    }
  });

  it("should have matching interpolation placeholders across all locales", () => {
    const extractPlaceholders = (str: string = "") => {
      const matches = str.match(/{{\s*[\w.-]+\s*}}/g) || [];
      return Array.from(new Set(matches.map(m => m.replace(/[{}]/g, "").trim()))).sort();
    };

    const mismatches: Array<{ key: string; locale: string; baseVars: string[]; localeVars: string[] }> = [];

    for (const key of baseKeys) {
      const baseVars = extractPlaceholders(dict[baseLocale][key]);
      const baseStr = baseVars.join(",");

      for (const locale of supportedLocales) {
        if (locale === baseLocale) continue;
        const localeVars = extractPlaceholders(dict[locale][key]);
        const localeStr = localeVars.join(",");

        if (baseStr !== localeStr) {
          mismatches.push({ key, locale, baseVars, localeVars });
        }
      }
    }

    expect(
      mismatches,
      `Found placeholder variable mismatches: ${JSON.stringify(mismatches.slice(0, 5))}`
    ).toEqual([]);
  });

  it("should have all static translation keys referenced in UI code present in all locales", () => {
    const SRC_DIR = path.resolve(process.cwd(), "src");

    function getSourceFiles(dir: string, fileList: string[] = []): string[] {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        if (fs.statSync(fullPath).isDirectory()) {
          if (
            entry !== "node_modules" &&
            entry !== "dist" &&
            entry !== ".git" &&
            entry !== "__tests__" &&
            entry !== "test"
          ) {
            getSourceFiles(fullPath, fileList);
          }
        } else {
          if (
            /\.(tsx?|jsx?|html)$/.test(entry) &&
            !entry.includes("i18n.tsx") &&
            !entry.includes("test")
          ) {
            fileList.push(fullPath);
          }
        }
      }
      return fileList;
    }

    const files = getSourceFiles(SRC_DIR);
    const codeKeys = new Set<string>();

    const tCallRegex = /\bt\(\s*["']([a-zA-Z0-9_\-.:]+)["']/g;
    const transHtmlRegex = /<TransHTML[^>]*\bk=(?:["']([a-zA-Z0-9_\-.:]+)["']|{["']([a-zA-Z0-9_\-.:]+)["']})/g;
    const propRegex = /\b(?:titleKey|descKey|labelKey|tKey)\s*:\s*["']([a-zA-Z0-9_\-.:]+)["']/g;

    for (const filePath of files) {
      const content = fs.readFileSync(filePath, "utf-8");
      let m;
      while ((m = tCallRegex.exec(content)) !== null) codeKeys.add(m[1]);
      while ((m = transHtmlRegex.exec(content)) !== null) codeKeys.add(m[1] || m[2]);
      while ((m = propRegex.exec(content)) !== null) codeKeys.add(m[1]);
    }

    const missingInAnyLocale: Array<{ key: string; missingLocales: string[] }> = [];

    for (const key of codeKeys) {
      const missingLocales: string[] = [];
      for (const locale of supportedLocales) {
        if (dict[locale][key] === undefined) {
          missingLocales.push(locale);
        }
      }
      if (missingLocales.length > 0) {
        missingInAnyLocale.push({ key, missingLocales });
      }
    }

    expect(
      missingInAnyLocale,
      `Found translation keys referenced in UI code missing from locales: ${JSON.stringify(missingInAnyLocale)}`
    ).toEqual([]);
  });

  it("should have all dynamic runtime keys properly resolving across all locales", () => {
    // 1. WebCostCalculatorPage dynamic design keys
    const designs = ["basic", "pro", "brand"];
    for (const d of designs) {
      const key = `calc_design_${d}`;
      for (const loc of supportedLocales) {
        expect(dict[loc][key], `Missing dynamic key ${key} in ${loc}`).toBeDefined();
      }
    }

    // 2. WebCostCalculatorPage dynamic urgency keys
    const urgencies = ["normal", "fast", "rush"];
    for (const u of urgencies) {
      const key = `calc_urg_${u}`;
      for (const loc of supportedLocales) {
        expect(dict[loc][key], `Missing dynamic key ${key} in ${loc}`).toBeDefined();
      }
    }

    // 3. WebCostCalculatorPage dynamic FAQ keys (1..3)
    for (let i = 1; i <= 3; i++) {
      for (const loc of supportedLocales) {
        expect(dict[loc][`calc_faq_q${i}`], `Missing calc_faq_q${i} in ${loc}`).toBeDefined();
        expect(dict[loc][`calc_faq_a${i}`], `Missing calc_faq_a${i} in ${loc}`).toBeDefined();
      }
    }

    // 4. ContentFillingPage dynamic FAQ keys (1..3)
    for (let i = 1; i <= 3; i++) {
      for (const loc of supportedLocales) {
        expect(dict[loc][`content_faq_q${i}`], `Missing content_faq_q${i} in ${loc}`).toBeDefined();
        expect(dict[loc][`content_faq_a${i}`], `Missing content_faq_a${i} in ${loc}`).toBeDefined();
      }
    }

    // 5. TypeScriptDevPage dynamic FAQ keys (1..3)
    for (let i = 1; i <= 3; i++) {
      for (const loc of supportedLocales) {
        expect(dict[loc][`ts_faq_q${i}`], `Missing ts_faq_q${i} in ${loc}`).toBeDefined();
        expect(dict[loc][`ts_faq_a${i}`], `Missing ts_faq_a${i} in ${loc}`).toBeDefined();
      }
    }

    // 6. ConsultSpecialistsPage dynamic case keys (1..3)
    for (let i = 1; i <= 3; i++) {
      for (const loc of supportedLocales) {
        expect(dict[loc][`webapp_case${i}_name`], `Missing webapp_case${i}_name in ${loc}`).toBeDefined();
        expect(dict[loc][`webapp_case${i}_problem`], `Missing webapp_case${i}_problem in ${loc}`).toBeDefined();
        expect(dict[loc][`webapp_case${i}_result`], `Missing webapp_case${i}_result in ${loc}`).toBeDefined();
      }
    }
  });
});
