import { Cache, State } from "swr";

export default class SWRCache<Data = any> implements Cache<Data> {
  constructor(private readonly key: string) {}
  keys(): IterableIterator<string> {
    throw new Error("Method not implemented.");
  }
  get(key: string): State<Data, Error> | undefined {
    throw new Error("Method not implemented.");
  }
  set(key: string, value: State<Data, Error>): void {
    throw new Error("Method not implemented.");
  }
  delete(key: string): void {
    throw new Error("Method not implemented.");
  }
}
