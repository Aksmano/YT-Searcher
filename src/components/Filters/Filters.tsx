import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSearchBar, setNewParam } from "../SearchBar/SearchBarSlice";
import styles from "./Filters.module.css";

interface FiltersProps {
  filterMode: string;
}

export const Filters = ({ filterMode }: FiltersProps) => {
  // ZROBIC NA WZOR POKEMONOW
  const dispatch = useAppDispatch();
  const searchBar = useAppSelector(selectSearchBar);

  const chooseFilterMode = (): string => {
    return filterMode === "Hide" ? styles.hide : "";
  };

  const handleSetSearchOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    dispatch(
      setNewParam({ ...searchBar.newSearchQuery, order: e.target.value })
    );
  };

  const handleSetSearchVideoDuration = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    dispatch(
      setNewParam({
        ...searchBar.newSearchQuery,
        videoDuration: e.target.value,
      })
    );
  };

  const resetSearchQuery = () => {
    dispatch(
      setNewParam({
        ...searchBar.newSearchQuery,
        videoDuration: "",
        order: "",
      })
    );
  };

  return (
    <div className={`${styles.navFilters} ${chooseFilterMode()}`}>
      <div className={styles.filters}>
        <form>
          <label htmlFor="time">Time</label>
          <select
            name="time"
            id="time"
            className={styles.input}
            onChange={handleSetSearchVideoDuration}
          >
            <option value="any" defaultChecked>
              Any
            </option>
            <option value="short">0 to 4 minutes</option>
            <option value="medium">4 to 20 minutes</option>
            <option value="long">20 minutes+</option>
          </select>
          <label htmlFor="order">Order by</label>
          <select
            name="order"
            id="order"
            className={styles.input}
            onChange={handleSetSearchOrder}
          >
            <option value="relevance" defaultChecked>
              Relevance
            </option>
            <option value="rating">Rating</option>
            <option value="date">Date</option>
            <option value="title">Title</option>
            <option value="videoCount">Video Count</option>
            <option value="viewCount">View Count</option>
          </select>
          <button style={{ margin: "0 2rem 0 0" }} onClick={resetSearchQuery}>
            Reset
          </button>
          {/* <button>Submit</button> */}
        </form>
      </div>
    </div>
  );
};
