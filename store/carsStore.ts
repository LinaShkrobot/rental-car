import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Car } from "@/types/car";
import { getCars } from "@/lib/services";

interface Filters {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

interface CarsState {
  cars: Car[];
  page: number;
  totalPages: number;
  loading: boolean;
  filters: Filters;
  favorites: string[];

  setFilter: (key: keyof Filters, value: string) => void;
  fetchCars: () => Promise<void>;
  loadMore: () => Promise<void>;
  toggleFavorite: (id: string) => void;
}

export const useCarsStore = create<CarsState>()(
  persist(
    (set, get) => ({
      cars: [],
      page: 1,
      totalPages: 1,
      loading: false,
      filters: {
        brand: "",
        rentalPrice: "",
        minMileage: "",
        maxMileage: "",
      },
      favorites: [],

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      fetchCars: async () => {
        set({ loading: true, cars: [], page: 1 });
        try {
          const { filters } = get();
          const data = await getCars(1, filters);
          set({
            cars: data.cars,
            totalPages: data.totalPages,
            page: 2,
          });
        } catch (error) {
          console.error("Failed to fetch cars:", error);
        } finally {
          set({ loading: false });
        }
      },

      loadMore: async () => {
        const { page, filters } = get();
        set({ loading: true });
        try {
          const data = await getCars(page, filters);
          set((state) => ({
            cars: [...state.cars, ...data.cars],
            totalPages: data.totalPages,
            page: state.page + 1,
          }));
        } catch (error) {
          console.error("Failed to load more cars:", error);
        } finally {
          set({ loading: false });
        }
      },

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fId) => fId !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: "rental-car-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);
