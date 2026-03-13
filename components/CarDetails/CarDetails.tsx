"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Car } from "@/types/car";
import { getCarById } from "@/lib/services";
import BookingForm from "@/components/BookingForm/BookingForm";
import Loader from "@/components/Loader/Loader";
import css from "./CarDetails.module.css";

function formatMileage(mileage: number): string {
  return mileage.toLocaleString("uk-UA");
}

export default function CarDetails({ id }: { id: string }) {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCar() {
      try {
        const data = await getCarById(id);
        setCar(data);
      } catch (error) {
        console.error("Failed to load car:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);

  if (loading) return <Loader />;
  if (!car) return <p className={css.error}>Car not found</p>;

  const city = car.address.split(", ")[1];
  const country = car.address.split(", ")[2];

  return (
    <section className={css.container}>
      <div className={css.left}>
        <div className={css.imageWrapper}>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            fill
            className={css.image}
          />
        </div>
        <BookingForm carId={car.id} />
      </div>

      <div className={css.right}>
        <h2 className={css.title}>
          {car.brand} {car.model}, {car.year}
          <span className={css.id}> Id: {car.id.slice(0, 4)}</span>
        </h2>
        <p className={css.location}>
          <svg width="16" height="16" className={css.icon}>
            <use href="/icons/sprite.svg#icon-location" />
          </svg>
          {city}, {country}
          &nbsp;&nbsp;&nbsp;Mileage: {formatMileage(car.mileage)} km
        </p>
        <p className={css.price}>${car.rentalPrice}</p>
        <p className={css.description}>{car.description}</p>

        <h3 className={css.subtitle}>Rental Conditions:</h3>
        <ul className={css.conditionsList}>
          {car.rentalConditions.map((condition, i) => (
            <li key={i} className={css.conditionItem}>
              <svg width="16" height="16" className={css.checkIcon}>
                <use href="/icons/sprite.svg#icon-check-circle" />
              </svg>
              {condition}
            </li>
          ))}
        </ul>

        <h3 className={css.subtitle}>Car Specifications:</h3>
        <ul className={css.conditionsList}>
          <li className={css.conditionItem}>
            <svg width="16" height="16" className={css.checkIcon}>
              <use href="/icons/sprite.svg#icon-calendar" />
            </svg>
            Year: {car.year}
          </li>
          <li className={css.conditionItem}>
            <svg width="16" height="16" className={css.checkIcon}>
              <use href="/icons/sprite.svg#icon-car" />
            </svg>
            Type: {car.type}
          </li>
          <li className={css.conditionItem}>
            <svg width="16" height="16" className={css.checkIcon}>
              <use href="/icons/sprite.svg#icon-fuel" />
            </svg>
            Fuel Consumption: {car.fuelConsumption}
          </li>
          <li className={css.conditionItem}>
            <svg width="16" height="16" className={css.checkIcon}>
              <use href="/icons/sprite.svg#icon-engine" />
            </svg>
            Engine Size: {car.engineSize}
          </li>
        </ul>

        <h3 className={css.subtitle}>Accessories and functionalities:</h3>
        <ul className={css.conditionsList}>
          {[...car.accessories, ...car.functionalities].map((item, i) => (
            <li key={i} className={css.conditionItem}>
              <svg width="16" height="16" className={css.checkIcon}>
                <use href="/icons/sprite.svg#icon-check-circle" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
