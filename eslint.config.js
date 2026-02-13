import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import jestPlugin from 'eslint-plugin-jest';

export default tseslint.config(
  {
    // Ignorer les fichiers de build et de configuration
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '*.config.js',
      '*.config.mjs',
      'eslint.config.js',
      'jest.config.js'
    ]
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
        ...globals.jest
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_' 
      }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },
  {
    files: ['**/*.test.ts', '**/__tests__/**/*.ts'],
    ...jestPlugin.configs['flat/recommended'],
    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals.globals,
      }
    },
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
    }
  }
);