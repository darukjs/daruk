const TYPES = {
  Loader: Symbol.for('Loader'),
  Koa: Symbol.for('Newable<Koa>'),
  KoaLogger: Symbol.for('Newable<KoaLogger.logger>'),
  Daruk: Symbol.for('Daruk'),
  ControllerClass: Symbol.for('Newable<controllerClass>'),
  PLUGINCLASS: Symbol.for('Newable<pluginClass>'),
  DarukOptions: Symbol.for('Value<DarukOptions>'),
  PluginInstance: Symbol.for('Value<PluginInstance>'),
  Timer: Symbol.for('Newable<Timer>'),
  Middleware: Symbol.for('Newable<GlobalMiddleware>'),
  Service: Symbol.for('Newable<Service>')
};

export { TYPES };
