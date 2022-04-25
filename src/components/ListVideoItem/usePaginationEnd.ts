import React, { useEffect } from "react";

interface usePaginationEndProps {
  isFetching: boolean;
  setHasPaginationEnded: (value: React.SetStateAction<boolean>) => void;
}

export const usePaginationEnd = ({
  isFetching,
  setHasPaginationEnded,
}: usePaginationEndProps) => {
  useEffect(() => {
    console.log("isFetching", isFetching);

    if (isFetching) setHasPaginationEnded(false);
    else if (isFetching !== undefined) setHasPaginationEnded(true);
  }, [isFetching]);
};
