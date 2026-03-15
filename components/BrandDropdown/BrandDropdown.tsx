"use client";

import { useEffect, useState } from "react";
import { useCarsStore } from "@/store/carsStore";
import styles from "./BrandDropdown.module.css";
import clsx from "clsx";

type Props = {
  value: string;
  onChange: (brand: string) => void;
};

export default function BrandDropdown({ value, onChange }: Props) {
  const { brands, fetchBrands } = useCarsStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  function handleSelect(brand: string) {
    onChange(brand);
    setIsOpen(false);
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Car brand</span>
      <div className={styles.dropdown}>
        <button
          className={styles.trigger}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          {value || "Choose a brand"}
          <svg
            className={clsx(styles.arrow, isOpen && styles.arrowOpen)}
            width="13"
            height="7"
          >
            <use href="/icons/sprite.svg#icon-chevron-down" />
          </svg>
        </button>

        {isOpen && (
          <ul className={styles.menu}>
            {brands.map((brand) => (
              <li key={brand}>
                <button
                  className={clsx(
                    styles.option,
                    value === brand && styles.optionActive,
                  )}
                  onClick={() => handleSelect(brand)}
                  type="button"
                >
                  {brand}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
