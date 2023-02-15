import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { MIKRO_ORM_DB_NAME } from './common/config';

const config: Options = {
  type: 'postgresql',
  dbName: MIKRO_ORM_DB_NAME,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations'
  },
  metadataProvider: TsMorphMetadataProvider
};

export default config;
