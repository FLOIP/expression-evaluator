module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },

  extends: [
    'plugin:jest/recommended',
    'plugin:lodash/recommended',
    'eslint:recommended',

    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',

    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],

  plugins: [
    'jest',
    'lodash',
    '@typescript-eslint',
  ],

  env: {
    'jest/globals': true,
  },

  overrides: [
    {
      files: [
        '*.vue',
        '*.js',
        '*.ts',
        '*.tsx',
      ],
      rules: {
        'indent': 'off',
      },
    },
  ],

  rules: {
    /********************
     * Typescript rules *
     ********************/
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowNullableBoolean: true,
      },
    ],
    // Disabled until we can take the time to fix uses of object
    '@typescript-eslint/ban-types': 'off',

    // Disabled until we can take the time to fix uses
    '@typescript-eslint/restrict-template-expressions': 'off',

    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    // Might be able to get rid of this after TS 4.0
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'warn',
      {
        multiline: {
          delimiter: 'comma',
          requireLast: true,
        },
        singleline: {
          delimiter: 'comma',
          requireLast: false,
        },
      },
    ],

    /*************************
     * Modified ESLint rules *
     *************************/
    'one-var': ['error', 'never'],

    // These are off due to https://github.com/typescript-eslint/typescript-eslint/blob/f335c504bcf75623d2d671e2e784b047e5e186b9/docs/getting-started/linting/FAQ.md#eslint-plugin-import
    'import/named': 'off',
    'import/namespace': 'warn',
    'import/default': 'warn',
    'import/export': 'warn',
    'import/no-named-as-default-member': 'warn',
    'import/no-named-as-default': 'warn',
    'import/no-cycle': 'off',
    'import/no-unused-modules': 'warn',
    'import/no-deprecated': 'warn',

    'import/no-absolute-path': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'no-empty-function': 'off',
    'no-tabs': 'error',
    'no-debugger': 'warn',

    'no-use-before-define': [
      'off',
      {
        functions: true,
        classes: true,
        variables: false,
      },
    ],
    'lines-between-class-members': ['off'],
    'prefer-destructuring': [
      'error',
      {object: false, array: false},
    ],
    'space-before-function-paren': [
      'error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      }],
    'no-console': [
      'warn',
      {
        allow: [
          'warn',
          'error',
          'info',
        ],
      },
    ],
    'object-curly-spacing': [
      'error',
      'never',
    ],

    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          multiline: true,
          consistent: true,
        },
        ImportDeclaration: {
          multiline: true,
          consistent: true,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
      },
    ],

    'indent': [
      'off',
      2,
      {
        VariableDeclarator: 'off',
        MemberExpression: 1,
        ArrayExpression: 2,
        ObjectExpression: 'off',
        CallExpression: {'arguments': 2},
        FunctionDeclaration: {'parameters': 2},
        FunctionExpression: {'parameters': 2},
      },
    ],
    'no-trailing-spaces': [
      'error',
      {skipBlankLines: true},
    ],
    'max-len': [
      'warn',
      {code: 140},
    ],
    'eol-last': [
      'warn',
      'always',
    ],
    semi: [
      'warn',
      'never',
    ],
    'no-param-reassign': 'off',
    'import/no-unresolved': ['off'],
    'implicit-arrow-linebreak': 'off',

    // Argument for this best presented here: https://youtu.be/eEBOvqMfPoI?t=1665
    'no-else-return': ['off'],
    'spaced-comment': 'off',
    'line-comment-position': ['error', {'position': 'above'}],

    /**********
     * Lodash *
     **********/
    'lodash/import-scope': [
      'error',
      'member',
    ],
    'lodash/matches-prop-shorthand': 'off',

    // Disable all lodash prefer checks for things that already exist natively
    'lodash/prefer-lodash-method': ['off'],
    'lodash/prefer-lodash-typecheck': 'off',
    'lodash/prefer-noop': 'off',
    'lodash/prefer-constant': 'off',
    'lodash/preferred-alias': 'off',
    'lodash/prefer-includes': 'off',
    'lodash/prefer-get': 'off',
    'lodash/prefer-is-nil': 'off',
    'lodash/prefer-lodash-chain': 'off',
    'lodash/prefer-matches': 'off',
    'lodash/prefer-over-quantifier': 'off',
    'lodash/prefer-some': 'off',
    'lodash/prefer-startswith': 'off',
    'lodash/prefer-times': 'off',

    // this is as warning, as it breaks type inference
    'lodash/prop-shorthand': ['warn', 'never'],

    /**************
     * Jest Rules *
     **************/
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
}
