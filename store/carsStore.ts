import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Car, Filters } from "@/types/car";
import { getCars, getCarById, getBrands } from "@/lib/services";
import toast from "react-hot-toast";

interface CarsState {
  cars: Car[];
  page: number;
  totalPages: number;
  loading: boolean;
  filters: Filters;
  favorites: string[];
  currentCar: Car | null;
  currentCarLoading: boolean;
  brands: string[];

  setFilter: (key: keyof Filters, value: string) => void;
  fetchCars: () => Promise<void>;
  loadMore: () => Promise<void>;
  toggleFavorite: (id: string) => void;
  fetchCarById: (id: string) => Promise<void>;
  fetchBrands: () => Promise<void>;
}

export const useCarsStore = create<CarsState>()(
  persist(
    (set, get) => ({
      cars: [],
      page: 1,
      totalPages: 1,
      loading: false,
      currentCar: null,
      currentCarLoading: false,
      filters: {
        brand: "",
        rentalPrice: "",
        minMileage: "",
        maxMileage: "",
      },
      favorites: [],
      brands: [],

      fetchBrands: async () => {
        if (get().brands.length > 0) return;
        try {
          const data = await getBrands();
          set({ brands: data });
        } catch (error) {
          console.error("Failed to load brands:", error);
          toast.error("Failed to load brands.");
        }
      },

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      fetchCarById: async (id) => {
        set({ currentCarLoading: true, currentCar: null });
        try {
          const data = await getCarById(id);
          set({ currentCar: data });
        } catch (error) {
          console.error("Failed to fetch car:", error);
          toast.error("Failed to load car details. Please try again.");
        } finally {
          set({ currentCarLoading: false });
        }
      },

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
          toast.error("Failed to load cars. Please try again.");
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
          toast.error("Failed to load more cars. Please try again.");
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
