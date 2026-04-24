/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      typescript: { alwaysTryTypes: true },
    },
  },
  rules: {
    // TypeScript handles unused vars with more precision than ESLint's rule
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // Prefer named exports for explicitness, but don't force default exports
    'import/prefer-default-export': 'off',

    // TypeScript resolves extensions — no need to specify .ts/.tsx
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }],

    // void operator is useful to explicitly discard promises
    'no-void': ['error', { allowAsStatement: true }],

    // Class methods may not use 'this' in some patterns (e.g. Fastify handlers)
    'class-methods-use-this': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      // Config files at root level run in Node.js
      files: ['*.config.{js,ts}', '.eslintrc.js', 'postcss.config.js'],
      env: { node: true },
    },
  ],
};
