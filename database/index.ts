import { Database } from './Database';

export async function initializeDatabase(): Promise<void> {
  await Database.getInstance().init();
}
