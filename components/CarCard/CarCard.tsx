import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types/car";
import css from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
}

function formatMileage(mileage: number): string {
  return mileage.toLocaleString("uk-UA");
}

export default function CarCard({ car }: CarCardProps) {
  const city = car.address.split(", ")[1];
  const country = car.address.split(", ")[2];

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          fill
          className={css.image}
        />
      </div>

      <div className={css.titleRow}>
        <h3 className={css.title}>
          {car.brand} <span className={css.accent}>{car.model}</span>,{" "}
          {car.year}
        </h3>
        <span className={css.price}>${car.rentalPrice}</span>
      </div>

      <p className={`${css.info} ${css.infoLast}`}>
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
