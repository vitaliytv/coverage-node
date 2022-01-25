import { relative } from "path";
import kleur from "kleur";
import errorConsole from "./errorConsole.mjs";

/**
 * Reports a code coverage analysis to the console.
 * @kind function
 * @name reportCoverage
 * @param {CoverageAnalysis} coverageAnalysis Coverage analysis from [`analyseCoverage`]{@link analyseCoverage}.
 * @example <caption>How to import.</caption>
 * ```js
 * import reportCoverage from "coverage-node/reportCoverage.mjs";
 * ```
 */
export default function reportCoverage({
  filesCount,
  covered,
  ignored,
  uncovered,
}) {
  if (covered.length) {
    console.group(
      `\n${kleur.green(
        `${covered.length} file${covered.length === 1 ? "" : "s"} covered:`
      )}\n`
    );

    for (const path of covered) console.info(relative("", path));

    console.groupEnd();
  }

  if (ignored.length) {
    console.group(
      `\n${kleur.yellow(
        `${ignored.length} file${
          ignored.length === 1 ? "" : "s"
        } ignoring coverage:`
      )}\n`
    );

    for (const { path, ranges } of ignored)
      for (const { start, end } of ranges)
        console.info(
          `${relative("", path)}:${start.line}:${start.column} → ${end.line}:${
            end.column
          }`
        );

    console.groupEnd();
  }

  if (uncovered.length) {
    errorConsole.group(
      `\n${kleur.red(
        `${uncovered.length} file${
          uncovered.length === 1 ? "" : "s"
        } missing coverage:`
      )}\n`
    );

    for (const { path, ranges } of uncovered)
      for (const { start, end } of ranges)
        errorConsole.info(
          `${relative("", path)}:${start.line}:${start.column} → ${end.line}:${
            end.column
          }`
        );

    errorConsole.groupEnd();
  }

  console.info(
    `\n${kleur
      .bold()
      [uncovered.length ? "red" : ignored.length ? "yellow" : "green"](
        `${covered.length}/${filesCount} files covered.`
      )}\n`
  );
}