import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getLatestWorkouts = createAsyncThunk(
  "workoutSlice/getLatestWorkouts",
  async (userId) => {
    console.log("userId=>>>>>>>",userId);
    
    const response=await axios.get(`http://localhost:3000/api/workout/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
});

const res=await response.data;
console.log("from response.data ALL workout",res);
return res;
  }
);

export const getWorkout = createAsyncThunk(
  "workoutSlice/getWorkout",
  async (workoutId) => {

    console.log("workoutId",workoutId);
    
    
    const response=await axios.get(`http://localhost:3000/api/workout/${workoutId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
});

const res=await response.data;
console.log("from response.data ALL workout",res);
return res;
  }
);

export const addWorkout = createAsyncThunk(
  "workoutSlice/addWorkout",
  async ({ userId, activityInfo, caloriesIntake, waterIntake, steps }, thunkAPI) => {
    console.log("addWorkout dispatched with data:", { userId, activityInfo, caloriesIntake, waterIntake, steps });

    try {
      const response = await axios.post(
        `http://localhost:3000/api/workout/`,
        { userId, activityInfo, caloriesIntake, waterIntake, steps},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Backend response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in addWorkout:", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const workoutSlice = createSlice({
  name: "workoutSlice",
  initialState: {
    data: null,
    loading: false,
    error: null,
    token: localStorage.getItem("token"),
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getLatestWorkouts.fulfilled, (state, action) => {
      console.log("extraReducers getLatestWorkouts", action.payload);
      state.data= action.payload;
    });
    builder.addCase(getLatestWorkouts.rejected, (state, action) => {
      console.log("rejectedExtraReducers getLatestWorkouts", state.error);
      // state.data= state;
    });
    builder.addCase(getWorkout.fulfilled, (state, action) => {
      console.log("extraReducers getWorkout", action.payload);
      state.data= action.payload;
    });
    builder.addCase(getWorkout.rejected, (state, action) => {
      console.log("rejectedExtraReducers getWorkout", state.error);
      // state.data= state;
    });



    builder.addCase(addWorkout.fulfilled, (state, action) => {
      console.log('Payload addWorkout:', action.payload);  
      state.data= action.payload;
      
    });
    builder.addCase(addWorkout.rejected, (state, action) => {
      console.log("rejectedExtraReducers addWorkout", state.error);
      // state.data= state;
    });


  },
});

export const {} = workoutSlice.actions;

export default workoutSlice.reducer;