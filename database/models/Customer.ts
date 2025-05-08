export interface Customer {
    id: string;
    name_en: string;
    name_ar: string | null;
    vat_number: string | null;
    cr_number: string | null;
    contact_person: string | null;
    phone_number: string | null;
    email: string | null;
    route_days: string | null;
    building_en: string | null;
    building_ar: string | null;
    secondary_en: string | null;
    secondary_ar: string | null;
    street_en: string | null;
    street_ar: string | null;
    district_en: string | null;
    district_ar: string | null;
    city_en: string | null;
    city_ar: string | null;
    postal_en: string | null;
    postal_ar: string | null;
  }
  