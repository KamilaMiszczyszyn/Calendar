import { useEffect, useState } from "react";

const Clock = () =>{
    let time =  new Date().toLocaleTimeString()
    const [clockTime,setClockTime] = useState(time)

   const UpdateTime=()=>{
    time =  new Date().toLocaleTimeString()
    setClockTime(time);
   }


  useEffect(() => {
     setInterval(UpdateTime, 1000)
  }
  ,[])

  return(
     <h1>{clockTime}</h1>
  )
  
}
export default Clock