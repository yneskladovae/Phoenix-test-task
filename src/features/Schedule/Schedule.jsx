import React from "react";
import styles from "./Schedule.module.css";
import { Input } from "../../components/Input/Input";
import { Select } from "../../components/Select/Select";
import { Button } from "../../components/Button/Button";

const timeSelectionOptions = [
  {
    label: "Астрономическиe",
    value: "astronomical",
  },
  {
    label: "Академическиe",
    value: "academical",
  },
];

export const breakSelectionOptions = [
  {
    label: "Без перерыва",
    value: 0,
  },
  {
    label: "5 мин",
    value: 5,
  },
  {
    label: "10 мин",
    value: 10,
  },
  {
    label: "20 мин",
    value: 20,
  },
  {
    label: "30 мин",
    value: 30,
  },
];
export const teacherSelectionOptions = [
  {
    label: "Выберите преподавателя на это время",
    value: null,
  },
  {
    label: "Ivanov",
    value: "Ivanov",
  },
  {
    label: "Petrov",
    value: "Petrov",
  },
  {
    label: "Sidarov",
    value: "Sidarov",
  },
];
export const classroomSelectionOptions = [
  {
    label: "Аудитория",
    value: null,
  },
  {
    label: "№1",
    value: 1,
  },
  {
    label: "№2",
    value: 2,
  },
  {
    label: "№3",
    value: 3,
  },
];
export const Schedule = () => {
  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.schoolNameAndColorBlock}>
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
      <div>
        <div>
          <Select options={timeSelectionOptions} />
        </div>
        <div>
          <div className={styles.setValueBlock}>
            <Button classNameValue={styles.btnMinus}>-</Button>
            <div className={styles.valueScreen}>
              <div className={styles.value}>3</div>
              <div className={styles.valueDescription}>Всего часов</div>
            </div>
            <Button classNameValue={styles.btnPlus}>+</Button>
          </div>
        </div>
        <div>
          <Input type="date" classNameValue={styles.startData} />
          <span className={styles.separator}>до</span>
          <Input type="date" classNameValue={styles.endData} />
        </div>
      </div>
      <div className={styles.daysOfWeekBlock}>
        <Button classNameValue={styles.weekDayBtn}>ПН/СР/ПТ</Button>
        <Button classNameValue={styles.weekDayBtn}>ВТ/ЧТ</Button>
        <Button classNameValue={styles.weekDayBtn}>ПН</Button>
        <Button classNameValue={styles.weekDayBtn}>ВТ</Button>
        <Button classNameValue={styles.weekDayBtn}>СР</Button>
        <Button classNameValue={styles.weekDayBtn}>ЧТ</Button>
        <Button classNameValue={styles.weekDayBtn}>ПН</Button>
        <Button classNameValue={styles.weekDayBtn}>СБ</Button>
        <Button classNameValue={styles.weekDayBtn}>ВС</Button>
      </div>
      <div>
        <div>
          <Select options={breakSelectionOptions} />
        </div>
        <div>
          <div className={styles.setValueBlock}>
            <Button classNameValue={styles.btnMinus}>-</Button>
            <div className={styles.valueScreen}>
              <div className={styles.value}>3</div>
              <div className={styles.valueDescription}>Всего часов</div>
            </div>
            <Button classNameValue={styles.btnPlus}>+</Button>
          </div>
        </div>
        <div>
          <Input type="date" classNameValue={styles.startData} />
          <span className={styles.separator}>до</span>
          <Input type="date" classNameValue={styles.endData} />
        </div>
      </div>
      <div className={styles.teacherAndClassroomBlock}>
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
