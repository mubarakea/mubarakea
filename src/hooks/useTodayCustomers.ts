// src/hooks/useTodayCustomers.ts
import { useState, useEffect } from 'react';
import { CustomerRepository } from '../database/repositories/CustomerRepository';
import { Customer } from '../database/models/Customer';

export function useTodayCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState(true);

  const repo = new CustomerRepository();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const load = async () => {
    setLoading(true);
    const all = await repo.getAll();
    setCustomers(all);
    setLoading(false);
  };

  // initial & refresh
  useEffect(() => { load(); }, []);

  // filter + search
  const filtered = customers.filter(c =>
    c.route_days === today &&
    (search === '' ||
      c.name_en.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search))
  );

  return {
    today,
    loading,
    collapsed,
    setCollapsed,
    search,
    setSearch,
    data: collapsed ? [] : filtered,
    refresh: load,
  };
}
