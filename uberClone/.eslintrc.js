module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    semi: ['error', 'always'], // ; No final

    'eol-last': ['error', 'always'], // Linha extra no final de cada arquivo
    'spaced-comment': ['error', 'always'], // Espaço antes do comentário
    'array-bracket-spacing': ['error', 'never'], // Espaço antes e depois dos colchetes do array
    'object-curly-spacing': ['error', 'always'], // Espaço antes e depois das chaves do objeto

    // Vírgula no final
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
      },
    ],

    // Espaço entre a função e seus parenteses
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'ignore',
        named: 'ignore',
        asyncArrow: 'ignore',
      },
    ],
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],

    '@typescript-eslint/explicit-module-boundary-types': 'off', // Remove a necessidade de informar o retorno da função
  },
};
