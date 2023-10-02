import { Dispatch } from 'redux';
import Type from './types';
import { getDatabase, ref, child, get, push, update, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Employee, EmployeeCreate } from '../models/employee';
import { EmployeeFormState } from '../reducers/employeeFormReducer';

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

export const createEmployee = (employee: EmployeeCreate) => async (dispatch: Dispatch) => {
  const { currentUser } = getAuth();
  if (!currentUser) return;
  const db = getDatabase();
  const refDb = ref(db);
  const path = `/users/${currentUser.uid}/employees`;

  const key = push(child(refDb, path)).key;

  const updates = { [`${path}/${key}`]: employee };

  //https://firebase.google.com/docs/database/web/read-and-write
  // To simultaneously write to specific children of a node without overwriting other child nodes, use the update() method.
  await update(refDb, updates);

  // to save data to a specified reference, replacing any existing data at that path.
  // await set(ref(db, `/users/${currentUser.uid}/employees`), { name, phone, shift });
};

export const updateEmployee = (employeeId: string, employee: EmployeeFormState) => async (dispatch: Dispatch) => {
  const { currentUser } = getAuth();
  if (!currentUser) return;
  const db = getDatabase();

  const path = `/users/${currentUser.uid}/employees/${employeeId}`;
  const refDb = ref(db, path);

  await update(refDb, employee);
}

export const deleteEmployee = (employeeId: string) => async (dispatch: Dispatch) => {
  const { currentUser } = getAuth();
  if (!currentUser) return;
  const db = getDatabase();

  const path = `/users/${currentUser.uid}/employees/${employeeId}`;
  const refDb = ref(db, path);

  await remove(refDb);
}
