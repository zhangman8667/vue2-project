module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  plugins: [
    'html', 'babel'
  ],
  'globals': {
  },
  'rules': {
    'arrow-parens': 0,
    "semi" : [2, "never"],
    "max-len": [2, 120, 2],
    "generator-star-spacing": 0,
    "babel/generator-star-spacing": 1
  }
}
