import { useAppSelector } from "../../app/hooks";
import queryBuilder from "../../services/queryParamsBuilders/queryBuilder";
import { useGetListSearchResultQuery } from "../../services/youtube";
import { selectListSearchResult } from "./ListSearchResultSlice";
import { useSetSearchResult } from "./useSetSearchResult";
import { ListComponents } from "../ListComponents/ListComponents";

export const ListSearchResult = () => {
  const listSearchResult = useAppSelector(selectListSearchResult);
  const searchList = useGetListSearchResultQuery(
    queryBuilder(listSearchResult.searchQuery)
  );

  console.log(searchList);

  useSetSearchResult({
    data: searchList.data!,
    isFetching: searchList.isFetching,
    isLoading: searchList.isLoading,
  });

  console.log("search fetchedInfo", listSearchResult.fetchedInfo);

  return (
    <ListComponents
      itemList={listSearchResult}
      type={"search result"}
      isFetching={searchList.isFetching}
      isUninitialized={searchList.isUninitialized}
      totalResults={searchList.data?.pageInfo.totalResults}
    />
  );
};
