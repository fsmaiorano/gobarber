import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    this.client.set(key, JSON.stringify(value));
  }

  public async recovery<T>(key: string): Promise<T | null> {
    const result = await this.client.get(key);
    try {
      if (result) {
        const parsedDate = JSON.parse(result) as T;
        return parsedDate;
      }
      return null;
    } catch {
      return null;
    }
  }

  public async invalidade(key: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async invalidadePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);
    const pipeline = this.client.pipeline();
    keys.forEach(key => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
