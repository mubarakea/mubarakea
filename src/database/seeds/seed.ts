import { initialCustomers } from './initialCustomers';
import { CustomerRepository } from '../repositories/CustomerRepository';

export async function seedCustomers() {
  const repo = new CustomerRepository();
  for (const cust of initialCustomers) {
    // you may want to guard against duplicates:
    const exists = await repo.getById(cust.id);
    if (!exists) {
      await repo.create(cust);
    }
  }
}
