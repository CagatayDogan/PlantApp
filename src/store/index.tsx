import {configureStore} from '@reduxjs/toolkit';
import onboardingReducer from '../reducers/onboardingSlice';

const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
  },
});

export default store;
