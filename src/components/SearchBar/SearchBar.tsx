import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectSearchQuery,
  newQueryTerm,
} from "../../services/queryParamsBuilders/searchQuerySlice";

export const SearchBar = () => {
  const query = useAppSelector(selectSearchQuery);
  const dispatch = useAppDispatch();
  const [queryTerm, setQueryTerm] = useState<string>("");

  useEffect(() => {
    console.log("query useEffect searchBar", query);
  }, [query]);

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
          console.log("queryTerm", queryTerm);
          dispatch(newQueryTerm(queryTerm));
          console.log("query searchBar", query);
        }}
      >
        {query.q}
      </button>
    </div>
  );
};
