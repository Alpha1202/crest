import { Pool } from 'pg';
import { config } from 'dotenv';


config();



let databaseUrl = '';

if (process.env.NODE_ENV === 'production') {
  databaseUrl = process.env.DATABASE_URL;
} else if (process.env.NODE_ENV === 'test') {
  databaseUrl = process.env.TEST_DATABASE_URL;
} else {
  databaseUrl = process.env.DEV_DATABASE_URL;
}


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
