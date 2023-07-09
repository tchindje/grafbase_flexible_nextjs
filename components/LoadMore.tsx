"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

type Props = {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

const LoadMore = ({
  startCursor,
  endCursor,
  hasPreviousPage,
  hasNextPage,
}: Props) => {
  const handleNavigation = (direction: string) => {
    const router = useRouter();
    const currentParams = new URLSearchParams(window.location.search);

    if (direction === "next" && hasNextPage) {
      currentParams.delete("startcursor");
      currentParams.set("endcursor", endCursor);
    } else if (direction === "first" && hasPreviousPage) {
      currentParams.delete("endcursor");
      currentParams.set("startcursor", startCursor);
    }

    const newSearchParams = currentParams.toString();
    const newPathname = `${window.location.pathname}?${newSearchParams}`;
    router.push(newPathname);
  };

  return (
    <div className='w-full gap-5 flexCenter mt-10'>
      {hasPreviousPage && (
        <Button
          title='First Page'
          handleClick={() => handleNavigation("first")}
        />
      )}

      {hasNextPage && (
        <Button title='Next' handleClick={() => handleNavigation("next")} />
      )}
    </div>
  );
};

export default LoadMore;
