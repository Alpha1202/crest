import { Pool } from 'pg';
import { config } from 'dotenv';


config();

let databaseUrl = '';

if (process.env.NODE_ENV !== 'test') {
  databaseUrl = process.env.DATABASE_URL;
} else {
  databaseUrl = process.env.TEST_DATABASE_URL;
}

console.log('DATABASE UR 2 ::::::::::::::::::::', databaseUrl);

const pool = new Pool({
  connectionString: databaseUrl,
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
