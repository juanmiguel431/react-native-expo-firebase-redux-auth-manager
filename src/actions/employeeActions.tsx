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

    dispatch({ type: Type.EmployeeFetchAllSuccess, payload: response });

  } catch (e) {
    if (e instanceof Error) {
      dispatch({ type: Type.EmployeeError, payload: e.message });
    }
  } finally {
    dispatch({ type: Type.EmployeeLoading, payload: false });
  }
};

export const getEmployee = (id: string) => async (dispatch: Dispatch): Promise<Employee | undefined> => {
  try {
    dispatch({ type: Type.EmployeeLoading, payload: true });

    const { currentUser } = getAuth();
    if (!currentUser) {
      dispatch({ type: Type.EmployeeError, payload: 'You must be logged in' });
      return;
    }

    const dbRef = ref(getDatabase());

    const snapshot = await get(child(dbRef, `users/${currentUser.uid}/employees/${id}`));
    const response = snapshot.val();

    dispatch({ type: Type.EmployeeFetchOneSuccess, payload: { id: id, employee: response } });

    return response;

  } catch (e) {
    if (e instanceof Error) {
      dispatch({ type: Type.EmployeeError, payload: e.message });
    }
  } finally {
    dispatch({ type: Type.EmployeeLoading, payload: false });
  }
}
