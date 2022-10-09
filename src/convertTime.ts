

export function convertTime(date: number): string {
 const newDate = new Date(date * 1000);
 return new Intl.DateTimeFormat('ru').format(newDate)
}