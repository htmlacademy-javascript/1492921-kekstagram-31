export const isTime = (strTime) => /^([01]?[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/.test(strTime);

export const HourFromStartDay = (strTime) => strTime.split(':').reduce((hour, minute) => parseInt(hour, 10) + parseInt(minute, 10) / 60);

export const MinuteFromStartDay = (strTime) => HourFromStartDay(strTime) * 60;
