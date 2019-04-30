class Cache {
  public store: any;
  public constructor() {
    this.store = {};
  }
  public set(key: string, data: any) {
    this.store[key] = data;
  }
  public get(key: string) {
    return this.store[key];
  }
}

export default function() {
  return new Cache();
}
