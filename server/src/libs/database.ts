import { MikroORM, PostgreSqlDriver } from '@mikro-orm/postgresql';

const initializeDatabase = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>({
    entities: ['./dist/entities'],
    entitiesTs: ['./src/entities'],
    dbName: 'movie',
  });
};

export default initializeDatabase;
