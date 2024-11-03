module.exports = {
    extends: [
       'next', 
       'next/core-web-vitals',
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
    ],
    settings: {
      react: {
        version: "detect",
        pragma: "React", // Ensure this is set if you prefer manual imports
      },
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        "@typescript-eslint/no-unused-vars": "warn",
        "react/prop-types": "off", // Turn off if using TypeScript
        "@typescript-eslint/no-empty-interface": "warn",
      },
  };
  