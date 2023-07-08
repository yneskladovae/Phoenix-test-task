import React, { useState } from "react";
import ScheduleSettings from "../../common/styles/ScheduleSettings.module.css";
import styles from "./Schedule.module.css";
import { Input } from "../../components/Input/Input";
import { Select } from "../../components/Select/Select";
import { Button } from "../../components/Button/Button";
import {
  breakSelectionOptions,
  classroomSelectionOptions,
  teacherSelectionOptions,
  timeSelectionOptions,
  WEEK_DAYS,
} from "../../common/constants/constants";
import { formatTime } from "../../common/utils/getFormatTime";

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
          <Input type="date" classNameValue={styles.startData} />
          <span className={styles.separator}>до</span>
          <Input type="date" classNameValue={styles.endData} />
        </div>
      </div>
      <div className={`${ScheduleSettings.settingsBlock} ${styles.daysOfWeekBlock}`}>
        <Button classNameValue={styles.weekDayBtn}>ПН/СР/ПТ</Button>
        <Button classNameValue={styles.weekDayBtn}>ВТ/ЧТ</Button>
        {WEEK_DAYS.map((day) => (
          <Button key={day} classNameValue={styles.weekDayBtn}>
            {day}
          </Button>
        ))}
      </div>
      <div className={ScheduleSettings.settingsBlock}>
        <div className={ScheduleSettings.settingsBlockItem}>
          <Select options={breakSelectionOptions} />
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
