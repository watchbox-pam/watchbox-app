const { defineConfig } = require("eslint/config");
const expo = require("eslint-config-expo/flat");
const prettier = require("eslint-config-prettier");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = defineConfig([
	expo,
	prettier,
	{
		plugins: { prettier: prettierPlugin },
		settings: { react: { version: "19.2.0" } },
		rules: {
			"prettier/prettier": "warn",
			"react/no-unescaped-entities": "off",
			"react/display-name": "warn",
			"import/namespace": "off"
		}
	},
	{
		ignores: ["node_modules/", ".expo/", "dist/", "build/"]
	}
]);
