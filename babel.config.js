module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        },
      }
    ],
    '@babel/preset-react',
  ],
  env: {
    test: {
      plugins: [],
    },
    production: {
      plugins: [],
    },
  },
};
