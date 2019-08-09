module.exports = {
  presets: ["@vue/app"],
  // vant 按需引入
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
};
