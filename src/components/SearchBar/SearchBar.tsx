import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setPrevKind,
  setSearchQuery,
  setSRCurrentPage,
  toggleLoad,
} from "../ListSearchResult/ListSearchResultSlice";
import { selectSearchBar, setNewSearchQuery, setOn } from "./SearchBarSlice";
import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchBar = useAppSelector(selectSearchBar);

  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setOn());
    dispatch(setPrevKind(""));
    dispatch(setSearchQuery(searchBar.newSearchQuery));
    dispatch(setSRCurrentPage(0));
    dispatch(toggleLoad());
    navigate("/search");
  };

  return (
    <div className={styles.filterContainer}>
      <form onSubmit={handleSearch}>
        <input
          className={styles.termInput}
          type="text"
          name="queryTerm"
          id="queryTerm"
          value={searchBar.newSearchQuery.q}
          onChange={(e) => {
            dispatch(
              setNewSearchQuery({
                ...searchBar.newSearchQuery,
                q: e.target.value,
              })
            );
          }}
        />
        <button>Search</button>
      </form>
    </div>
  );
};
