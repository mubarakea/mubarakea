export const up = `
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT,
  vat_number TEXT,
  cr_number TEXT,
  contact_person TEXT,
  phone_number TEXT,
  email TEXT,
  route_days TEXT,
  building_en TEXT,
  building_ar TEXT,
  secondary_en TEXT,
  secondary_ar TEXT,
  street_en TEXT,
  street_ar TEXT,
  district_en TEXT,
  district_ar TEXT,
  city_en TEXT,
  city_ar TEXT,
  postal_en TEXT,
  postal_ar TEXT
);
`;
