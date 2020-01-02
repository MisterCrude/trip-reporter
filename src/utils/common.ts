export const getTodayDate = (): Date => new Date();

export const getNextDayDate = (todayDate: Date): Date => new Date(new Date(todayDate).setDate(todayDate.getDate() + 1));
