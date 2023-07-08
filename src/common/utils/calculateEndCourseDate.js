export const calculateEndCourseDate = (startCourseDate, totalCourseTime, hoursPerDay, dayOfLessons) => {
  const startDate = new Date(startCourseDate);
  const endDate = new Date(startDate);
  const days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
  const daysForClasses = Math.ceil(totalCourseTime / hoursPerDay);
  let lessonCount = 0;

  while (lessonCount < daysForClasses) {
    if (dayOfLessons.length === 0) return;

    endDate.setDate(endDate.getDate() + 1);
    const currentDay = days[endDate.getDay()];

    if (dayOfLessons.includes(currentDay)) {
      lessonCount++;
    }
  }

  return endDate.toLocaleDateString("en-CA");
};
