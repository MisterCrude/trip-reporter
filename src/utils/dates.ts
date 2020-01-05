export const getTodayDate = (): Date => new Date();

export const getNextDayDate = (todayDate: Date): Date => new Date(new Date(todayDate).setDate(todayDate.getDate() + 1));

export const getDaysDifference = (startedDate: Date, finishedDate: Date) =>
    (new Date(startedDate).getTime() - new Date(finishedDate).getTime()) / (1000 * 60 * 60 * 24);
