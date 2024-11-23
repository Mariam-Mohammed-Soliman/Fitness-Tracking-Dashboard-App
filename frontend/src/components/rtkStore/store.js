import { configureStore } from "@reduxjs/toolkit";
import  getUserSlice  from "./slices/login-slice";
import  goalSlice  from "./slices/Goal-slice";
import  workoutSlice  from "./slices/Workout-slice";

import { saveToLocalStorage, loadFromLocalStorage } from './LocalStorage';

const persistedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    login:getUserSlice,
    goal:goalSlice,
    workout:workoutSlice,
  },
  preloadedState: persistedState, // Load the persisted state
});

// Subscribe to store changes and save the state to localStorage after each change
store.subscribe(() => {
  saveToLocalStorage({
    login: store.getState().login, // Only persist specific parts of the state if needed
    goal: store.getState().goal, // Only persist specific parts of the state if needed
    workout: store.getState().workout, // Only persist specific parts of the state if needed
  });
});
