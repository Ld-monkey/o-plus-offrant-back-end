const { Pool } = require('pg');

const pool = new Pool({
  min: 0,
  max: 10,
  createTimeoutMillis: 8000,
  acquireTimeoutMillis: 8000,
  idleTimeoutMillis: 8000,
  reapIntervalMillis: 1000,
  createRetryIntervalMillis: 100,
});

pool.connect();

module.exports = pool;
