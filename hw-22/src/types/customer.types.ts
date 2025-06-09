import { COUNTRIES } from "data/customers/countries.data";

export interface ICustomer {
  email: string;
  name: string;
  country: COUNTRIES;
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  notes?: string;
}

export type ICustomerInTable = Pick<ICustomer, "email" | "country" | "name">;
