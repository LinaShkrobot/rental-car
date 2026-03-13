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
              placeholder="From"
              value={filters.minMileage}
              onChange={(e) => setFilter("minMileage", e.target.value)}
            />
            <input
              className={styles.mileageInput}
              type="text"
              placeholder="To"
              value={filters.maxMileage}
              onChange={(e) => setFilter("maxMileage", e.target.value)}
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

          {page <= totalPages && (
            <button
              className={styles.loadMore}
              onClick={loadMore}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          )}
        </>
      )}
    </section>
  );
}
