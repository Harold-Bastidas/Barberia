/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['../.eslintrc.js'],
  env: { node: true, es2022: true },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    // Require explicit handling of promise rejections in a Node.js server context
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
  },
};
