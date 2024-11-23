import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./addActivity.css";
import React, { useState } from 'react';
import ActivityForm from "../activityForm/activityForm"; 
function AddActivity({userId,onWorkoutUpdate}) {
    
    const [isFormVisible, setIsFormVisible] = useState(false); 

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible); 
    };

    return (
        <div className=" add-card d-flex justify-content-center align-items-center text-center mx-3 h-100 card  align-self-center" style={{ width: "20%", height:"100%" }}>
            {/* <p  className="fw-bold">Add your activity for today!</p> */}
            <button className="addBtn  h-50 fs-6" onClick={toggleForm}>
                <FontAwesomeIcon icon={faCirclePlus} /> New Activity
            </button>

            {isFormVisible && <div className="overlay" onClick={toggleForm}></div>}
            {isFormVisible && <ActivityForm toggleForm={toggleForm} userId={userId} onWorkoutUpdate={onWorkoutUpdate} />}
        </div>
    );
}

export default AddActivity;
