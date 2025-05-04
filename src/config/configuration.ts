export default () => ({
  port: parseInt(process.env.PORT ? process.env.PORT : '3000'),
  secret: process.env.SECRET,

  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT ? process.env.DB_PORT : '5432'),
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
});
