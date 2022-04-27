import styles from "./FiltersBar.module.css";
import { useState } from "react";
import { Filters } from "../Filters/Filters";

export const FiltersBar = () => {
  const [filterMode, setFilterMode] = useState<string>("Hide");

  const switchFilterMode = () => {
    setFilterMode(filterMode === "Hide" ? "Show" : "Hide");
  };

  return (
    <div className={styles.filtersBar}>
      <Filters filterMode={filterMode} />
      <button
        className="theme-button filter-button"
        onClick={() => {
          switchFilterMode();
        }}
      >
        {`${filterMode} filters`}
      </button>
    </div>
  );
};
