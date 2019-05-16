# How-to-contribute

## Fork and Init

Fork the repo and install the dependencies use yarn or cnpm (If you are in China).

```bash
$ cd daruk
$ cnpm install # or `yarn install`, `npm install`
```

The src directory is core directory, if you change something and want to check it.

```bash
$ cd daruk
$ npm run build
$ cd example
$ mkdir playground
$ npm init
```

In the `package.json` the dependencies with daruk like this:

```json
{
  "scripts": {
    "dev": "TS_NODE_FILES=true NODE_ENV=dev  ts-node --project ./tsconfig.json ./index.ts"
  },
  "devDependencies": {
    "ts-node": "^8.1.0"
  },
  "dependencies": {
    "daruk": "file:../../"
  }
}
```

`tsconfig.json`

```json
{
  "compileOnSave": true,
  "compilerOptions": {
    /* Basic Options */
    "target": "es2017" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */,
    "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
    "sourceMap": true /* Generates corresponding '.map' file. */,
    "outDir": "./build" /* Redirect output structure to the directory. */,
    "rootDir": "./" /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */,
    "removeComments": true /* Do not emit comments to output. */,
    "noImplicitAny": true /* Raise error on expressions and declarations with an implied 'any' type. */,
    "experimentalDecorators": true /* Enables experimental support for ES7 decorators. */,
    "emitDecoratorMetadata": true /* Enables experimental support for emitting type metadata for decorators. */
  },
  "exclude": ["node_modules", "dist"],
  "include": ["./types/*.ts"]
}
```

You must be run install with yarn:

```bash
$ yarn
$ npm run dev
```

## After Code

The daruk dependencies path is `file:../../` and locally. You can reference other complete example such as `01-helloWorld`.

If you want to pull request, you must run these script without error.

```bash
$ npm run test
$ npm run tslint
$ npm run build
```

## Commit Message Format

Must be one of the following:

- feat: A new feature

- fix: A bug fix

- docs: Documentation-only changes

- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

- refactor: A code change that neither fixes a bug nor adds a feature

- perf: A code change that improves performance

- test: Adding missing tests

- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

- deps: Updates about dependencies
