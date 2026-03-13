"use client";

import { useEffect } from "react";
import { useCarsStore } from "@/store/carsStore";
import CarCard from "@/components/CarCard/CarCard";
import BrandDropdown from "@/components/BrandDropdown/BrandDropdown";
import PriceDropdown from "@/components/PriceDropdown/PriceDropdown";
import Loader from "@/components/Loader/Loader";
import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  const {
    cars,
    page,
    totalPages,
    loading,
    filters,
    setFilter,
    fetchCars,
    loadMore,
  } = useCarsStore();

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  function handleSearch() {
    fetchCars();
  }

  function formatMileage(prefix: string, value: string): string {
    const digits = value.replace(/\D/g, "");
    return digits
      ? `${prefix} ${Number(digits).toLocaleString("en-US")}`
      : prefix;
  }

  function handleMileageChange(
    name: "minMileage" | "maxMileage",
    value: string,
  ) {
    const digits = value.replace(/\D/g, "");
    setFilter(name, digits);
  }

  return (
    <section className={styles.container}>
      <div className={styles.filters}>
        <BrandDropdown
          value={filters.brand}
          onChange={(val) => setFilter("brand", val)}
        />
        <PriceDropdown
          value={filters.rentalPrice}
          onChange={(val) => setFilter("rentalPrice", val)}
        />
        <div className={styles.mileageGroup}>
          <span className={styles.mileageLabel}>Car mileage / km</span>
          <div className={styles.mileageInputs}>
            <input
              className={styles.mileageInput}
              type="text"
              value={formatMileage("From", filters.minMileage)}
              onChange={(e) =>
                handleMileageChange("minMileage", e.target.value)
              }
            />
            <input
              className={styles.mileageInput}
              type="text"
              value={formatMileage("To", filters.maxMileage)}
              onChange={(e) =>
                handleMileageChange("maxMileage", e.target.value)
              }
            />
          </div>
        </div>
        <button
          className={styles.searchBtn}
          onClick={handleSearch}
          type="button"
        >
          Search
        </button>
      </div>

      {loading && cars.length === 0 ? (
        <Loader />
      ) : (
        <>
          <ul className={styles.list}>
            {cars.map((car) => (
              <li key={car.id}>
                <CarCard car={car} />
              </li>
            ))}
          </ul>

          {page <= totalPages &&
            (loading ? (
              <Loader />
            ) : (
              <button
                className={styles.loadMore}
                onClick={loadMore}
                type="button"
              >
                Load more
              </button>
            ))}
        </>
      )}
    </section>
  );
}
