import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectSearchQuery,
  newQueryTerm,
} from "../../services/queryParamsBuilders/searchQuerySlice";
import { setOn } from "./SearchBarSlice";

export const SearchBar = () => {
  const searchQuery = useAppSelector(selectSearchQuery);
  const dispatch = useAppDispatch();
  const [queryTerm, setQueryTerm] = useState<string>("");

  // console.log("query outside searchBar", searchQuery);

  // useEffect(() => {
  //   console.log("query useEffect searchBar", searchQuery);
  // }, [searchQuery]);

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
          dispatch(newQueryTerm(queryTerm));
          dispatch(setOn());
          console.log("queryTerm", queryTerm);
          console.log("query searchBar", searchQuery);
        }}
      >
        Search
      </button>
    </div>
  );
};
