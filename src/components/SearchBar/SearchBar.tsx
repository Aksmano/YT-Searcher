import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { searchQueryState } from "../../services/types";
import {
  setPrevKind,
  setSearchQuery,
  setSRCurrentPage,
  toggleLoad,
} from "../ListSearchResult/ListSearchResultSlice";
import { selectSearchBar, setOn } from "./SearchBarSlice";
import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchBar = useAppSelector(selectSearchBar);
  const [newSearchQuery, setNewSearchQuery] = useState<searchQueryState>({
    part: ["snippet"],
    q: "",
    maxResults: "50",
  });

  const navigate = useNavigate();

  // console.log("query outside searchBar", searchQuery);

  // useEffect(() => {
  //   console.log("query useEffect searchBar", searchQuery);
  // }, [searchQuery]);

  // useEffect(() => {
  //   console.log(searchBar.isClicked);
  // }, [searchBar]);

  return (
    <div className={styles.filterContainer}>
      <input
        type="text"
        name="queryTerm"
        id="queryTerm"
        value={newSearchQuery.q}
        onChange={(e) => {
          setNewSearchQuery({ ...newSearchQuery, q: e.target.value });
        }}
      />
      <button
        onClick={(e) => {
          console.log("CLICKED");
          // dispatch(setSearchPageToken(""));
          // dispatch(newSearchQueryTerm(queryTerm));
          // dispatch(toggleSearch());
          // dispatch(setOn());
          // dispatch(togglePage());
          dispatch(setOn());
          dispatch(setPrevKind(""));
          dispatch(setSearchQuery(newSearchQuery));
          dispatch(setSRCurrentPage(0));
          dispatch(toggleLoad());
          navigate("/search");
          // console.log("queryTerm", queryTerm);
          // console.log("query searchBar", searchQuery);
        }}
      >
        Search
      </button>

      <button onClick={(e) => {}}>Show filters</button>
    </div>
  );
};
