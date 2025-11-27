import { defineConfig } from 'tsup'

export default defineConfig({
  outDir: 'lib',
  entry: [
    'src/index.ts',
  ],
  format: ['cjs', 'esm'], // Generates both CommonJS and ES Modules
  dts: true,              // Generates .d.ts files
  splitting: true,        // Enables code splitting
  sourcemap: true,        // Generates sourcemaps
  clean: true,            // Cleans the output directory before each build
  minify: true,           // Minifies the output
  treeshake: true,        // Removes unused code
})
