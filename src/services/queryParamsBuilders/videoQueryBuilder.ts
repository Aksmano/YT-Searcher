import { useAppSelector } from "../../app/hooks";
import createQueryParams from "./createQueryParams";
import { selectVideoQuery, videoQueryState } from "./videoQuerySlice";

const videoQueryBuilder = (videoQueryParams: videoQueryState): string => {
  let resultQuery: string = "";

  let key: keyof typeof videoQueryParams;
  for (key in videoQueryParams)
    resultQuery += createQueryParams(key, videoQueryParams[key]);

  return resultQuery;
};

export default videoQueryBuilder;
