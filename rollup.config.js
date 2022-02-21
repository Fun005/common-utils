import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript';
// import terser from "rollup-plugin-terser";
import pkg from './package.json';

export default {
  input: 'src/index.js', // 打包入口
  output: { // 打包出口
    name: 'funnyUtils',
    file: pkg.browser, // 最终打包出来的文件路径和文件名，这里是在package.json的browser: 'dist/index.js'字段中配置的
    format: 'umd', // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
    globals: {
      'fs': 'fs',
      'path': 'path',
      'copy-dir': 'copy-dir',
      'make-dir': 'make-dir',
      'rimraf': 'rimraf',
      'child_process': 'child_process',
      'os': 'os'
    }
  },
  plugins: [ // 打包插件
    resolve(), // 查找和打包node_modules中的第三方模块
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    typescript(), // 解析TypeScript
    // 使用插件 @rollup/plugin-babel
    babel({
      babelHelpers: "runtime",
      plugins: [
        ["@babel/plugin-transform-runtime", { regenerator: true, useESModules: true }]
      ],
      presets: [
        "@babel/preset-env"
      ]
    }),
    // terser()
  ]
};
