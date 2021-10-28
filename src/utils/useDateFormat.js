import { useCallback, useRef } from "react";

export default function useDateFormat(options = {}) {
  const dtf = useRef(new Intl.DateTimeFormat('en-US', options));
  return useCallback(date => dtf.current.format(new Date(date)), []);
}