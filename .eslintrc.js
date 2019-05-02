module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'no-console': ['off'],
    'jsx-a11y/href-no-hash': ['off'],
    'jsx-a11y/label-has-for': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/prop-types': ['off'],
    'react/no-unused-state': ['off'],
    'react/destructuring-assignment': ['off'],
    'import/prefer-default-export': ['off'],
    '@typescript-eslint/camelcase': ['off'],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/interface-name-prefix': ['off'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/explicit-member-accessibility': ['off'],
    'indent': ['error', 2],
    'react/jsx-indent': ['error', 2],
    'jsx-a11y/label-has-associated-control': [ 2, {
      'required': {
          'some': [ 'nesting', 'id' ]
      }
    }],
    'max-len': [
      'warn',
      {
        code: 100,
        tabWidth: 2,
        comments: 100,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx', '.d.ts'],
        paths: ['./'],
      },
    },
  },
};
