import butternut from 'rollup-plugin-butternut';

export default {
  entry: "src/webility.dev.js",
  format: "cjs",
  dest: "dist/index.min.js",
  plugins: [ butternut() ]
};