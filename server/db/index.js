import { Pool } from 'pg';
import { config } from 'dotenv';


config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default {
  /**
     * DB QUERY
     *
     */

  query(text, params) {
    return pool.query(text, params);
  },
};
