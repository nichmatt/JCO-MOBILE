const Redis = require("ioredis");

let redis;

const initializeRedis = () => {
  redis = new Redis({
    port: 14482,
    host: "redis-14482.c84.us-east-1-2.ec2.cloud.redislabs.com",
    password: "j5wkejECBkgeSI52abM5s9zofZc9e5X8",
    connectTimeout: 10000,
  });
};

const getRedis = () => {
  return redis;
};

module.exports = { getRedis, initializeRedis };
