import Redis, { Redis as RedisClient } from 'ioredis'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

import cacheConfig from '@config/cache'

class RedisCacheProvider implements ICacheProvider {
	private client: RedisClient

	constructor() {
		this.client = new Redis(cacheConfig.config.redis)
	}

	public async save(key: string, value: any) {
		await this.client.set(key, JSON.stringify(value))
	}

	public async recover<T>(key: string) {
		const data = await this.client.get(key)

		if (!data) {
			return null
		}

		const parsedData = JSON.parse(data) as T

		return parsedData
	}

	public async invalidate(key: string) {}

	public async invalidatePrefix(prefix: string) {
		const keys = await this.client.keys(`${prefix}:*`)

		const pipeline = this.client.pipeline()

		keys.forEach(key => pipeline.del(key))

		await pipeline.exec()
	}
}

export default RedisCacheProvider
