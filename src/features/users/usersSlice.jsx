import { createSlice } from "@reduxjs/toolkit";
const data = [
  {
    id: 1,
    name: "Joseph Onuoha",
    email: "iamonowu@gmail.com",
    role: "Admin",
    status: "Active",
    dateJoined: "2024-03-20",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@email.com",
    role: "User",
    status: "Inactive",
    dateJoined: "2024-03-18",
  },
];
const getStateFromLocalStorage = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : data;
  };


const initialState = getStateFromLocalStorage();


const saveStateToLocalStorage = (state) => {
    localStorage.setItem("users", JSON.stringify(state));
  };
  saveStateToLocalStorage(initialState);


const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: {
      prepare(name, email, role, status, id) {
        return {
          payload: {
            id,
            name,
            email,
            role,
            status,
            dateJoined: new Date().toISOString().split("T")[0],
          },
        };
      },
      reducer(state, action) {
        state.push(action.payload);
        saveStateToLocalStorage(state);
      },
    },
    updateUser: {
      prepare(id, name, email, role, status) {
        return {
          payload: { id, name, email, role, status },
        };
      },
      reducer(state, action) {
        const { id, name, email, role, status } = action.payload;
        const editedUser = state.find((user) => user.id === id);
        if (editedUser) {
          editedUser.name = name;
          editedUser.email = email;
          editedUser.role = role;
          editedUser.status = status;
        }
        saveStateToLocalStorage(state);
      },
    },
    deleteUser: {
      prepare(id) {
        return { payload: id};
      },
      reducer(state, action) {
        const updatedState = state.filter((user) => user.id !== action.payload);
        saveStateToLocalStorage(updatedState);
        return updatedState;
      },
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
