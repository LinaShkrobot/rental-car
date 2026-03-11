"use client";

import { useEffect, useState } from "react";
import { Car } from "@/types/car";
import { getCars } from "@/lib/services";
import CarCard from "@/components/CarCard/CarCard";
import Loader from "@/components/Loader/Loader";
import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFirstPage() {
      try {
        const data = await getCars(1);
        setCars(data.cars);
        setTotalPages(data.totalPages);
        setPage(2);
      } catch (error) {
        console.error("Failed to load cars:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFirstPage();
  }, []);

  async function loadMore() {
    setLoading(true);
    try {
      const data = await getCars(page);
      setCars((prev) => [...prev, ...data.cars]);
      setTotalPages(data.totalPages);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to load cars:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.container}>
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
