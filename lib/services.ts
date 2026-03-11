import api from "./api";
import { CarsResponse } from "@/types/car";

export async function getCars(page: number = 1) {
  const { data } = await api.get<CarsResponse>("/cars", {
    params: { page },
  });
  return data;
}

export async function getBrands(): Promise<string[]> {
  const { data } = await api.get<string[]>("/brands");
  return data;
}
