import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOnboardingComplete: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setOnboardingStatus: (state, action) => {
      state.isOnboardingComplete = action.payload;
    },
  },
});

export const {setOnboardingStatus} = onboardingSlice.actions;
export default onboardingSlice.reducer;
