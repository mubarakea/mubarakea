import { Database } from '../Database';
import { Sale } from '../models/Sale';
import { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';

export class SaleRepository {
  private db: SQLiteDatabase;

  constructor() {
    this.db = Database.getInstance().getConnection();
  }

  async getAll(): Promise<Sale[]> {
    const results = await this.db.executeSql('SELECT * FROM sales;');
    const result: ResultSet = results[0];
    const out: Sale[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      out.push(result.rows.item(i));
    }
    return out;
  }

  async getById(id: number): Promise<Sale | null> {
    const results = await this.db.executeSql(
      'SELECT * FROM sales WHERE id = ?;',
      [id]
    );
    const result: ResultSet = results[0];
    if (result.rows.length === 0) return null;
    return result.rows.item(0);
  }

  async getByCustomer(customer_id: string): Promise<Sale[]> {
    const results = await this.db.executeSql(
      'SELECT * FROM sales WHERE customer_id = ?;',
      [customer_id]
    );
    const result: ResultSet = results[0];
    const out: Sale[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      out.push(result.rows.item(i));
    }
    return out;
  }

  async create(sale: Omit<Sale, 'id'>): Promise<void> {
    await this.db.executeSql(
      `INSERT INTO sales
        (customer_id, items, total_amount, paying_amount, due_amount, date)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [
        sale.customer_id,
        sale.items,
        sale.total_amount,
        sale.paying_amount,
        sale.due_amount,
        sale.date,
      ]
    );
  }
}
