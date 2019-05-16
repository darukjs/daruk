# Todo

Todo list of features we want to support before version v1.0.0:

- request:

  - [ ] @param(key:string)
  - [ ] @body(key:string)
  - [ ] @query(key:string)
  - [ ] @required({methodName:keys})
  - [ ] @validate(method,key,validFunc)
  - [ ] @auth(middleware)
  - [ ] @security(type,username,password)
  - [ ] @headers(key?:string)

- response:

  - [x] @header(key|fields, ?value)
  - [x] @type(type:string)
  - [x] @redirect(path:string)
  - [ ] @cache

- Class:

  - [ ] @controller(path:string)
  - [ ] @timer(cronTime:string)
  - [ ] @inject(LibName:string)
  - [ ] @provide(LibName)
  - [ ] @ctx(routerPath)

- controllerClass:

  - [ ] @local
  - [x] @prefix(path:string)

* utils:

  - [ ] @decorator
