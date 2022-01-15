export class Configuration {
  static get envs() {
    return () => ({
      mongo: {
        connectionString: process.env.MONGO_CONNECTION_STRING,
        databaseName: process.env.MONGO_DATABASE_NAME,
      },
    });
  }
}
