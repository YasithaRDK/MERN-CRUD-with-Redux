import {
  setStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  setLoading,
} from "./studentSlice";
import {
  fetchStudents as fetchStudentsApi,
  createStudent as createStudentApi,
  updateStudent as updateStudentApi,
  deleteStudent as deleteStudentApi,
} from "./studentApiSlice";

export const fetchStudents = () => async (dispatch) => {
  dispatch(setLoading());
  const students = await fetchStudentsApi();
  dispatch(setStudent(students));
};

export const createStudent = (data) => async (dispatch) => {
  dispatch(setLoading());
  const newStudent = await createStudentApi(data);
  dispatch(addStudent(newStudent));
};

export const updateStudentById = (id, data) => async (dispatch) => {
  dispatch(setLoading());
  const updatedStudent = await updateStudentApi(id, data);
  dispatch(updateStudent(updatedStudent));
};

export const deleteStudentId = (id) => async (dispatch) => {
  dispatch(setLoading());
  await deleteStudentApi(id);
  dispatch(deleteStudent(id));
};
