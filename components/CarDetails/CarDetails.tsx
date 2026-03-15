"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useCarsStore } from "@/store/carsStore";
import { parseAddress } from "@/lib/utils";
import BookingForm from "@/components/BookingForm/BookingForm";
import Loader from "@/components/Loader/Loader";
import Icon from "@/components/Icon/Icon";
import css from "./CarDetails.module.css";

export default function CarDetails({ id }: { id: string }) {
  const {
    currentCar: car,
    currentCarLoading: loading,
    fetchCarById,
  } = useCarsStore();

  useEffect(() => {
    fetchCarById(id);
  }, [id, fetchCarById]);

  if (loading) return <Loader />;
  if (!car) return <p className={css.error}>Car not found</p>;

  const { city, country } = parseAddress(car.address);

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
        <BookingForm />
      </div>

      <div className={css.right}>
        <h2 className={css.title}>
          {car.brand} {car.model}, {car.year}
          <span className={css.id}> Id: {car.id.slice(0, 4)}</span>
        </h2>
        <p className={css.location}>
          <Icon name="location" className={css.icon} />
          {city}, {country}
          <span className={css.mileage}>
            Mileage: {car.mileage.toLocaleString("uk-UA")} km
          </span>
        </p>
        <p className={css.price}>${car.rentalPrice}</p>
        <p className={css.description}>{car.description}</p>

        <h3 className={css.subtitle}>Rental Conditions:</h3>
        <ul className={css.conditionsList}>
          {car.rentalConditions.map((condition, i) => (
            <li key={i} className={css.conditionItem}>
              <Icon name="check-circle" className={css.checkIcon} />
              {condition}
            </li>
          ))}
        </ul>

        <h3 className={css.subtitle}>Car Specifications:</h3>
        <ul className={css.conditionsList}>
          <li className={css.conditionItem}>
            <Icon name="calendar" className={css.checkIcon} />
            Year: {car.year}
          </li>
          <li className={css.conditionItem}>
            <Icon name="car" className={css.checkIcon} />
            Type: {car.type}
          </li>
          <li className={css.conditionItem}>
            <Icon name="fuel" className={css.checkIcon} />
            Fuel Consumption: {car.fuelConsumption}
          </li>
          <li className={css.conditionItem}>
            <Icon name="engine" className={css.checkIcon} />
            Engine Size: {car.engineSize}
          </li>
        </ul>

        <h3 className={css.subtitle}>Accessories and functionalities:</h3>
        <ul className={css.conditionsList}>
          {[...car.accessories, ...car.functionalities].map((item, i) => (
            <li key={i} className={css.conditionItem}>
              <Icon name="check-circle" className={css.checkIcon} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
