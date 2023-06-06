const client = require('./client');

const dataMapper = {
  async TEST() {
    const result = await client.query(`SELECT "nom", "description" FROM "article"`);
    return result.rows;
  },
};

module.exports = dataMapper;
