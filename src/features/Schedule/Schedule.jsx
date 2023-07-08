import React, { useEffect, useState } from "react";
import ScheduleSettings from "../../common/styles/ScheduleSettings.module.css";
import styles from "./Schedule.module.css";
import { Input } from "../../components/Input/Input";
import { Select } from "../../components/Select/Select";
import { Button } from "../../components/Button/Button";
import {
  breakSelectionOptions,
  classroomSelectionOptions,
  MON_WED_FRI,
  teacherSelectionOptions,
  timeSelectionOptions,
  TUE_THU,
  WEEK_DAYS,
} from "../../common/constants/constants";
import { formatTime } from "../../common/utils/getFormatTime";
import { getCurrentDate } from "../../common/utils/getCurrentDate";
import { calculateEndCourseDate } from "../../common/utils/calculateEndCourseDate";

export const Schedule = () => {
  const currentDate = new Date();
  const [typeTime, setTypeTime] = useState("astronomical");
  currentDate.setHours(typeTime === "academical" ? 7 : 8, typeTime === "academical" ? 45 : 0);
  const duration = typeTime === "academical" ? 45 : 60;
  const [endLesson, setEndLesson] = useState(currentDate);
  const startLesson = new Date("1970-01-01T07:00:00");
  const [hoursPerDay, setHoursPerDay] = useState(1);
  const [totalCourseTime, setTotalCourseTime] = useState(10);
  const [breakTime, setBreakTime] = useState(0);
  const [dayOfLessons, setDayOfLessons] = useState(MON_WED_FRI);
  const [startCourseDate, setStartCourseDate] = useState(getCurrentDate());
  const [endCourseDate, setEndCourseDate] = useState("");
  const [teacher, setTeacher] = useState(null);
  const [classroom, setClassroom] = useState(null);

  const lessonStartFormatTime = formatTime(startLesson);
  const lessonEndFormatTime = formatTime(endLesson);

  const minTotalCourseTime = totalCourseTime <= 1; // 1 - минимальное количество часов в курсе обучения
  const minHoursPerDay = hoursPerDay <= 1; // 1 - минимальное количество часов в день
  const maxHoursPerDay = hoursPerDay >= 10 || totalCourseTime <= hoursPerDay; // 10 - максимальное количество часов в день, можно поставить нужное значение

  useEffect(() => {
    const endDate = calculateEndCourseDate(startCourseDate, totalCourseTime, hoursPerDay, dayOfLessons);
    setEndCourseDate(endDate);
  }, [startCourseDate, totalCourseTime, hoursPerDay, dayOfLessons]);

  const changeTypeTimeHandler = (e) => {
    const currTypeTimeValue = e.currentTarget.value;
    setTypeTime(currTypeTimeValue);
    const timeToAdd = currTypeTimeValue === "astronomical" ? 15 : -15;
    const newTime = new Date(endLesson.getTime() + timeToAdd * hoursPerDay * 60000);
    setEndLesson(newTime);
  };

  const increaseTotalCourseTimeHandler = () => {
    setTotalCourseTime((totalCourseTime) => totalCourseTime + 1);
  };

  const decreaseTotalCourseTimeHandler = () => {
    setTotalCourseTime((totalCourseTime) => totalCourseTime - 1);
  };

  const increaseHoursPerDayHandler = () => {
    const updateTime = new Date(endLesson.getTime() + duration * 60000);
    setHoursPerDay((hoursPerDay) => hoursPerDay + 1);
    setEndLesson(updateTime);
  };

  const decreaseHoursPerDayHandler = () => {
    const updateTime = new Date(endLesson.getTime() - duration * 60000);
    setHoursPerDay((hoursPerDay) => hoursPerDay - 1);
    setEndLesson(updateTime);
  };

  const changeDateCourseStart = (e) => {
    const newDate = e.currentTarget.value;
    setStartCourseDate(newDate);
  };

  const setBreakTimeChangeHandler = (e) => {
    const currBreakTime = +e.currentTarget.value;
    const breakToAdd = currBreakTime - breakTime;
    const updateTime = new Date(endLesson.getTime() + breakToAdd * 60000);
    setBreakTime(currBreakTime);
    setEndLesson(updateTime);
  };
  const selectDaysHandler = (day) => {
    if (dayOfLessons.includes(day)) {
      setDayOfLessons(dayOfLessons.filter((d) => d !== day));
    } else {
      setDayOfLessons([...dayOfLessons, day]);
    }
  };
  const setSelectedDaysHandler = (days) => {
    setDayOfLessons(days);
  };

  const selectTeacherHandler = (e) => setTeacher(e.currentTarget.value);
  const selectClassroomHandler = (e) => setClassroom(e.currentTarget.value);

  const sendDataHandler = (e) => {
    const sortedDays = dayOfLessons.sort((a, b) => {
      const weekDays = WEEK_DAYS;
      return weekDays.indexOf(a) - weekDays.indexOf(b);
    });

    const data = {
      typeTime: typeTime,
      totalCourseTime: totalCourseTime,
      startCourseDate: startCourseDate,
      endCourseDate: endCourseDate,
      dayOfLessons: sortedDays,
      breakTime: breakTime,
      hoursPerDay: hoursPerDay,
      startLesson: lessonStartFormatTime,
      endLesson: lessonEndFormatTime,
      teacher: teacher,
      classroom: classroom,
    };
    console.log(data);
  };

  return (
    <div className={styles.scheduleContainer}>
      <div className={`${ScheduleSettings.settingsBlock} ${styles.schoolNameAndColorBlock}`}>
        <Input type="text" placeholder={'Школа "Мамыр"'} classNameValue={styles.schoolNameInput} />
        <label className={styles.colorPickerLabel}>
          Цвет группы:
          <Input classNameValue={styles.colorPickerInput} type="color" defaultValue="#ffffff" />
        </label>
      </div>
      <div className={ScheduleSettings.settingsBlock}>
        <div className={ScheduleSettings.settingsBlockItem}>
          <Select options={timeSelectionOptions} onChange={changeTypeTimeHandler} defaultValue={typeTime} />
        </div>
        <div className={ScheduleSettings.settingsBlockItem}>
          <div className={styles.setValueBlock}>
            <Button
              onClick={decreaseTotalCourseTimeHandler}
              classNameValue={styles.btnMinus}
              disabled={minTotalCourseTime}
            >
              -
            </Button>
            <div className={styles.valueScreen}>
              <div className={styles.value}>{totalCourseTime}</div>
              <div className={styles.valueDescription}>Всего часов</div>
            </div>
            <Button onClick={increaseTotalCourseTimeHandler} classNameValue={styles.btnPlus}>
              +
            </Button>
          </div>
        </div>
        <div className={ScheduleSettings.settingsBlockItem}>
          <Input
            type="date"
            onChange={changeDateCourseStart}
            value={startCourseDate}
            classNameValue={`${styles.startData} ${styles.startDateValue}`}
          />
          <span className={styles.separator}>до</span>
          {dayOfLessons.length ? (
            <Input
              type="date"
              classNameValue={`${styles.endData} ${styles.endDateValue}`}
              value={endCourseDate}
              readOnly
            />
          ) : (
            <Input type="text" classNameValue={styles.endDataError} value={"Выберите день!"} readOnly />
          )}
        </div>
      </div>
      <div className={`${ScheduleSettings.settingsBlock} ${styles.daysOfWeekBlock}`}>
        <Button classNameValue={styles.weekDayBtn} onClick={() => setSelectedDaysHandler(MON_WED_FRI)}>
          ПН/СР/ПТ
        </Button>
        <Button classNameValue={styles.weekDayBtn} onClick={() => setSelectedDaysHandler(TUE_THU)}>
          ВТ/ЧТ
        </Button>
        {WEEK_DAYS.map((day) => (
          <Button
            onClick={() => selectDaysHandler(day)}
            key={day}
            classNameValue={`${styles.weekDayBtn} ${dayOfLessons.indexOf(day) !== -1 ? styles.selectedDay : ""}`}
          >
            {day}
          </Button>
        ))}
      </div>
      <div className={ScheduleSettings.settingsBlock}>
        <div className={ScheduleSettings.settingsBlockItem}>
          <Select onChange={setBreakTimeChangeHandler} options={breakSelectionOptions} />{" "}
        </div>
        <div className={ScheduleSettings.settingsBlockItem}>
          <div className={styles.setValueBlock}>
            <Button onClick={decreaseHoursPerDayHandler} classNameValue={styles.btnMinus} disabled={minHoursPerDay}>
              -
            </Button>
            <div className={styles.valueScreen}>
              <div className={styles.value}>{hoursPerDay}</div>
              <div className={styles.valueDescription}>Часов в день</div>
            </div>
            <Button onClick={increaseHoursPerDayHandler} classNameValue={styles.btnPlus} disabled={maxHoursPerDay}>
              +
            </Button>
          </div>
        </div>
        <div className={ScheduleSettings.settingsBlockItem}>
          <Input type="time" value={lessonStartFormatTime} classNameValue={styles.startData} readOnly />
          <span className={styles.separator}>до</span>
          <Input type="time" value={lessonEndFormatTime} classNameValue={styles.endData} readOnly />
        </div>
      </div>
      <div className={`${ScheduleSettings.settingsBlock} ${styles.teacherAndClassroomBlock}`}>
        <div className={styles.selectTeacher}>
          <Select options={teacherSelectionOptions} onChange={selectTeacherHandler} />
        </div>
        <div className={styles.selectClassroom}>
          <Select options={classroomSelectionOptions} onChange={selectClassroomHandler} />
        </div>
      </div>
      <div className={styles.warningBlock}>
        <p>
          Выбор <strong>преподавателя</strong> и <strong>аудитории</strong> не обязателен.
        </p>
      </div>
      <hr />
      <div className={styles.submitBlock}>
        <Button classNameValue={styles.cancelBtn}>Отмена</Button>
        <Button classNameValue={styles.addBtn} onClick={sendDataHandler}>
          Добавить расписание
        </Button>
      </div>
    </div>
  );
};
