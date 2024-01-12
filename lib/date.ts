import { parse } from "date-fns";

export const getDate = (dateString: string) => {
  return parse(dateString, "yyyyMMddHHmmss", new Date());
};
