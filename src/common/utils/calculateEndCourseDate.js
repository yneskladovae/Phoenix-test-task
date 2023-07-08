export const calculateEndCourseDate = (startCourseDate, totalCourseTime, hoursPerDay, daysOfLessons) => {
  const startDate = new Date(startCourseDate);
  const endDate = new Date(startDate);
  const days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
  const daysForClasses = Math.ceil(totalCourseTime / hoursPerDay);
  let lessonCount = 0;

  while (lessonCount < daysForClasses) {
    if (daysOfLessons.length === 0) return;

    const currentDay = days[endDate.getDay()];

    if (daysOfLessons.includes(currentDay)) {
      lessonCount++;
    }

    endDate.setDate(endDate.getDate() + 1);
  }

  endDate.setDate(endDate.getDate() - 1);
  return endDate.toLocaleDateString("en-CA");
};
