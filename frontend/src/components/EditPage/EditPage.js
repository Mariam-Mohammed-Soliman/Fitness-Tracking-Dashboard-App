import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditPage.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../rtkStore/slices/login-slice";
import { updateGoal } from "../rtkStore/slices/Goal-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
const EditPage = () => {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.login);
  const profileData = user?.data?.data;
  console.log("profileData edit",profileData);

  const [updateUserName, setUpdateUserName] = useState(profileData?.userName);
  const [updateEmail, setUpdateEmail] = useState(profileData?.email);
  const [updatePassword, setUpdatePassword] = useState(profileData?.password);
  const [updateAge, setUpdateAge] = useState(profileData?.age);
  const [updateHeight, setUpdateHeight] = useState(profileData?.height);
  const [updateWeight, setUpdateWeight] = useState(profileData?.weight);

  //goal slice
  const goal= useSelector(state=>state.goal);
  console.log("goalProfile edit", goal);
  const goalData = goal.data?.data.goal;
  console.log("goalData", goalData);

  //targetWeight,targetCaloriesBurned,targetCaloriesIntake,targetWaterIntake,targetSteps
  const [updateTargetWeight, setUpdateTargetWeight] = useState(
    goalData?.targetWeight
  );
  const [updateTargetCaloriesBurned, setUpdateTargetCaloriesBurned] = useState(
    goalData?.targetCaloriesBurned
  );
  const [updateTargetCaloriesIntake, setUpdateTargetCaloriesIntake] = useState(
    goalData?.targetCaloriesIntake
  );
  const [updateTargetWaterIntake, setUpdateTargetWaterIntake] = useState(
    goalData?.targetWaterIntake
  );
  const [updateTargetSteps, setUpdateTargetSteps] = useState(
    goalData?.targetSteps
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      updateUser({
        userId,
        updateUserName,
        updateEmail,
        updatePassword,
        updateAge: parseInt(updateAge),
        updateHeight: parseInt(updateHeight),
        updateWeight: parseInt(updateWeight),
      })
    );

    dispatch(
      updateGoal({
        goalId: goalData?._id,
        updateTargetWeight: parseInt(updateTargetWeight),
        updateTargetCaloriesBurned: parseInt(updateTargetCaloriesBurned),
        updateTargetCaloriesIntake: parseInt(updateTargetCaloriesIntake),
        updateTargetWaterIntake: parseInt(updateTargetWaterIntake),
        updateTargetSteps: parseInt(updateTargetSteps),
      })
    );

    console.log("userId.id",user.data.data._id);

    navigate("/profile/" + user.data.data._id);
  };

  return (
    <div className="mx-3 edit ">
      <div className="h-100 w-100 text-white p5 d-flex justify-content-center align-items-center ">
        <form
          onSubmit={handleSubmit}
          style={{ marginLeft: "10%", width: "50%" }}
        >
          <h2 className="text-center d-block">
            Update Your Details <FontAwesomeIcon icon={faPenToSquare} />{" "}
          </h2>
          <h4>Personal Info : </h4>
          <div className="row mb-1">
            <div className="col-md-6">
              <label> Name:</label>
              <input
                type="text"
                className="form-control"
                value={updateUserName}
                onChange={(e) => setUpdateUserName(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label> Height</label>
              <input
                type="text"
                className="form-control"
                value={updateHeight}
                onChange={(e) => setUpdateHeight(e.target.value)}
              />
            </div>
          </div>

          <div className="row  mb-1">
            <div className="col-md-6">
              <label> Weight:</label>
              <input
                type="text"
                className="form-control"
                value={updateWeight}
                onChange={(e) => setUpdateWeight(e.target.value)}
              />
            </div>
          </div>

          <hr style={{ color: "gray" }} />
          <h4>Goals : </h4>

          <div className="row  mb-1">
            <div className="col-md-6">
              <label> Target Weight:</label>
              <input
                type="text"
                className="form-control"
                value={updateTargetWeight}
                onChange={(e) => setUpdateTargetWeight(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label> Target Calories Burned:</label>
              <input
                type="text"
                className="form-control"
                value={updateTargetCaloriesBurned}
                onChange={(e) => setUpdateTargetCaloriesBurned(e.target.value)}
              />
            </div>
          </div>

          <div className="row  mb-1">
            <div className="col-md-6">
              <label> Target Calories Intake:</label>
              <input
                type="text"
                className="form-control"
                value={updateTargetCaloriesIntake}
                onChange={(e) => setUpdateTargetCaloriesIntake(e.target.value)}
              />
            </div>

            <div className="col-md-6  ">
              <label> Target Water Intake:</label>
              <input
                type="text"
                className="form-control"
                value={updateTargetWaterIntake}
                onChange={(e) => setUpdateTargetWaterIntake(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6 ">
            <label> Target Steps:</label>
            <input
              type="text"
              className="form-control"
              value={updateTargetSteps}
              onChange={(e) => setUpdateTargetSteps(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="sub-edit text-center"
            style={{
              textDecoration: "none",
              marginTop: "4%",
              marginLeft: "37%",
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditPage;
