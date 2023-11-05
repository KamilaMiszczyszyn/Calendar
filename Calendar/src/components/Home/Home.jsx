import { useState } from "react";
import {Calendar, Planner, TodaysDate} from "./../index"
import styles from "./Home.module.css"

const Home = () => {
  const now= new Date();
  const date= now.getDate();
  const month=now.getMonth()+1;
  const year=now.getFullYear();


  const [selectedDay, setSelectedDay]=useState([date,month,year]);

  return (
    <div className={styles.home_container}>
      <div className={styles.today_day}>
        <TodaysDate currentDay={[date,month,year]}/>
      </div>
      <div className={styles.calendar}>
        <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>    
      </div>
      <div className={styles.planner}>
        <Planner selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
      </div>
    </div>
  )
}

export default Home