import { SQLiteDatabase } from 'expo-sqlite';
import { Database } from '../Database';
import { Customer } from '../models/Customer';

export class CustomerRepository {
  private db: SQLiteDatabase;

  constructor() {
    this.db = Database.getInstance().getConnection();
  }

  getAll(): Customer[] {
    const customers: Customer[] = [];

    this.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM customers;', [], (_, result) => {
        for (let i = 0; i < result.rows.length; i++) {
          customers.push(result.rows.item(i));
        }
      });
    });

    return customers;
  }

  getById(id: string): Customer | null {
    let customer: Customer | null = null;

    this.db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM customers WHERE id = ?;',
        [id],
        (_, result) => {
          if (result.rows.length > 0) {
            customer = result.rows.item(0);
          }
        }
      );
    });

    return customer;
  }

  create(customer: Customer): void {
    this.db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO customers (
          id, name_en, name_ar,
          vat_number, cr_number,
          contact_person, phone_number, email,
          route_days,
          building_en, building_ar,
          secondary_en, secondary_ar,
          street_en, street_ar,
          district_en, district_ar,
          city_en, city_ar,
          postal_en, postal_ar
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
        [
          customer.id,
          customer.name_en,
          customer.name_ar,
          customer.vat_number,
          customer.cr_number,
          customer.contact_person,
          customer.phone_number,
          customer.email,
          customer.route_days,
          customer.building_en,
          customer.building_ar,
          customer.secondary_en,
          customer.secondary_ar,
          customer.street_en,
          customer.street_ar,
          customer.district_en,
          customer.district_ar,
          customer.city_en,
          customer.city_ar,
          customer.postal_en,
          customer.postal_ar,
        ]
      );
    });
  }

  update(customer: Customer): void {
    this.db.transaction((tx) => {
      tx.executeSql(
        `UPDATE customers SET
          name_en=?, name_ar=?, vat_number=?, cr_number=?,
          contact_person=?, phone_number=?, email=?, route_days=?,
          building_en=?, building_ar=?, secondary_en=?, secondary_ar=?,
          street_en=?, street_ar=?, district_en=?, district_ar=?,
          city_en=?, city_ar=?, postal_en=?, postal_ar=?
        WHERE id = ?;`,
        [
          customer.name_en,
          customer.name_ar,
          customer.vat_number,
          customer.cr_number,
          customer.contact_person,
          customer.phone_number,
          customer.email,
          customer.route_days,
          customer.building_en,
          customer.building_ar,
          customer.secondary_en,
          customer.secondary_ar,
          customer.street_en,
          customer.street_ar,
          customer.district_en,
          customer.district_ar,
          customer.city_en,
          customer.city_ar,
          customer.postal_en,
          customer.postal_ar,
          customer.id,
        ]
      );
    });
  }

  delete(id: string): void {
    this.db.transaction((tx) => {
      tx.executeSql('DELETE FROM customers WHERE id = ?;', [id]);
    });
  }
}
