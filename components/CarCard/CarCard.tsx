"use client";

import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types/car";
import { formatMileage, parseAddress } from "@/lib/utils";
import { useCarsStore } from "@/store/carsStore";
import css from "./CarCard.module.css";
import clsx from "clsx";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const { favorites, toggleFavorite } = useCarsStore();
  const isFavorite = favorites.includes(car.id);

  const { city, country } = parseAddress(car.address);

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          fill
          className={css.image}
        />
        <button
          className={css.favoriteBtn}
          onClick={() => toggleFavorite(car.id)}
          type="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            width="16"
            height="15"
            className={isFavorite ? css.favoriteActive : css.favoriteIcon}
          >
            <use
              href={`/icons/sprite.svg#${isFavorite ? "icon-heart-filled" : "icon-heart"}`}
            />
          </svg>
        </button>
      </div>

      <div className={css.titleRow}>
        <h3 className={css.title}>
          {car.brand} <span className={css.accent}>{car.model}</span>,{" "}
          {car.year}
        </h3>
        <span className={css.price}>${car.rentalPrice}</span>
      </div>

      <p className={clsx(css.info, css.infoLast)}>
        {city} | {country} | {car.rentalCompany}
      </p>
      <p className={css.info}>
        {car.type} | {formatMileage(car.mileage)} km
      </p>

      <Link href={`/catalog/${car.id}`} className={css.readMore}>
        Read more
      </Link>
    </div>
  );
}
