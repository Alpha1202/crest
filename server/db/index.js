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
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
