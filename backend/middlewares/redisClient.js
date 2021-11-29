const asyncRedis = require('async-redis');
const config = require('../config');
const log4js = require('../common/logger');
const logger = log4js.getLogger('RedisClient');

const {
	map: _map,
	keys: _keys,
	values: _values,
	omit: _omit,
	isNil: _isNil
} = require('lodash');

const redisClient = getRedisClient();

function getRedisClient() {
	const cacheConnection = asyncRedis.createClient(config.redis.client);
	cacheConnection.on('error', err => {
		logger.error(`Error ${err}`);
		throw err;
	});
	return cacheConnection;
}

/*
Name:getDynamicKey
Desc: This funciton return a dynamic cache Key based on parameters*/
function getDynamicKey(key, obj) {
	let dynamicKey = '';
	_map(_keys(obj), data => {
		dynamicKey += (dynamicKey === '') ? `${data}_${obj[data]}` : `__${data}_${obj[data]}`;
	});
	logger.debug(`generation dynamic key from reddis ${key}`);
	return `sametalk${key}~${dynamicKey}`;
}

/*
 *Name:getData
 *desc: This function fetch data from redis server.
 *return: JSON object
 */
async function get(key) {
	try {
		logger.debug(`Getting key ${key} from reddis`);
		const cachedData = await redisClient.get(key);
		return cachedData !== null ? JSON.parse(cachedData) : null;
	} catch (error) {
		logger.error(`Getting error while reading key from reddis ${error}`);
		throw error;
	}
}

/*
 *Name: expire
 *desc: This function expires data from redis server
 *return: Object
 */
async function expire(key, expiry) {
	try {
		logger.debug(`expiring key ${key} from reddis`);
		return await redisClient.expire(key, expiry);
	} catch (error) {
		logger.error(`Getting error while key expiration  reddis ${error}`);
		throw error;
	}
}

/*
 *Name:setData
 *desc: this function save data into redis server.
 *return: object
 */
async function set(key, value) {
	try {
		logger.debug(`setting key ${key} in reddis`);
		return await redisClient.set(key, [JSON.stringify(value)]);
	} catch (error) {
		logger.error(`Error while setting  keys from reddis ${error}`);
		throw error;
	}
}

/*
 *Name:removeOne
 *desc: this function remove data from redis server.
 *return: object
 */
async function removeOne(key) {
	try {
		logger.debug(`removing key from reddis`);
		const response = await redisClient.del(key);
		return response;
	} catch (error) {
		logger.error(`Error while removing key ${error}`);
		throw error;
	}
}

/*
 *Name: getData
 *Desc: this function help to get data from redis server, if redis server has no data coresponding to param.key 
 * then get data from database and save into redis server with expiry as per param.expiry.
 *return: object
 */
function getData(cacheKey, query, queryParam = null, cacheKeyParam = null) {
	return new Promise(async (resolve, reject) => {
		try {
			const { expiry } = cacheKey;
			let { key } = cacheKey;
			if (cacheKeyParam != null) {
				key = getDynamicKey(key, cacheKeyParam);
			}
			const redisResponse = await get(key);

			if (redisResponse === null || redisResponse.length === 0) {
				const tempValues = _values(queryParam);
				const dbOutput = queryWrapper.execute(query, tempValues, async function (result) {
					if (result.errno && result.errno !== undefined) {
						logger.error(`ERROR : ${result.sqlMessage}`);
						resolve(result);
					} else {
						const dbResponse = _map(result, dbValue =>
							_omit(dbValue, ['updatedAt', 'deletedAt']),
						);
						logger.info("****************Response  from DB****************")
						await set(key, dbResponse);
						if (expiry === -1 || expiry === '-1') {
							logger.info(`No expiry key`)
						}
						else {
							await redisClient.expire(key, expiry);
						}
						resolve(dbResponse);
					}
				});
			} else {
				resolve(redisResponse);
			}
		} catch (error) {
			logger.error(`Redis error ${error}`);
			reject(error);
		}
	});
}

async function deleteAllDataFromRedis() {
	try {
		logger.debug(`delete all keys from reddis `);
		return await redisClient.flushdb();
	} catch (error) {
		logger.error(`Error while deleting all keys from reddis ${error}`);
		throw error;
	}
}
module.exports = {
	get,
	set,
	expire,
	getData,
	removeOne,
	deleteAllDataFromRedis,
};
