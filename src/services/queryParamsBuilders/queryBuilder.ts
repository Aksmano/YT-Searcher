import { searchQueryState, videoQueryState } from "../types";
import createQueryParams from "./createQueryParams";

const queryBuilder = (
  queryParams: videoQueryState | searchQueryState
): string => {
  let resultQuery: string = "";

  let key: keyof typeof queryParams;
  for (key in queryParams)
    resultQuery += createQueryParams(key, queryParams[key]);

  return resultQuery;
};

export default queryBuilder;
