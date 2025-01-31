import { Cache, State } from "swr";

type DurationAwareCache<Data> = State<Data, Error> & {
  duration: number;
};

export default class SWRCache<Data = any> implements Cache<Data> {
  constructor(
    private readonly key: string,
    private readonly duration: number = 1000 * 60 * 15 // 15 minutes
  ) {}

  get cacheMap(): Map<string, DurationAwareCache<Data>> {
    const caches = localStorage.getItem(this.key);
    if (!caches) return new Map();

    const keys = JSON.parse(caches);
    return new Map<string, DurationAwareCache<Data>>(keys);
  }

  set cacheMap(caches: Map<string, DurationAwareCache<Data>>) {
    localStorage.setItem(this.key, JSON.stringify([...caches]));
  }

  keys(): IterableIterator<string> {
    return this.cacheMap.keys();
  }
  get(key: string): State<Data, Error> | undefined {
    const cacheMap = this.cacheMap;
    const cache = cacheMap.get(key);
    if (!cache) return undefined;

    const { duration, ...value } = cache;

    if (duration < Date.now()) {
      cacheMap.delete(key);
      this.cacheMap = cacheMap;
      return undefined;
    }
    return value;
  }
  set(key: string, value: State<Data, Error>): void {
    const cacheMap = this.cacheMap;
    cacheMap.set(key, {
      ...value,
      duration: Date.now() + this.duration,
    });
    this.cacheMap = cacheMap;
  }
  delete(key: string): void {
    const cacheMap = this.cacheMap;
    cacheMap.delete(key);
    this.cacheMap = cacheMap;
  }
}
