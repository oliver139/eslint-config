import { antfu, ensurePackages, interopDefault } from "@antfu/eslint-config";

interface configOptions {
  type: "app" | "lib",
  vueA11y: boolean,
  quotes: "single" | "double",
  semicolon: boolean,
}
async function eslintConfigBuilder(options: Partial<configOptions> = {}): Promise<ReturnType<typeof antfu>> {
  const defaultOptions: configOptions = {
    type: "app",
    vueA11y: false,
    quotes: "double",
    semicolon: true,
  };
  const mergedOptions: configOptions = {
    ...defaultOptions,
    ...options,
  };

  const configPara: Parameters<typeof antfu> = [
    {
      type: mergedOptions.type,
      ignores: [
        "**/fixtures",
        "docs/",
      ],
      stylistic: {
        indent: 2,
        quotes: mergedOptions.quotes,
        semi: mergedOptions.semicolon,
        overrides: {
          "antfu/curly": "off",
          "style/brace-style": ["error", "1tbs", { allowSingleLine: false }],
          "style/member-delimiter-style": ["error", {
            multiline: {
              delimiter: "comma",
              requireLast: true,
            },
            singleline: {
              delimiter: "comma",
              requireLast: false,
            },
            multilineDetection: "brackets",
          }],
        },
      },
      javascript: {
        overrides: {
          "curly": ["error", "multi-line", "consistent"],
          "max-nested-callbacks": ["warn", { max: 4 }],
          "no-alert": "off",
          "no-console": "off",
          "no-lonely-if": "error",
          "no-unused-vars": ["warn", { varsIgnorePattern: "^props$" }],
          "unused-imports/no-unused-imports": "off",
          "unused-imports/no-unused-vars": "off",
          "yoda": ["error", "never", { exceptRange: true }],
        },
      },
      typescript: {
        overrides: {
          "ts/no-empty-function": "warn",
          "ts/no-shadow": "error",
          "ts/no-unused-vars": ["warn", { varsIgnorePattern: "^props$" }],
        },
      },
      vue: {
        overrides: {
          "vue/no-console": "error",
          "vue/max-attributes-per-line": ["warn", {
            singleline: 3,
            multiline: 1,
          }],
          "vue/singleline-html-element-content-newline": "off",
          "vue/no-unused-refs": "warn",
          "vue/no-unused-vars": "warn",
        },
      },
      test: {
        overrides: {
          "test/no-only-tests": "off",
        },
      },
    },
  ];

  await ensurePackages([
    mergedOptions.vueA11y ? "eslint-plugin-vuejs-accessibility" : undefined,
  ]);

  if (mergedOptions.vueA11y) {
    const pluginVueA11y = await interopDefault(import("eslint-plugin-vuejs-accessibility"));
    const pluginVueA11yConfig = pluginVueA11y.configs["flat/recommended"];
    configPara.push(...pluginVueA11yConfig);
  }

  const eslintConfig = antfu(...configPara);
  if (mergedOptions.vueA11y) {
    eslintConfig.renamePlugins({
      "vuejs-accessibility": "vue-a11y",
    }).overrides({
      "vuejs-accessibility:setup:base": {
        name: "vue-a11y/base",
      },
      "vuejs-accessibility:setup:with-files-rules-and-parser": {
        name: "vue-a11y/rules",
        rules: {
          "vue-a11y/media-has-caption": "warn",
          "vue-a11y/no-aria-hidden-on-focusable": "error",
          "vue-a11y/no-autofocus": "warn",
          "vue-a11y/tabindex-no-positive": "warn",
        },
      },
    });
  }

  return eslintConfig;
}

export { eslintConfigBuilder };
