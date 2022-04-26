import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectSearchQuery,
  newSearchQueryTerm,
  setSearchPageToken,
} from "../../services/queryParamsBuilders/searchQuerySlice";
import { setCurrentPage } from "../ListMostPopular/ListMostPopularSlice";
import {
  selectListVideoItem,
  // setCurrentPage,
  togglePage,
} from "../ListVideoItem/ListVideoItemSlice";
import {
  selectSearchBar,
  setButtonState,
  setOn,
  toggleSearch,
} from "./SearchBarSlice";

export const SearchBar = () => {
  const searchQuery = useAppSelector(selectSearchQuery);
  const searchBar = useAppSelector(selectSearchBar);
  const dispatch = useAppDispatch();
  const [queryTerm, setQueryTerm] = useState<string>("");

  const navigate = useNavigate();

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
          // dispatch(setSearchPageToken(""));
          // dispatch(newSearchQueryTerm(queryTerm));
          // dispatch(toggleSearch());
          // dispatch(setOn());
          // dispatch(togglePage());
          dispatch(setCurrentPage(0))
          navigate("/search");
          // console.log("queryTerm", queryTerm);
          // console.log("query searchBar", searchQuery);
        }}
      >
        Search
      </button>
    </div>
  );
};
