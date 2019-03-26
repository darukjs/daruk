<p align="center"><img width="30%" src="https://user-images.githubusercontent.com/15033260/54174052-7ee6ad80-44bf-11e9-9735-71c5403624c1.png" alt="daruk web framework for nodejs"></p>

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![PR's Welcome][pr-welcoming-image]][pr-welcoming-url]

# Daruk

[Daruk](https://daruk-framework.github.io/daruk.org) 是一款基于 Koa2，使用 typescript 开发的轻量级 web 框架，使用过 koa2 框架的朋友应该知道，koa2 属于比较原始和基础的 http server 实现，在日常的开发工作中，我们可能需要通过安装很多开源的中间件，自己完成复杂的项目配置，路由管理，以及和业务无关的工作：如日志，监控，性能等基础组件的定制。

有了 Daruk，我们可以轻松地一键初始化你的 web 项目，快速的编写业务代码。Daruk 的目的就是轻量和易扩展，新增的概念少，上手难度低，核心代码也不多，但是可以提供给开发者更多的灵活选择，快速完成业务开发，约束项目规范和代码格式。

Daruk 来源自塞尔达传说旷野之息里的四英杰之一，拥有在周围张开结界保护自己的力量，框架的目的也是为了给 nodejs server 提供健壮的基础管理能力。

Daruk 基于 koa2，包含以下核心功能：

- 一键生成项目，开箱即用
- 合理和克制的分层目录结构
- 自动 loader 与装饰器结合的机制
- 完整的 typescript 开发体验
- 生产环境服务重启或退出邮件报警
- 性能日志 & 业务日志 染色功能
- 支持线上实时性能分析
- 轻量级的链路追踪

## 快速上手

```bash
# 全局安装daurk脚手架
cnpm i -g daruk-cli

# 初始化项目
# --ignore 表示忽略本地模板缓存
daruk init --ignore daruk-example

# 运行项目
cd daruk-example
npm run dev
```

## 更详细的文档

查看 Daruk 文档[快速开始](https://daruk-framework.github.io/daruk.org/quick-start.html)吧！

[npm-image]: https://img.shields.io/npm/v/daruk.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/daruk
[travis-image]: https://api.travis-ci.com/daruk-framework/daruk.svg?branch=master
[travis-url]: https://travis-ci.com/daruk-framework/daruk
[coveralls-image]: https://img.shields.io/codecov/c/github/daruk-framework/daruk.svg?style=flat-square
[coveralls-url]: https://codecov.io/github/daruk-framework/daruk?branch=master
[pr-welcoming-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[pr-welcoming-url]: https://github.com/daruk-framework/daruk/pull/new
