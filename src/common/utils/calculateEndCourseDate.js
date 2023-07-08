export const calculateEndCourseDate = (startCourseDate, totalCourseTime, hoursPerDay, dayOfLessons) => {
  const startDate = new Date(startCourseDate);
  const endDate = new Date(startDate);
  const daysOf = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
  const daysNeeded = Math.ceil(totalCourseTime / hoursPerDay);
  let lessonCount = 0;

  while (lessonCount < daysNeeded) {
    if (dayOfLessons.length === 0) {
      return;
    }
    endDate.setDate(endDate.getDate() + 1);
    const currentDay = daysOf[endDate.getDay()];

    if (dayOfLessons.includes(currentDay)) {
      lessonCount++;
    }
  }

  return endDate.toLocaleDateString("en-CA");
};
