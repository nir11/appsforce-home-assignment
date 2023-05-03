import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { User } from "../../interfaces/user";
import axios from "axios";

// Define a type for the slice state
interface UsersState {
  users: Array<User>;
}

// Define the initial state using that type
const initialState: UsersState = {
  users: [],
};

export const getUsers = createAsyncThunk(
  "https://randomuser.me/api/?results=10",
  async () => {
    try {
      const res = await axios.get("https://randomuser.me/api/?results=10");

      const usersData = res.data.results.map(
        (user: any): User => ({
          id: `${user.login.uuid}`,
          name: {
            title: user.name.title,
            firstName: user.name.first,
            lastName: user.name.last,
          },
          email: user.email,
          image: user.picture.medium,
          location: {
            country: user.location.country,
            city: user.location.city,
            street: `${user.location.street.name} ${user.location.street.number}`,
          },
        })
      );

      return usersData;
    } catch (error) {
      console.log(error);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      state.users.unshift(action.payload);
    },
    editUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
    });
  },
});

export const { createUser, editUser, deleteUser } = usersSlice.actions;

export const users = (state: RootState) => state.usersReducer.users;

export default usersSlice.reducer;
