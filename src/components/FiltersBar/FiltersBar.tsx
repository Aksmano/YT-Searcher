import styles from "./FiltersBar.module.css";
import { useEffect, useState } from "react";
import { Filters } from "../Filters/Filters";
import { useLocation } from "react-router-dom";

export const FiltersBar = () => {
  const [filterMode, setFilterMode] = useState<string>("Hide");
  const [hideFiltersBar, setHideFiltersBar] = useState<boolean>(false);
  const location = useLocation();

  const switchFilterMode = () => {
    setFilterMode(filterMode === "Hide" ? "Show" : "Hide");
  };

  useEffect(() => {
    if (location.pathname.substring(0, 6) === "/video") setHideFiltersBar(true);
    else setHideFiltersBar(false);
  }, [location.pathname]);

  return hideFiltersBar ? null : (
    <div className={styles.filtersBar}>
      <Filters filterMode={filterMode} />
      <button
        className={`theme-button ${styles.filterMode}`}
        onClick={() => {
          switchFilterMode();
        }}
      >
        {`${filterMode} filters`}
      </button>
    </div>
  );
};
