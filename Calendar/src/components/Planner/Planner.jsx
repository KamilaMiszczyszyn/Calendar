import { useState, useEffect, useContext } from 'react'
import { Timestamp, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import {db} from "./../../firebase/firebase"
import {DataContext} from "./../../context/DataContext"
import { AuthContext } from '../../context/AuthContext';
import styles from "./Planner.module.css"

const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const days=["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const hours = ["06", "07", "08", "09", "10","11", "12", "13","14","15","16", "17", "18", "19", "20","21", "22", "23"]

const Planner = ({selectedDay, setSelectedDay}) => {
  const currentUser = useContext(AuthContext);
  const userData  = useContext(DataContext);

  const [editForm, setEditForm]= useState(false)
  const [notes, setNotes]=useState([])

  const docRef = doc(db, 'users', currentUser?.uid);
  
  const date = new Date(selectedDay[2],selectedDay[1]-1,selectedDay[0]);

  const dayOfWeek = date.getDay();
 

    const getNotes = (userData, selectedDay) => {
      const plannerArray = userData?.planner
   
      const notes = hours.map((hour)=>{
        const date = Timestamp.fromDate(new Date(selectedDay[2],selectedDay[1]-1,selectedDay[0], hour)); 
        const filteredNote = plannerArray.filter((note)=> note.date.seconds == date.seconds
        )
        return [hour, filteredNote[0]?.text]
      })
      setNotes(notes) 
  }
  
    const handleSubmit =  async (event) => {
      event.preventDefault();
      const text = event.target?.note.value;
      const hour = event.target?.note.id;

      const date = Timestamp.fromDate(new Date(selectedDay[2],selectedDay[1]-1,selectedDay[0], hour))

      if(event.target?.note.defaultValue){
        const dataToRemove= {
          planner: arrayRemove(
            {
              date: date,
              text: event.target?.note.defaultValue}
            )
          }

          const data= {
              planner: arrayUnion({text, date})
          }   

        try{
          await updateDoc(docRef, dataToRemove)
          await updateDoc(docRef,data)
        }catch(error){
        console.log(error)
      }

      }else{

      const data= {
          planner: arrayUnion({text, date})
      }
           
      try{  
        await updateDoc(docRef,data)
      }catch(error){
        console.log(error)
      }
    }
      setEditForm(false)
    }

     const deleteNote = async (note) => {
      const date = Timestamp.fromDate(new Date(selectedDay[2],selectedDay[1]-1,selectedDay[0], note[0]))

      const dataToRemove= {
          planner: arrayRemove(
            {
              date: date,
              text: note[1]}
            )
      }

      try{
        await updateDoc(docRef, dataToRemove)
      }catch(error){
        console.log(error)
      }
     }

    useEffect(()=>{
      getNotes(userData, selectedDay);
  },[userData,selectedDay])

  return (
    <div className={styles.planner_container}>
      <div className={styles.planner_header}>
        <span className={styles.day}>{selectedDay[0]}</span>
        <span className={styles.month}>{months[selectedDay[1]-1]}</span>
        <span className={styles.dayofweek}>{days[dayOfWeek]}</span> 
      </div> 
        <table>
          <tbody>
            {notes.map((note, index)=> {
              return(
              <tr key={index}>
                <td>{note[0] > 12 ?       
                (<div className={styles.hour}><span>{note[0]-12 >9 ? (`${note[0]-12}`) : (`0${note[0]-12}`)}</span><span>PM</span></div>)
                             
                 :   
                (<div className={styles.hour}><span>{`${note[0]}`}</span><span>AM</span></div>)
                 }
                 </td>
                <td>
                  {editForm === index ? 
                  <form className={styles.edit_form} onSubmit={handleSubmit}>
                    <input id={note[0]} name="note" maxLength="90" defaultValue={note[1]}/>
                    <div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={()=> setEditForm(false)} >Cancel</button>
                    </div>
                  </form> 
                  :  
                  <div className={styles.note}>
                    <p>{note[1]}</p>
                    {!note[1] ? 
                    <button onClick={() => setEditForm(index)}>+</button> :
                    <div>
                    <button onClick={() => setEditForm(index)}>Edit</button>
                    <button onClick={() => deleteNote(note) }>Delete</button>
                    </div>
                     }
                  </div>
                  }
                </td>
                <td>     
                </td>
              </tr>
              )
            })
      }
          </tbody>
       </table>
    </div>
  )
}

export default Planner



