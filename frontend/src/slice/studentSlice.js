import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    isLoading: false,
    isError: null,
  },
  reducers: {
    setStudent: (state, action) => {
      state.students = action.payload;
      state.isLoading = false;
      state.isError = null;
    },
    addStudent: (state, action) => {
      state.students.push(action.payload);
      state.isLoading = false;
      state.isError = null;
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(
        (student) => student._id === action.payload._id
      );
      if (index !== -1) {
        state.students[index] = action.payload;
        state.isLoading = false;
        state.isError = null;
      }
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student._id !== action.payload
      );
      state.isLoading = false;
      state.isError = null;
    },
    setLoading: (state) => {
      state.isLoading = true;
      state.isError = null;
    },

    setError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export const {
  setStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  setLoading,
  setError,
} = studentSlice.actions;
export default studentSlice.reducer;
