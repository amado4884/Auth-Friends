import { useState, ChangeEvent } from "react";

export const useInput = (
  initalValue?: any
): [any, React.Dispatch<any>, (event: ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState(initalValue || null);
  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };
  return [value, setValue, handleChanges];
};
