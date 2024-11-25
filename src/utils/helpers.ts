// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

import { Dispatch, SetStateAction } from "react";

  // Format time to HH:MM:SS
  export const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };


  export const toggleTimerActiveState = (
    remainingTime: number,
    isActive: boolean,
    setIsActive: Dispatch<SetStateAction<boolean>>
  ) => {
    if (remainingTime > 0) {
      setIsActive(!isActive);
    }
  };