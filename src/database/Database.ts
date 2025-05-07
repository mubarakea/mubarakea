import { openDatabaseSync, SQLiteDatabase } from 'expo-sqlite';

const DB_NAME = 'VadproSales.db';

export class Database {
  private static instance: Database;
  private db: SQLiteDatabase;

  private constructor() {
    this.db = openDatabaseSync(DB_NAME);
    this.enableForeignKeys();
    this.runMigrations();
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private enableForeignKeys(): void {
    this.db.transaction((tx) => {
      tx.executeSql('PRAGMA foreign_keys = ON;');
    });
  }

  private runMigrations(): void {
    const migrations = [
      require('./migrations/1_create_customers_table').up,
      require('./migrations/2_create_sales_table').up,
    ];

    this.db.transaction((tx) => {
      for (const sql of migrations) {
        tx.executeSql(sql);
      }
    });
  }

  getConnection(): SQLiteDatabase {
    return this.db;
  }
}
