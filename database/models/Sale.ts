export interface Sale {
    id?: number;              // auto increment
    customer_id: string;      // FK to Customer.id
    items: string;            // e.g. JSON.stringify(...)
    total_amount: number;
    paying_amount: number;
    due_amount: number;
    date: string;             // ISO timestamp or your chosen format
  }
  