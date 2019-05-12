# feature todo list

We want be support features before v1.0.0 version's todo list:

- request:

  - [x] @required({methodName:key})
  - [x] @validate(method,key,validFunc])
  - [x] @useAuth(middleware)
  - [x] @security(type,username,password)

- response:

  - [x] @header(key, value)
  - [x] @headers({key1:value1,key2:value2})
  - [√] @type(type:string)
  - [√] @redirect(path:string)
  - [x] @cache

- arguments:

  - [x] @param(key:string)
  - [x] @body(key:string)
  - [x] @query(key:string)

- Class:

  - [x] @controller(path:string)
  - [x] @timer(cronTime:string)
  - [x] @inject(LibName:string)
  - [x] @provide(LibName)
  - [x] @ctx(routerPath)

- controllerClass:

  - [x] @local
  - [√] @prefix(path:string)

- utils:

  - [x] @decorator
  - [x] @globalSetting
