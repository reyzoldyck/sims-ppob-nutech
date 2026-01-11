import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getProfileApi,
  updateProfileApi,
  uploadProfileImageApi,
  type Profile,
} from "./profileService";

interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
  success: false,
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await getProfileApi();
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal mengambil profile"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (
    payload: { first_name: string; last_name: string },
    { rejectWithValue }
  ) => {
    try {
      return await updateProfileApi(payload);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Gagal update profile"
      );
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  "profile/uploadImage",
  async (file: File, { rejectWithValue }) => {
    try {
      const response = await uploadProfileImageApi(file);

      return response;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Upload image gagal"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileState(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE PROFILE
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      // UPLOAD IMAGE
      .addCase(uploadProfileImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data!.profile_image = action.payload.data.profile_image;
      });
  },
});

export default profileSlice.reducer;
export const { resetProfileState } = profileSlice.actions;
