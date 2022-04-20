/* eslint-disable no-restricted-syntax */
import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';

export const useFilter = (searchValue, array, fields = []) => {
  const debouncedValue = useDebounce(searchValue, 300);
  const [filteredValue, setFilteredValue] = useState(debouncedValue);

  useEffect(() => {
    if (!debouncedValue || !array.length) setFilteredValue(array);
    else {
      setFilteredValue((!fields.length)
        ? array.filter((item) => item.toLowerCase().includes(debouncedValue.toLowerCase()))
        : array.filter((item) => {
          for (const field of fields) {
            const resultForField = item[field].toLowerCase().includes(debouncedValue.toLowerCase());
            if (resultForField) return true;
          }

          return false;
        }));
    }
  }, [debouncedValue, array, fields]);

  return filteredValue;
};
