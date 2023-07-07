import React from "react";
import styles from "./Schedule.module.css";

export const Schedule = () => {
  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.schoolNameAndColorBlock}>
        <input
          type="text"
          placeholder={'Школа "Мамыр"'}
          className={styles.schoolNameInput}
        />
        <div>
          <label className={styles.colorPickerLabel}>
            Цвет группы:
            <input
              className={styles.colorPickerInput}
              type="color"
              defaultValue="#ffffff"
            />
          </label>
        </div>
      </div>
      <div>
        <div>
          <select>
            <option value="astronomical">Астрономическиe</option>
            <option value="academical">Академическиe</option>
          </select>
        </div>
        <div>
          <div className={styles.setValueBlock}>
            <button className={styles.btnMinus}>-</button>
            <div className={styles.valueScreen}>
              <div className={styles.value}>3</div>
              <div className={styles.valueDescription}>Всего часов</div>
            </div>
            <button className={styles.btnPlus}>+</button>
          </div>
        </div>
        <div>
          <input type="date" className={styles.startData} />
          <span className={styles.separator}>до</span>
          <input type="date" className={styles.endData} />
        </div>
      </div>
      <div className={styles.daysOfWeekBlock}>
        <button className={styles.weekDayBtn}>ПН/СР/ПТ</button>
        <button className={styles.weekDayBtn}>ВТ/ЧТ</button>
        <button className={styles.weekDayBtn}>ПН</button>
        <button className={styles.weekDayBtn}>ВТ</button>
        <button className={styles.weekDayBtn}>СР</button>
        <button className={styles.weekDayBtn}>ЧТ</button>
        <button className={styles.weekDayBtn}>ПН</button>
        <button className={styles.weekDayBtn}>СБ</button>
        <button className={styles.weekDayBtn}>ВС</button>
      </div>
      <div>
        <div>
          <select>
            <option value="0">Без перерыва</option>
            <option value="5">5 мин</option>
            <option value="10">10 мин</option>
            <option value="20">20 мин</option>
            <option value="30">30 мин</option>
          </select>
        </div>
        <div>
          <div className={styles.setValueBlock}>
            <button className={styles.btnMinus}>-</button>
            <div className={styles.valueScreen}>
              <div className={styles.value}>3</div>
              <div className={styles.valueDescription}>Всего часов</div>
            </div>
            <button className={styles.btnPlus}>+</button>
          </div>
        </div>
        <div>
          <input type="date" className={styles.startData} />
          <span className={styles.separator}>до</span>
          <input type="date" className={styles.endData} />
        </div>
      </div>

      <div className={styles.teacherAndClassroomBlock}>
        <div className={styles.selectTeacher}>
          <select>
            <option value="">Выберите преподавателя на это время</option>
            <option value="Ivanov">Ivanov</option>
            <option value="Petrov">Petrov</option>
            <option value="Sidarov">Sidarov</option>
          </select>
        </div>
        <div className={styles.selectClassroom}>
          <select>
            <option value="">Аудитория</option>
            <option value="1">№1</option>
            <option value="2">№2</option>
            <option value="3">№3</option>
          </select>
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
        <button className={styles.cancelBtn}>Отмена</button>
        <button className={styles.addBtn}>Добавить расписание</button>
      </div>
    </div>
  );
};
