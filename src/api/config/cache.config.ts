import NodeCache from 'node-cache';

import { CACHE_DURATION } from './environment.config';

class CacheConfiguration {
  private static instance: CacheConfiguration;

  private options = {
    stdTTL: CACHE_DURATION,
    checkperiod: CACHE_DURATION * 0.2,
    useClones: false,
  };

  private cache: NodeCache;

  private constructor() {}

  static get(): CacheConfiguration {
    if (!CacheConfiguration.instance) {
      CacheConfiguration.instance = new CacheConfiguration();
    }
    return CacheConfiguration.instance;
  }

  init() {
    this.cache = new NodeCache(this.options);

    return this;
  }

  getCache<T>(key: string | number): T | undefined {
    return this.cache.get<T>(key);
  }

  setCache<T>(key: string | number, value: T) {
    this.cache.set(key, value);
  }
}

const cacheConfiguration = CacheConfiguration.get().init();

export { cacheConfiguration as Cache };
