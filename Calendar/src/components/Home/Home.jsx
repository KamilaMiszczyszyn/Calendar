import { useState } from "react";
import {Calendar} from "./../index"

const Home = () => {
  const now= new Date();
  const date= now.getDate();
  const month=now.getMonth()+1;
  const year=now.getFullYear();


  const [selectedDay, setSelectedDay]=useState([date,month,year]);
  return (
    <div>
      <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>


    </div>
  )
}

export default Home