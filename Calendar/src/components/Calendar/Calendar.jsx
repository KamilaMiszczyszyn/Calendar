import React from 'react'
import { useState, useEffect } from 'react'


const days=["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const Calendar = ({setSelectedDay, selectedDay}) => {

    const now= new Date();

    const currentYear=now.getFullYear();
    const currentMonth=now.getMonth()+1;

    const [year,setYear]=useState(currentYear);
    const [month,setMonth]=useState(currentMonth);
    const [monthDays, setMonthDays]=useState([]);


    const monthArray =(year, month)=>{

        const firstDayOfMonth = new Date(year, month-1, 1);

        let firstDayOfMonthDay;
        if(firstDayOfMonth.getDay() === 0){
            firstDayOfMonthDay = 7;
        }else{
            firstDayOfMonthDay=firstDayOfMonth.getDay();
        }  

        let numberOfDaysInMonth;
        if(month === 2 && year%4 === 0  ){
            numberOfDaysInMonth = 29;
        }else if(month === 2){
            numberOfDaysInMonth = 28;
        }else if(month === 4 || month === 6 || month === 9 || month === 11){
            numberOfDaysInMonth = 30;
        }else{
            numberOfDaysInMonth = 31;
        }

        let monthDaysArray = [];

        for(let i=1; i<=numberOfDaysInMonth ; i++){
           monthDaysArray.push([i, month, year]);
        }

        let emptyFieldsArray = [];

        for (let i=0; i<firstDayOfMonthDay-1; i++){
            emptyFieldsArray.push([]);
        }

        const monthDaysWithEmptyFieldsArray=emptyFieldsArray.concat(monthDaysArray);

        let monthDaysWeeksArray =[];

        for(let i=0; i<monthDaysWithEmptyFieldsArray.length-1; i+=7){
            monthDaysWeeksArray.push(monthDaysWithEmptyFieldsArray.slice(i,i+7));
        }

        setMonthDays(monthDaysWeeksArray);
    }

    const prevMonth =()=>{
        if(month-1<1){
            setYear(year-1);
            setMonth(12);
        }else{
        setMonth(month-1);
    }
}

    const nextMonth =()=>{
        if(month+1>12){
            setYear(year+1);
            setMonth(1);
        }else{
        setMonth(month+1);
    }
}

  useEffect(()=>
  monthArray(year, month),[month,year])
  
  console.log(selectedDay)

  return (
    <div className="calendar_container">
        <div className="calendar_header">
            <button onClick={()=> prevMonth()}>Prev</button>
            <span>{months[month-1]}</span><span>{year}</span>
            <button onClick={()=>nextMonth()}>Next</button>
        </div>
        <table className="calendar_table">
            <thead>
                <tr>
                {days.map((weekDay, index)=>{
                    return (<td key={index}>{weekDay}</td>)
                })}
                </tr>
            </thead>
            <tbody>
                {monthDays.map((week,index)=> {
                    return (<tr key={index}>{week.map((day,index)=>{return(<td key={index} onClick={()=>setSelectedDay(day)}>{day[0]}</td>)})}</tr>)
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Calendar