# Todo

Todo list of features we want to support before version v1.0.0:

- request:

  - [ ] @typeParse(key:string)
  - [ ] @required({methodName:keys})
  - [ ] @validate(method,key,validFunc)

- response:

  - [x] @header(key|fields, ?value)
  - [x] @type(type:string)
  - [x] @redirect(path:string)
  - [ ] @cache(options,store)

- Class:

  - [ ] @inject(service:string)
  - [ ] @provide(service:string)

- controllerClass:

  - [x] @prefix(path:string)

- utils:

  - [ ] decoratorFactory
  - [ ] Darukx
