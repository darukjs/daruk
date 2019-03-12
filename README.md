# Daruk

Daruk 是一款基于 Koa2，使用 typescript 开发的轻量级 web 框架，使用过 koa2 框架的朋友应该知道，koa2 属于比较原始和基础的 http server 实现，在日常的开发工作中，我们可能需要通过安装很多开源的中间件，自己完成复杂的项目配置，路由管理，以及和业务无关的工作：如日志，监控，性能等基础组件的定制。

有了 Daruk，我们可以轻松的一键初始化你的 web 项目，快速的编写业务代码，当 Daruk 的基础能力不能满足你的要求时，你也可以通过自定义配置，和注册依赖的方法实现框架的扩展，注入后的依赖可以享用统一的 AOP 监控方法，随时了解你的 web 框架运行状态，而又无需依赖任何额外的环境。

Daruk 的目的就是轻量和易扩展，核心代码非常简单，但是可以提供给开发者更多的灵活选择，快速完成业务开发，约束项目规范和代码格式。

Daruk 来源自塞尔达传说旷野之息里的四英杰之一，拥有在周围张开结界保护自己的力量，框架的目的也是为了给 nodejs server 提供健壮的基础管理能力。

![logo200](https://user-images.githubusercontent.com/15033260/54174052-7ee6ad80-44bf-11e9-9735-71c5403624c1.png)

Daruk [说明文档](https://daruk-framework.github.io/daruk.org/)

Daruk 基于 koa2，包含以下核心功能：

- 一键生成项目，自动后续升级
- 服务调用支持依赖注入，减少冗余代码
- 常用的中间件内置，方便的中间件管理和扩展能力。
  - koa-bodyparser 
  - koa-favicon
  - formidable-upload-koa (上传文件)
  - koa-json-body 
  - koa-body-clean
  - koa-logger
  - koa-json 
  - koa2-cors
  - koa-handle-error 
  - koa-response-handler
  - koa-proxies (请求代理)
  - koa-ip (ip限制)
  - koa-static  (静态服务)
  - koa-jsonp (jsonp支持)
  - koa-compress (压缩功能)
  - koa-session (会话能力)
  - koa-flash-simple (闪存能力)
  - koa-ejs (模板引擎内置)
  - graceful-shutdown (优雅关闭)
- router 动态加载以及，服务依赖注入。
- 常见的s ervice 功能内置。
  - ioredis
  - node-rdkafka
  - sequelize
  - mysql
  - request
  - node-mail
  - 图片处理能力
  - xss过滤
  - 数据验证
  - 分页类
  - 数据加密
  - 日历类
  - 单元测试类
  - 页面缓存化能力
- 常见的 utils 功能内置。
  - lru-cache
  - lodash
  - 大量的辅助函数
- 生产环境服务重启或退出邮件报警。
- 基于 AOP 的性能监控
- 性能日志&业务日志染色功能 
