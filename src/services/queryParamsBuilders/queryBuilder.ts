import createQueryParams from "./createQueryParams";
import { searchQueryState } from "./searchQuerySlice";
import { videoQueryState } from "./videoQuerySlice";

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
