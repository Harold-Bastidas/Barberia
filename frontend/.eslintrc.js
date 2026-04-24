/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['../.eslintrc.js', 'next/core-web-vitals'],
  env: { browser: true, es2022: true },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    // React 17+ JSX transform — no need to import React in every file
    'react/react-in-jsx-scope': 'off',

    // Next.js App Router uses default exports for pages/layouts
    'import/prefer-default-export': 'off',

    // Allow .jsx/.tsx extensions in imports (Next.js resolves them)
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', tsx: 'never', js: 'never', jsx: 'never' },
    ],
  },
};
