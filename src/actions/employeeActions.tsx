import { Dispatch } from 'redux';
import Type from './types';
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { Employee } from '../models/employee';

export const getEmployees = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: Type.EmployeeLoading, payload: true });

    const { currentUser } = getAuth();
    if (!currentUser) {
      dispatch({ type: Type.EmployeeError, payload: 'You must be logged in' });
      return;
    }

    const dbRef = ref(getDatabase());

    const snapshot = await get(child(dbRef, `users/${currentUser.uid}/employees`));
    const response = snapshot.val();

    const employees: Employee[] = []
    for (const key in response) {
      const item = response[key];
      employees.push({ id: key, ...item });
    }

    dispatch({ type: Type.EmployeeFetchSuccess, payload: employees });

  } catch (e) {
    if (e instanceof Error) {
      dispatch({ type: Type.EmployeeError, payload: e.message });
    }
  } finally {
    dispatch({ type: Type.EmployeeLoading, payload: false });
  }
};
