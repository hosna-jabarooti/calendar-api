import 'dotenv/config';
import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { Event } from './src/events/event.entity.js';

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    entities: [Event],

    migrations: ['src/migrations/*.ts'],
});

