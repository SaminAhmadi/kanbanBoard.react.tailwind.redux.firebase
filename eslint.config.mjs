import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist'] }, // Ignore the "dist" folder
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // ✅ Enable JSX parsing
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      prettier, // Enables Prettier linting inside ESLint
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // React Hooks rules
      'prettier/prettier': 'error', // Makes Prettier formatting an ESLint error
    },
    settings: {
      react: {
        version: 'detect', // Automatically detects the React version
      },
    },
  },
  eslintConfigPrettier, // Prevents ESLint rules that conflict with Prettier
);
