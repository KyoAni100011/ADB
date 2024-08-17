import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const getEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const dbConfig = {
  user: getEnv("DB_USERNAME"),
  password: getEnv("DB_PASSWORD"),
  server: getEnv("DB_HOST"),
  database: getEnv("DB_NAME"),
  port: 51207,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

class Database {
  static instance = null;

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new sql.ConnectionPool(dbConfig);
      Database.instance
        .connect()
        .then(() => {
          console.log("Connected to SQL Server");
          return Database.instance
            .request()
            .query("SELECT DB_NAME() AS DatabaseName");
        })
        .then((result) => {
          console.log(
            `Connected to database: ${result.recordset[0].DatabaseName}`
          );
        })
        .catch((err) => {
          console.error("Database connection failed:", err.message);
          process.exit(1);
        });
    }
    return Database.instance;
  }
}

export const poolPromise = Database.getInstance();
