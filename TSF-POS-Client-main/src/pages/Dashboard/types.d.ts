import { Dayjs } from "dayjs";

export interface DefaultDate {
  startDate: Dayjs | number | string | null;
  endDate: Dayjs | number | string | null;
}
