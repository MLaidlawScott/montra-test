import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

interface profileState {
  firstName: string;
  lastName: string;
  previousFirstName?: string;
  previousLastName?: string;
  profileThumbnailUri: string;
}

const initialState: profileState = {
  firstName: "Michael",
  lastName: "Scott",
  profileThumbnailUri:
    "https://uangsgrcjffwslxgvxiz.supabase.co/storage/v1/object/public/profile-images/IMG_8354.jpg?t=2023-01-14T03%3A57%3A05.913Z",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateFirstName: (state, action: PayloadAction<string>) => {
      state.previousFirstName = state.firstName;
      state.firstName = action.payload;
    },
    updateLastName: (state, action: PayloadAction<string>) => {
      state.previousLastName = state.lastName;
      state.lastName = action.payload;
    },
    updateThumbnail: (state, action: PayloadAction<string>) => {
      state.profileThumbnailUri = action.payload;
    },
  },
});

export const { updateFirstName, updateLastName, updateThumbnail } =
  profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
