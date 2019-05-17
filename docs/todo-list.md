# Todo

- request:

  - [ ] @typeParse(key:string)
  - [x] @required({methodName:keys})
  - [ ] @validate(method,key,validFunc)

- response:

  - [x] @header(key|fields, ?value)
  - [x] @type(type:string)
  - [x] @redirect(path:string)
  - [ ] @cache(options,store)

- Ioc:

  - [ ] @inject(service:string) property | arguments
  - [ ] @provide(service:string)
  - [ ] @async() async provide init
  - [ ] @scope(scopeEum) global | access | prototype
  - [ ] bindProvide(id, provider)
  - [ ] Container
  - [ ] Container.bind(class)
  - [ ] Container.registerInstance(instance)
  - [ ] Container.dump()

- controllerClass:

  - [x] @prefix(path:string)

- utils:

  - [ ] decoratorFactory
  - [ ] DarukX
