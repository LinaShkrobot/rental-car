import api from "./api";
import { Car, CarsResponse } from "@/types/car";
interface Filters {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
}

export async function getCars(
  page: number = 1,
  filters: Filters = {},
): Promise<CarsResponse> {
  const params: Record<string, string | number> = { page };

  if (filters.brand) params.brand = filters.brand;
  if (filters.rentalPrice) params.rentalPrice = filters.rentalPrice;
  if (filters.minMileage) params.minMileage = filters.minMileage;
  if (filters.maxMileage) params.maxMileage = filters.maxMileage;

  const { data } = await api.get<CarsResponse>("/cars", { params });
  return data;
}

export async function getBrands(): Promise<string[]> {
  const { data } = await api.get<string[]>("/brands");
  return data;
}

export async function getCarById(id: string): Promise<Car> {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
}
