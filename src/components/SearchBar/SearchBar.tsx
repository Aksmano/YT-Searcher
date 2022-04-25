import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectSearchQuery,
  newSearchQueryTerm,
  setSearchPageToken,
} from "../../services/queryParamsBuilders/searchQuerySlice";
import { selectSearchBar, setButtonState, setOn } from "./SearchBarSlice";

export const SearchBar = () => {
  const searchQuery = useAppSelector(selectSearchQuery);
  const searchBar = useAppSelector(selectSearchBar);
  const dispatch = useAppDispatch();
  const [queryTerm, setQueryTerm] = useState<string>("");

  // console.log("query outside searchBar", searchQuery);

  // useEffect(() => {
  //   console.log("query useEffect searchBar", searchQuery);
  // }, [searchQuery]);

  // useEffect(() => {
  //   console.log(searchBar.isClicked);
  // }, [searchBar]);

  return (
    <div>
      <input
        type="text"
        name="queryTerm"
        id="queryTerm"
        value={queryTerm}
        onChange={(e) => {
          setQueryTerm(e.target.value);
        }}
      />
      <button
        onClick={(e) => {
          console.log("CLICKED");
          dispatch(setSearchPageToken(""));
          dispatch(newSearchQueryTerm(queryTerm));
          dispatch(setOn());
          // console.log("queryTerm", queryTerm);
          // console.log("query searchBar", searchQuery);
        }}
      >
        Search
      </button>
    </div>
  );
};
