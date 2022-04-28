import { useAppSelector } from "../../app/hooks";
import queryBuilder from "../../services/queryParamsBuilders/queryBuilder";
import { useGetListVideosResultQuery } from "../../services/youtube";
import { selectListMostPopular } from "./ListMostPopularSlice";
import { useSetMostPopular } from "./useSetMostPopular";
import { ListComponents } from "../ListComponents/ListComponents";

export const ListMostPopular = () => {
  const listMostPopular = useAppSelector(selectListMostPopular);

  const videoList = useGetListVideosResultQuery(
    queryBuilder(listMostPopular.videoQuery)
  );

  useSetMostPopular({
    data: videoList.data!,
    isFetching: videoList.isFetching,
    isLoading: videoList.isLoading,
  });

  return (
    <ListComponents
      itemList={listMostPopular}
      type={"most popular"}
      isFetching={videoList.isFetching}
      isUninitialized={videoList.isUninitialized}
      totalResults={videoList.data?.pageInfo.totalResults}
    />
  );
};
