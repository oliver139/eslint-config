import { antfu } from "@antfu/eslint-config";

interface configOptions {
  vue: boolean,
  vueA11y: boolean,
  casePolice: boolean,
  quotes: "single" | "double",
  semicolon: boolean,
}
// function eslintConfigBuilder(options: configOptions) {

// }

export default antfu();
