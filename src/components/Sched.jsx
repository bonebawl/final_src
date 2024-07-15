import React, {useState, useEffect} from 'react';
import generateSchedule from '../js_files/sched_maker.js';

function Sched_template(){
    const [sched, setSched] = useState("");
    const [schedList, setSchedList] = useState([]);
    const [time, setTime] = useState("");
    const [typaGuy, setTypaGuy] = useState("Night");
    const [generatedSchedule, setGeneratedSchedule] = useState(() => {
        const savedSchedule = localStorage.getItem('generatedSchedule');
        return savedSchedule ? JSON.parse(savedSchedule) : null;
    });
    
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const handleSchedInput = (e) => {
        setSched(e.target.value);
    }

    const make = () => {
        if (schedList.length > 0 && time && typaGuy) {
            const newSchedule = generateSchedule(schedList, time, typaGuy);
            setGeneratedSchedule(newSchedule);
        } else {
            alert("Please add tasks, set time, and select a time of day before generating the schedule.");
        }
    };
      useEffect(() => {
        if (generatedSchedule) {
          localStorage.setItem('generatedSchedule', JSON.stringify(generatedSchedule));
        }
      }, [generatedSchedule]);
    const handleTypaGuy = (e) => {
        setTypaGuy(e.target.value);
    }
    
    const handleTime = (e) => {
        setTime(e.target.value);
    }
    const handleSched = () => {
        if (sched.trim()) {
            setSchedList([...schedList, sched.trim()]);
            setSched("");
        }
    };
    const handleTimeBlur = () => {
        if (!time.match(timePattern)) {
            setTime('00:00');
        }
    }
    return(
        <div className="z-20">
            <h1 className="text-2xl font-bold mb-4">Schedule Maker!</h1>
            <div>
            <input
                type='text'
                placeholder='Tasks here'
                value = {sched}
                onChange={handleSchedInput}
                className = "mb-2"
                ></input>
                <button className="bg-cyan-900 ml-2 p-1 " onClick={handleSched}>Add</button>
            </div>
            <div>
            <input
                type='text'
                placeholder = "HH:MM"
                pattern="^([01]\d|2[0-3]):([0-5]\d)$"
                onBlur={handleTimeBlur}
                onChange = {handleTime}
                value = {time}
                className = "mr-2"
                >
                </input>
            <select value={typaGuy} placeholder="Day" onChange={handleTypaGuy}>
                <option value="night">Night</option>
                <option value="morning">Morning</option>
                <option value="noon">Noon</option>
                <option value="afternoon">Afternoon</option>
            </select>
            </div>
            <button onClick={make} className="bg-cyan-900 ml-2 p-1">Generate Schedule</button>
      
            {generatedSchedule && (
                <div className="mt-4" >
                <h2 className="text-lg font-bold mb-2 ">Generated Schedule:</h2>
                <div className="grid grid-cols-3 gap-4 mb-4" >
                    {generatedSchedule.slice(0, 3).map(({ day, schedule }) => (
                    <div key={day} className="bg-gray-800 p-4 rounded  border-solid border-4">
                        <h3 className="font-bold text-white">{day}</h3>
                        {schedule.map(({ task, start, end }, index) => (
                        <p key={index} className="text-gray-300 text-xs">
                            [{start} - {end}]: {task}
                        </p>
                        ))}
                    </div>
                    ))}
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {generatedSchedule.slice(3).map(({ day, schedule }) => (
                    <div key={day} className="bg-gray-800 p-4 rounded  border-solid border-4">
                        <h3 className="font-bold text-white">{day}</h3>
                        {schedule.map(({ task, start, end }, index) => (
                        <p key={index} className="text-gray-300 text-xs">
                            [{start} -  {end}]: {task}
                        </p>
                        ))}
                    </div>
                    ))}
                </div>
                </div>
             )}
        </div>
    );

}

export default Sched_template;
