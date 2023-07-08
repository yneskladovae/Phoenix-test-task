import React, { useState } from "react";
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

export const Schedule = () => {
  const currentDate = new Date();
  const [typeTime, setTypeTime] = useState("astronomical");
  currentDate.setHours(typeTime === "academical" ? 7 : 8, typeTime === "academical" ? 45 : 0);
  const [lessonEnd, setLessonEnd] = useState(currentDate);
  const lessonStart = new Date();
  lessonStart.setHours(7, 0);
  const duration = typeTime === "academical" ? 45 : 60;
  const [hoursPerDay, setHoursPerDay] = useState(1);
  const [totalCourseTime, setTotalCourseTime] = useState(10);
  const [breakTime, setBreakTime] = useState(0);
  const [dayOfLessons, setDayOfLessons] = useState(MON_WED_FRI);
  const [startCourseDate, setStartCourseDate] = useState(getCurrentDate());
  const [endCourseDate, setEndCourseDate] = useState("");
  const lessonStartFormatTime = formatTime(lessonStart);
  const lessonEndFormatTime = formatTime(lessonEnd);

  const changeTypeTimeHandler = (e) => {
    const currTypeTimeValue = e.currentTarget.value;
    setTypeTime(currTypeTimeValue);
    const timeToAdd = currTypeTimeValue === "astronomical" ? 15 : -15;
    const newTime = new Date(lessonEnd.getTime() + timeToAdd * hoursPerDay * 60000);
    setLessonEnd(newTime);
  };

  const increaseTotalCourseTimeHandler = () => {
    setTotalCourseTime((totalCourseTime) => totalCourseTime + 1);
  };

  const decreaseTotalCourseTimeHandler = () => {
    setTotalCourseTime((totalCourseTime) => totalCourseTime - 1);
  };

  const increaseHoursPerDayHandler = () => {
    const updateTime = new Date(lessonEnd.getTime() + duration * 60000);
    setHoursPerDay((hoursPerDay) => hoursPerDay + 1);
    setLessonEnd(updateTime);
  };

  const decreaseHoursPerDayHandler = () => {
    const updateTime = new Date(lessonEnd.getTime() - duration * 60000);
    setHoursPerDay((hoursPerDay) => hoursPerDay - 1);
    setLessonEnd(updateTime);
  };

  const changeDateCourseStart = (e) => {
    const newDate = e.currentTarget.value;
    setStartCourseDate(newDate);
  };

  const setBreakTimeChangeHandler = (e) => {
    const currBreakTime = +e.currentTarget.value;
    const breakToAdd = currBreakTime - breakTime;
    const updateTime = new Date(lessonEnd.getTime() + breakToAdd * 60000);
    setBreakTime(currBreakTime);
    setLessonEnd(updateTime);
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

  return (
    <div className={styles.scheduleContainer}>
      <div className={`${ScheduleSettings.settingsBlock} ${styles.schoolNameAndColorBlock}`}>
        <Input type="text" placeholder={'Школа "Мамыр"'} classNameValue={styles.schoolNameInput} />
        <div>
          <label className={styles.colorPickerLabel}>
            Цвет группы:
            <Input classNameValue={styles.colorPickerInput} type="color" defaultValue="#ffffff" />
          </label>
        </div>
      </div>
      <div className={ScheduleSettings.settingsBlock}>
        <div className={ScheduleSettings.settingsBlockItem}>
          <Select options={timeSelectionOptions} onChange={changeTypeTimeHandler} defaultValue={typeTime} />
        </div>
        <div className={ScheduleSettings.settingsBlockItem}>
          <div className={styles.setValueBlock}>
            <Button onClick={decreaseTotalCourseTimeHandler} classNameValue={styles.btnMinus}>
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
            classNameValue={styles.startData}
          />
          <span className={styles.separator}>до</span>
          <Input type="date" classNameValue={styles.endData} readOnly />
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
            <Button onClick={decreaseHoursPerDayHandler} classNameValue={styles.btnMinus}>
              -
            </Button>
            <div className={styles.valueScreen}>
              <div className={styles.value}>{hoursPerDay}</div>
              <div className={styles.valueDescription}>Часов в день</div>
            </div>
            <Button onClick={increaseHoursPerDayHandler} classNameValue={styles.btnPlus}>
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
          <Select options={teacherSelectionOptions} />
        </div>
        <div className={styles.selectClassroom}>
          <Select options={classroomSelectionOptions} />
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
        <Button classNameValue={styles.addBtn}>Добавить расписание</Button>
      </div>
    </div>
  );
};
