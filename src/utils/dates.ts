import format from "date-fns/format";
import { COMMON } from "@src/config";

export const getTodayDate = (): Date => new Date();

export const getNextDayDate = (todayDate: Date): Date => new Date(new Date(todayDate).setDate(todayDate.getDate() + 1));

export const getDaysDifference = (startedDate: Date, finishedDate: Date): number =>
    (new Date(startedDate).getTime() - new Date(finishedDate).getTime()) / (1000 * 60 * 60 * 24);

export const convertTimeStamp = (stamp: number | string): string => format(new Date(stamp), COMMON.DATE_FORMAT);
