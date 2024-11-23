import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUser = createAsyncThunk(
  "getUserSlice/fetchUser",
  async ({email,password}) => {
    const response =await axios.post(
      `http://localhost:3000/api/users/login`,{ email, password}, {
        headers: {
          'Content-Type': 'application/json',
        },
  })
  const res=await response.data;
  // console.log("from response.data======>",res);
  
  return res;  }
);

export const userRegistration = createAsyncThunk(
  "getUserSlice/userRegistration",

  async ({userName,email,gender,password,age,height,weight}) => {

    const response =await axios.post(`http://localhost:3000/api/users/register`,{userName,email,gender,password,age,height,weight}, {
      headers: {
        'Content-Type': 'application/json',
      },
  })
  const res=await response.data;
// console.log("from userRegistration response======>",res);

return res;
  }
);

export const userProfile = createAsyncThunk(
  "getUserSlice/userProfile",
  async ({userId}) => {
    const response=await axios.get(`http://localhost:3000/api/users/user/${userId.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
});

const res=await response.data;
return res;
  }
);


export const updateUser = createAsyncThunk(
  "getUserSlice/updateUser",

  async ({userId,updateUserName,updateEmail,updatePassword,updateAge,updateHeight,updateWeight}) => {

    // console.log("userIdFrom slice",userId);

    const response =await axios.patch(`http://localhost:3000/api/users/user/${userId}`,{
          userName:updateUserName,
          email:updateEmail,
          password:updatePassword,
          age:updateAge,
          height:updateHeight,
          weight:updateWeight,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
  })
  const res=await response.data;
  // console.log("from updateUser response.data",res);
  return res;

  });  

export const getUserSlice = createSlice({
  name: "getUserSlice",
  initialState: {
    data: null,
    loading: false,
    error: null,
    token: localStorage.getItem("token"),
  },
  reducers: {
    updateUserGoal: (state, action) => {
      // console.log("updateUserGoal=>",action.payload);
      
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // console.log("extraReducers fetchUser", action.payload);
      // localStorage.setItem('authToken', action.payload.token);
      state.data= action.payload;
        state.data.goals = action.payload.goals; // Set goals data
        state.data.workouts = action.payload.workouts; // Set workouts data
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      console.log("rejectedExtraReducers fetchUser", state.error);
      // state.data= state;
    });


    builder.addCase(userRegistration.fulfilled, (state, action) => {
      // console.log('Payload userRegistration:', action.payload);  
      state.data= action.payload;
      state.goals = action.payload.goals; // Set goals data
      state.workouts = action.payload.workouts; // Set workouts data
    });
    builder.addCase(userRegistration.rejected, (state, action) => {
      console.log("rejectedExtraReducers userRegistration", state.error);
      // state.data= state;
    });

    builder.addCase(userProfile.fulfilled, (state, action) => {
      state.loading = false;
      // console.log('Payload userProfile:', action.payload);  
      state.data= action.payload;
      // state.token = action.payload.token;
      //   localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(userProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
      console.log("rejectedExtraReducers userProfile", state.error);
      // state.data= state;
    });
    builder.addCase(userProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      // console.log('Payload updateUser:', action.payload);  
      state.data= action.payload;

      localStorage.setItem('user', JSON.stringify(state.data));
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
      console.log("rejectedExtraReducers updateUser", state.error);
      // state.data= state;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  },
});

export const {updateUserGoal} = getUserSlice.actions;

export default getUserSlice.reducer;