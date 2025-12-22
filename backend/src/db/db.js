import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();
import knexConfig from '../../knexfile.js';

const db = knex(knexConfig.development);

export default db;
