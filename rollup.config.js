// import eslint from 'rollup-plugin-eslint'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
// import uglify from 'rollup-plugin-uglify'
// import { minify } from 'uglify-es';

const pkg = require('./package.json')

export default {
  banner: `// ${pkg.name} - ${pkg.version}`,
  entry: 'src/main.js',
  dest: 'dist/bundle.js',
  format: 'cjs',
  plugins: [
  //  eslint(),
    commonjs(),
    json({
      exclude: 'node_modules/**',
      preferConst: true,
      indent: '  '
    }),
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    })
    // (process.env.NODE_ENV === 'production' && uglify({}, minify))
  ],
  external: [
    'fs', 'path',

    'chrome-remote-interface', 'minimist'
  ]
}
