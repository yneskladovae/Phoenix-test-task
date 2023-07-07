import React from "react";
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

export const Schedule = () => {
  return (
    <div className={styles.scheduleContainer}>
      <div
        className={`${ScheduleSettings.settingsBlock} ${styles.schoolNameAndColorBlock}`}
      >
        <Input
          type="text"
          placeholder={'Школа "Мамыр"'}
          classNameValue={styles.schoolNameInput}
        />
        <div>
          <label className={styles.colorPickerLabel}>
            Цвет группы:
            <Input
              classNameValue={styles.colorPickerInput}
              type="color"
              defaultValue="#ffffff"
            />
          </label>
        </div>
      </div>
      <div className={ScheduleSettings.settingsBlock}>
        <div className={ScheduleSettings.settingsBlockItem}>
          <Select options={timeSelectionOptions} />
        </div>
        <div className={ScheduleSettings.settingsBlockItem}>
          <div className={styles.setValueBlock}>
            <Button classNameValue={styles.btnMinus}>-</Button>
            <div className={styles.valueScreen}>
              <div className={styles.value}>3</div>
              <div className={styles.valueDescription}>Всего часов</div>
            </div>
            <Button classNameValue={styles.btnPlus}>+</Button>
          </div>
        </div>
        <div className={ScheduleSettings.settingsBlockItem}>
          <Input type="date" classNameValue={styles.startData} />
          <span className={styles.separator}>до</span>
          <Input type="date" classNameValue={styles.endData} />
        </div>
      </div>
      <div
        className={`${ScheduleSettings.settingsBlock} ${styles.daysOfWeekBlock}`}
      >
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
            <Button classNameValue={styles.btnMinus}>-</Button>
            <div className={styles.valueScreen}>
              <div className={styles.value}>1</div>
              <div className={styles.valueDescription}>Часов в день</div>
            </div>
            <Button classNameValue={styles.btnPlus}>+</Button>
          </div>
        </div>
        <div className={ScheduleSettings.settingsBlockItem}>
          <Input type="time" classNameValue={styles.startData} />
          <span className={styles.separator}>до</span>
          <Input type="time" classNameValue={styles.endData} />
        </div>
      </div>
      <div
        className={`${ScheduleSettings.settingsBlock} ${styles.teacherAndClassroomBlock}`}
      >
        <div className={styles.selectTeacher}>
          <Select options={teacherSelectionOptions} />
        </div>
        <div className={styles.selectClassroom}>
          <Select options={classroomSelectionOptions} />
        </div>
      </div>
      <div className={styles.warningBlock}>
        <p>
          Выбор <strong>преподавателя</strong> и <strong>аудитории</strong> не
          обязателен.
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
