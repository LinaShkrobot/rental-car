"use client";

import { useEffect, useState } from "react";
import { getBrands } from "@/lib/services";
import styles from "./BrandDropdown.module.css";

type Props = {
  value: string;
  onChange: (brand: string) => void;
};

export default function BrandDropdown({ value, onChange }: Props) {
  const [brands, setBrands] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const data = await getBrands();
        setBrands(data);
      } catch (error) {
        console.error("Failed to load brands:", error);
      }
    }
    fetchBrands();
  }, []);

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
            className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
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
                  className={`${styles.option} ${
                    value === brand ? styles.optionActive : ""
                  }`}
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
