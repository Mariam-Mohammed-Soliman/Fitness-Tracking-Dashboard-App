// localStorage.js

// Save Redux state to localStorage
export const saveToLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('appState', serializedState);
    } catch (error) {
      console.error('Could not save state to localStorage', error);
    }
  };
  
  // Load Redux state from localStorage
  export const loadFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('appState');
      if (serializedState === null) {
        return undefined; // No saved state, return undefined
      }
      return JSON.parse(serializedState);
    } catch (error) {
      console.error('Could not load state from localStorage', error);
      return undefined;
    }
  };
  