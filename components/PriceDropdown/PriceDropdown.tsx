"use client";

import { useState } from "react";
import styles from "./PriceDropdown.module.css";

type Props = {
  value: string;
  onChange: (price: string) => void;
};

const prices = ["30", "40", "50", "60", "70", "80"];

export default function PriceDropdown({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSelect(price: string) {
    onChange(price);
    setIsOpen(false);
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Price / 1 hour</span>
      <div className={styles.dropdown}>
        <button
          className={styles.trigger}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          {value ? `To $${value}` : "Choose a price"}
          <svg
            className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
            width="13"
            height="7"
          >
            <use href="/icons/sprite.svg#icon-chevron-down" />
          </svg>
        </button>

        {isOpen && (
          <ul className={styles.menu}>
            {prices.map((price) => (
              <li key={price}>
                <button
                  className={`${styles.option} ${
                    value === price ? styles.optionActive : ""
                  }`}
                  onClick={() => handleSelect(price)}
                  type="button"
                >
                  {price}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
