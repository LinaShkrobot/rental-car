import api from "./api";
import { Car, CarsResponse, Filters } from "@/types/car";

export async function getCars(
  page: number = 1,
  filters: Partial<Filters> = {},
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
