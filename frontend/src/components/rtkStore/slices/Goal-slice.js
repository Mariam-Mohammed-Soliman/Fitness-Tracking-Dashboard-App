import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getGoal = createAsyncThunk(
  "goalSlice/getGoal",
  async (goalId) => {
    const response=await axios.get(`http://localhost:3000/api/goals/${goalId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
});

const res=await response.data;
// console.log("from response.data Goal",res);
return res;
  }
);

export const addGoal = createAsyncThunk(
  "goalSlice/addGoal",

  async ({userId,targetWeight,targetCaloriesBurned,targetCaloriesIntake,targetWaterIntake,targetSteps}) => {

    
    const response =await axios.post(`http://localhost:3000/api/goals/`,{userId,targetWeight,targetCaloriesBurned,targetCaloriesIntake,targetWaterIntake,targetSteps}, {
      headers: {
        'Content-Type': 'application/json',
      },
  })
  const res=await response.data;
return res;
  }
);



export const updateGoal = createAsyncThunk(
  "goalSlice/updateGoal",

  async ({goalId,updateTargetWeight,updateTargetCaloriesBurned,updateTargetCaloriesIntake,updateTargetWaterIntake,updateTargetSteps}) => {

    const response =await axios.patch(`http://localhost:3000/api/goals/${goalId}`,{
        targetWeight:updateTargetWeight,
        targetCaloriesBurned:updateTargetCaloriesBurned,
        targetCaloriesIntake:updateTargetCaloriesIntake,
        targetWaterIntake:updateTargetWaterIntake,
        targetSteps:updateTargetSteps
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
  })
  const res=await response.data;
  return res;

  });  


export const goalSlice = createSlice({
  name: "goalSlice",
  initialState: {
    data: null,
    loading: false,
    error: null,
    token: localStorage.getItem("token"),
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getGoal.fulfilled, (state, action) => {
      // console.log("extraReducers getGoal", action.payload);
      state.data= action.payload;
    });
    builder.addCase(getGoal.rejected, (state, action) => {
      console.log("rejectedExtraReducers getGoal", state.error);
      // state.data= state;
    });



    builder.addCase(addGoal.fulfilled, (state, action) => {
      // console.log('Payload addGoal:', action.payload);  
      state.data= action.payload;
      // state.user.goals.push(action.payload._id);
    });
    builder.addCase(addGoal.rejected, (state, action) => {
      console.log("rejectedExtraReducers addGoal", state.error);
      // state.data= state;
    });



    builder.addCase(updateGoal.fulfilled, (state, action) => {
      state.loading = false;
      // console.log('Payload updateGoal:', action.payload);  
      state.data= action.payload;

      localStorage.setItem('user', JSON.stringify(state.data));
    });
    builder.addCase(updateGoal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
      console.log("rejectedExtraReducers updateGoal", state.error);
      // state.data= state;
    });
    builder.addCase(updateGoal.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  },
});

export const {} = goalSlice.actions;

export default goalSlice.reducer;