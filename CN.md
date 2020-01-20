<p align="center"><img width="90%" src="https://user-images.githubusercontent.com/289225/56637111-66140f00-669d-11e9-8ea9-501a37528e01.png" alt="daruk web framework for nodejs"></p>

<hr>

# Daruk

[Daruk](https://darukjs.github.io/daruk.org) 是一款基于 Koa2，使用 Typescript 开发的轻量级 web 框架。Daruk 的初衷是让人们可以更方便的开发 Nodejs Web 应用并能够体会到 Typescript 编程的乐趣。Daruk 本身基于 100%基于 Typescript 开发，使用 inversifyjs 的 IoC 容器管理依赖，让开发者享受最佳的 OOP 和 IoC 的编程体验。

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
yarn add daruk
```

开始编写 web 应用

```typescript
import { DarukServer, controller, injectable } from 'daruk';

(async () => {
  const myapp = DarukServer();

  @injectable()
  @controller()
  class Index {
    @get('/')
    public async index(ctx: any) {
      ctx.body = 'hello world';
    }
  }

  myapp.initOptions();
  await myapp.initPlugin();
  myapp.listen(3000);
})();
```

## Docs

查看 Daruk 文档[快速开始](http://darukjs.com/)吧！
