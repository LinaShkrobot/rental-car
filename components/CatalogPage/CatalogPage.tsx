"use client";

import { useEffect } from "react";
import { useCarsStore } from "@/store/carsStore";
import CarCard from "@/components/CarCard/CarCard";
import BrandDropdown from "@/components/BrandDropdown/BrandDropdown";
import PriceDropdown from "@/components/PriceDropdown/PriceDropdown";
import Loader from "@/components/Loader/Loader";
import styles from "./CatalogPage.module.css";
import { formatMileageInput } from "@/lib/utils";
import Button from "@/components/Button/Button";

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
              value={formatMileageInput("From", filters.minMileage)}
              onChange={(e) =>
                handleMileageChange("minMileage", e.target.value)
              }
            />
            <input
              className={styles.mileageInput}
              type="text"
              value={formatMileageInput("To", filters.maxMileage)}
              onChange={(e) =>
                handleMileageChange("maxMileage", e.target.value)
              }
            />
          </div>
        </div>
        <Button onClick={handleSearch} type="button">
          Search
        </Button>
      </div>

      {loading && cars.length === 0 ? (
        <Loader />
      ) : (
        <>
          {cars.length > 0 ? (
            <ul className={styles.list}>
              {cars.map((car) => (
                <li key={car.id}>
                  <CarCard car={car} />
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>
              No cars found matching your criteria.
            </p>
          )}

          {page <= totalPages &&
            (loading ? (
              <Loader />
            ) : (
              <Button
                variant="outline"
                onClick={loadMore}
                type="button"
                className={styles.loadMoreBtn}
              >
                Load more
              </Button>
            ))}
        </>
      )}
    </section>
  );
}
