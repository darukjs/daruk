<p align="center"><img width="90%" src="https://user-images.githubusercontent.com/289225/56637111-66140f00-669d-11e9-8ea9-501a37528e01.png" alt="daruk web framework for nodejs"></p>

<hr>

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![PR's Welcome][pr-welcoming-image]][pr-welcoming-url]
![npm](https://img.shields.io/npm/dm/daruk.svg)
[![Test coverage][coveralls-image]][coveralls-url]
[![Package Quality](https://npm.packagequality.com/shield/daruk.svg)](https://packagequality.com/#?package=daruk)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)
[![HitCount](http://hits.dwyl.io/daruk-framework/daruk.svg)](http://hits.dwyl.io/daruk-framework/daruk)
[![Gitter](https://badges.gitter.im/daruk_framework/community.svg)](https://gitter.im/daruk_framework/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![start with why](https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg?style=flat)](https://v.youku.com/v_show/id_XNDExMjA5MTI2NA==.html?spm=a2hzp.8244740.0.0)

# Daruk

[Chinese Document](./CN.md)

[Daruk](https://daruk-framework.github.io/daruk.org) is a lightweight web framework base on [Koa](https://github.com/koajs/koa) and written in [Typescript](https://www.typescriptlang.org/). Koa is original http server implementation if you used it. In the daily development,we have to use many open source middleware in Koa to implement scaffold, routing, abstraction and some components such as logging, monitoring, etc.

We can create your web project by Daruk scaffold for business. Daruk core is lightweight and easy extension and learing, but it can provides more options for developer to rapid development such as constraints directory specification and code style.

Daruk, it comes from [The Legend of Zelda: Breath of the Wild](https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Breath_of_the_Wild) one of the four heroes, it have symbol of guardian ability. The goal of the framework is also as it.

Daruk is base on Koa2, includes features:

- Scaffolding
- Directory and file specification
- Auto loader and decorator combination
- Complete Typescript development experience
- Life cycle and hook.
- Custom(performance logs & business logs) & tracked
- Online performance analysis
- Lightweight link tracking
- The MVC development of object-oriented
- Supporting the development of the module

## Installation scaffolding

```bash
# install daruk scaffold cli
cnpm i -g daruk-cli

# init project
# --ignore ignore local template cache
daruk init --ignore daruk-example

# run the project
cd daruk-example
npm run dev
```

## Quick start

You can write your code shown below :

```typescript
import { Daruk } from 'daruk';

const port = 3000;
const myApp = new Daruk('darukProject', {
  rootPath: __dirname,
  debug: process.env.NODE_ENV === 'dev'
});

myApp.run(port);
```

`controllers/index.ts`:

```typescript
import { BaseController, config, Context, Daruk, get, middleware, util } from 'daruk';

export default class Index extends BaseController {
  @util('getToday')
  public getToday: Daruk['util']['getToday'];
  @config('author')
  public author: Daruk['config']['author'];
  @config('version')
  public version: Daruk['config']['version'];
  @middleware('cors')
  @get('/')
  public async index(ctx: Context, next: Function) {
    const weather = await ctx.service.weather.getWeather();
    ctx.body = `Hi, ${this.author}, project version is ${
      this.version
    }, Today is ${this.getToday()}, weather is ${weather}`;
  }
}
```

More information you can check out [example/03-weather](./example/03-weather).

## Docs

More docs: [Quick Start](https://daruk-framework.github.io/daruk.org/)

## How to Contribute

Please let us know how can we help. Do check out issues for bug reports or suggestions first.

To become a contributor, please follow our [contributing guide](./docs/how-to-contribute.md)

[npm-image]: https://img.shields.io/npm/v/daruk.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/daruk
[travis-image]: https://api.travis-ci.com/daruk-framework/daruk.svg?branch=master
[travis-url]: https://travis-ci.com/daruk-framework/daruk
[coveralls-image]: https://img.shields.io/codecov/c/github/daruk-framework/daruk.svg?style=flat-square
[coveralls-url]: https://codecov.io/github/daruk-framework/daruk?branch=master
[pr-welcoming-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[pr-welcoming-url]: https://github.com/daruk-framework/daruk/pull/new

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://www.tuer.me"><img src="https://avatars3.githubusercontent.com/u/289225?v=4" width="40px;" alt="xiaojue"/><br /><sub><b>xiaojue</b></sub></a><br /><a href="https://github.com/daruk-framework/daruk/commits?author=xiaojue" title="Code">💻</a> <a href="#design-xiaojue" title="Design">🎨</a></td><td align="center"><a href="https://github.com/Youjingyu"><img src="https://avatars3.githubusercontent.com/u/15033260?v=4" width="40px;" alt="whale"/><br /><sub><b>whale</b></sub></a><br /><a href="https://github.com/daruk-framework/daruk/commits?author=Youjingyu" title="Code">💻</a> <a href="https://github.com/daruk-framework/daruk/commits?author=Youjingyu" title="Tests">⚠️</a></td><td align="center"><a href="https://github.com/dxil"><img src="https://avatars1.githubusercontent.com/u/17681925?v=4" width="40px;" alt="cuzz"/><br /><sub><b>cuzz</b></sub></a><br /><a href="https://github.com/daruk-framework/daruk/commits?author=dxil" title="Code">💻</a> <a href="https://github.com/daruk-framework/daruk/commits?author=dxil" title="Tests">⚠️</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
