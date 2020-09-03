<p align="center"><img width="90%" src="https://user-images.githubusercontent.com/289225/56637111-66140f00-669d-11e9-8ea9-501a37528e01.png" alt="daruk web framework for nodejs"></p>

<hr>

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![PR's Welcome][pr-welcoming-image]][pr-welcoming-url]
![GitHub closed issues](https://img.shields.io/github/issues-closed/darukjs/daruk.svg)
![npm](https://img.shields.io/npm/dm/daruk.svg)
[![codecov](https://codecov.io/gh/darukjs/daruk/branch/developer/graph/badge.svg)](https://codecov.io/gh/darukjs/daruk)
![GitHub top language](https://img.shields.io/github/languages/top/darukjs/daruk.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/darukjs/daruk.svg)
[![Package Quality](https://npm.packagequality.com/shield/daruk.svg)](https://packagequality.com/#?package=daruk)
[![All Contributors](https://img.shields.io/badge/all_contributors-13-orange.svg?style=flat-square)](#contributors)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/darukjs/daruk/2.0.svg)
[![Gitter](https://badges.gitter.im/daruk_framework/community.svg)](https://gitter.im/daruk_framework/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![start with why](https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg?style=flat)](https://v.youku.com/v_show/id_XNDExMjA5MTI2NA==.html?spm=a2hzp.8244740.0.0)
![GitHub language count](https://img.shields.io/github/languages/count/darukjs/daruk.svg)
![APM](https://img.shields.io/apm/l/vim-mode.svg)
[![Build Status](https://dev.azure.com/designsor/daruk/_apis/build/status/darukjs.daruk?branchName=developer)](https://dev.azure.com/designsor/daruk/_build/latest?definitionId=3&branchName=developer)

## Daruk

[Daruk](https://darukjs.com) 是一款基于 Koa2，使用 Typescript 开发的轻量级 web 框架。Daruk 的初衷是让人们可以更方便的开发 Nodejs Web 应用并能够体会到 Typescript 编程的乐趣。Daruk 本身基于 100%基于 Typescript 开发，使用 inversifyjs 的 IoC 容器管理依赖，让开发者享受最佳的 OOP 和 IoC 的编程体验。

框架内部集成了许多方便灵活的装饰器函数，让开发者可以写更少的代码来完成更多的事情，Daruk2.0 更改了之前严格要求目录约定的范式，提供给开发者更灵活的操作空间来进行项目约束和编写，但是内置的功能并没有缺失，整个框架的开发能力和 Daruk1.0 能力持平。

比如在 Daruk2.0 中，我们可以使用装饰器来快速定义 service，controller，timer，middleware 等能力来编写 web 应用，且提供了一些基本的内置中间件和路由服务等，更灵活的定义，让 Daruk2.0 可以更灵活的定制你的 web 项目和编写测试脚本。

Daruk 来源自塞尔达传说旷野之息里的四英杰之一，拥有在周围张开结界保护自己的力量，框架的目的也是为了给 nodejs server 提供健壮的基础管理能力。

Daruk2.0 同样基于 koa2，目前包含以下核心功能：

- 开启装饰器配置，ts 环境下引入即用，无需脚手架等工具。
- 提供给开发者编写影响框架内部能力的插件机制
- 可以自定义目录结构，在启动时使用 API 加载你自己定义的源文件
- 完整的 typescript 开发体验
- 服务启动完整生命周期 hook
- 自定义(性能日志 & 业务日志) 染色功能
- 支持线上实时性能分析
- 轻量级的链路追踪
- 面向对象的 mvc 开发体验
- 配套的一些周边模块

## Installation & Quick start

安装

```bash
mkdir daruk-demo
cd daruk-demo
npm init
npm add daruk ts-node typescript
mkidr src
touch src/index.ts
```

开始编写 web 应用 `src/index.ts`

```typescript
import { DarukServer, controller, injectable, get, DarukContext } from 'daruk';

(async () => {
  const myapp = DarukServer();

  @injectable()
  @controller()
  class Index {
    @get('/')
    public async index(ctx: DarukContext) {
      ctx.body = 'hello world';
    }
  }

  myapp.initOptions();
  await myapp.initPlugin();
  myapp.listen(3000);
})();
```

创建编译时的 `tsconfig.json` 文件

```bash
touch tsconfig.json
```

```json
{
  "compileOnSave": true,
  "compilerOptions": {
    "target": "es2017",
    "module": "commonjs",
    "sourceMap": true,
    "outDir": "./build",
    "rootDir": "./src",
    "typeRoots": [],
    "types": [],
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "exclude": ["node_modules"],
  "include": ["./src/**/*.ts"]
}
```

编辑 `package.json` 的启动和编译脚本

```json
{
  "scripts": {
    "dev": "NODE_ENV=dev ts-node --project tsconfig.json --files src/index.ts",
    "build": "tsc"
  }
}
```

启动服务

```bash
npm run dev
> NODE_ENV=dev ts-node --project tsconfig.json --files src/index.ts
[2020-9-1 19:52:12] [debug] [init] [router] get - /
```

打包脚本并启动编译后的脚本

```bash
npm run build
node build/index.js
```

## Docs

查看 Daruk 文档[快速开始](http://darukjs.com/)吧！

## Example

查看实际的 web 服务例子 [example](https://github.com/darukjs/daruk/tree/2.0/example)

## Features Todo

Beta [TodoList](./docs/todo-list.md)

## How to Contribute

Please let us know how can we help. Do check out issues for bug reports or suggestions first.

To become a contributor, please follow our [contributing guide](./docs/CONTRIBUTING.md)

[npm-image]: https://img.shields.io/npm/v/daruk.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/daruk
[travis-image]: https://api.travis-ci.com/darukjs/daruk.svg?branch=developer
[travis-url]: https://travis-ci.com/darukjs/daruk
[pr-welcoming-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[pr-welcoming-url]: https://github.com/darukjs/daruk/pull/new

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://www.tuer.me"><img src="https://avatars3.githubusercontent.com/u/289225?v=4" width="40px;" alt="xiaojue"/><br /><sub><b>xiaojue</b></sub></a><br /><a href="https://github.com/darukjs/daruk/commits?author=xiaojue" title="Code">💻</a> <a href="#design-xiaojue" title="Design">🎨</a></td><td align="center"><a href="https://github.com/Youjingyu"><img src="https://avatars3.githubusercontent.com/u/15033260?v=4" width="40px;" alt="whale"/><br /><sub><b>whale</b></sub></a><br /><a href="https://github.com/darukjs/daruk/commits?author=Youjingyu" title="Code">💻</a> <a href="https://github.com/darukjs/daruk/commits?author=Youjingyu" title="Tests">⚠️</a></td><td align="center"><a href="https://github.com/dxil"><img src="https://avatars1.githubusercontent.com/u/17681925?v=4" width="40px;" alt="cuzz"/><br /><sub><b>cuzz</b></sub></a><br /><a href="https://github.com/darukjs/daruk/commits?author=dxil" title="Code">💻</a> <a href="https://github.com/darukjs/daruk/commits?author=dxil" title="Tests">⚠️</a></td><td align="center"><a href="https://www.himself65.com"><img src="https://avatars0.githubusercontent.com/u/14026360?v=4" width="40px;" alt="扩散性百万甜面包"/><br /><sub><b>扩散性百万甜面包</b></sub></a><br /><a href="https://github.com/darukjs/daruk/commits?author=Himself65" title="Tests">⚠️</a> <a href="https://github.com/darukjs/daruk/commits?author=Himself65" title="Code">💻</a></td><td align="center"><a href="https://github.com/myluluy"><img src="https://avatars2.githubusercontent.com/u/4242799?v=4" width="40px;" alt="arck.liu"/><br /><sub><b>arck.liu</b></sub></a><br /><a href="https://github.com/darukjs/daruk/commits?author=myluluy" title="Code">💻</a> <a href="https://github.com/darukjs/daruk/commits?author=myluluy" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/Zheaoli"><img src="https://avatars3.githubusercontent.com/u/7054676?s=400&v=4" width="40px;" alt="Manjusaka"/><br /><sub><b>Manjusaka</b></sub></a><br /><a href="https://github.com/darukjs/daruk/commits?author=Zheaoli" title="Code">💻</a></td><td align="center"><a href="https://github.com/KenyeeC"><img src="https://avatars1.githubusercontent.com/u/18223471?v=4" width="40px;" alt="KenyeeCheung"/><br /><sub><b>KenyeeCheung</b></sub></a><br /><a href="https://github.com/darukjs/daruk/commits?author=KenyeeC" title="Code">💻</a></td></tr><tr><td align="center"><a href="https://github.com/ChasLui"><img src="https://avatars0.githubusercontent.com/u/10083758?v=4" width="40px;" alt="ChasLui"/><br /><sub><b>ChasLui</b></sub></a><br /><a href="https://github.com/darukjs/daruk/commits?author=ChasLui" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/zhmushan"><img src="https://avatars1.githubusercontent.com/u/24505451?v=4" width="40px;" alt="木杉"/><br /><sub><b>木杉</b></sub></a><br /><a href="https://github.com/darukjs/daruk/commits?author=zhmushan" title="Code">💻</a></td><td align="center"><a href="https://icepy.me"><img src="https://avatars0.githubusercontent.com/u/3321837?v=4" width="40px;" alt="icepy"/><br /><sub><b>icepy</b></sub></a><br /><a href="https://github.com/darukjs/daruk/commits?author=icepy" title="Code">💻</a></td><td align="center"><a href="https://github.com/zgayjjf"><img src="https://avatars1.githubusercontent.com/u/24718872?v=4" width="40px;" alt="jeffjing"/><br /><sub><b>jeffjing</b></sub></a><br /><a href="https://github.com/darukjs/daruk/commits?author=zgayjjf" title="Code">💻</a></td><td align="center"><a href="https://github.com/yiliang114"><img src="https://avatars0.githubusercontent.com/u/11473889?v=4" width="40px;" alt="yiliang"/><br /><sub><b>yiliang</b></sub></a><br /><a href="https://github.com/darukjs/daruk/commits?author=yiliang114" title="Documentation">📖</a></td><td align="center"><a href="https://github.com/imakan"><img src="https://avatars3.githubusercontent.com/u/11512704?v=4" width="40px;" alt="imakan"/><br /><sub><b>imakan</b></sub></a><br /><a href="https://github.com/darukjs/daruk/commits?author=imakan" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
