const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Design-heavy commits sometimes need longer subjects than the default 72.
    "header-max-length": [2, "always", 100],
  },
};

export default config;
