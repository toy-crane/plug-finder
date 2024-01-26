import { parse } from "date-fns";
import { ko } from "date-fns/locale";

export const getDate = (dateString: string) => {
  return parse(dateString, "yyyyMMddHHmmss", new Date(), {
    locale: ko,
  });
};
