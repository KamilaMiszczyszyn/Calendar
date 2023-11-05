import styles from "./TodaysDate.module.css"
import {Clock} from './../index' 

const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const days=["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const TodaysDate = ({currentDay}) => {
  const[day,month,year]=currentDay

   const date = new Date(year,month-1,day);
   
   const dayOfWeek = date.getDay();

  return (
    <div className={styles.todays_date_contianer}>
      <span>Today&apos;s Date</span>
      <div className={styles.date}>
       { `${days[dayOfWeek]}, ${day} ${months[month-1]} ${year}`}
      </div>
      <Clock/>
      </div>
  )
}

export default TodaysDate