import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";
import userSlice from "./slices/userSlice";
import profileSlice from "./slices/profileSlice";
import projectsSlice from "./slices/projectsSlice";
import skillsSlice from "./slices/skillsSlice";
import timelineSlice from "./slices/timelineSlice";
import appsSlice from "./slices/appsSlice";
import contactSlice from "./slices/contactSlice";

export const store = configureStore({
  reducer: {
    // Example slices
    counter: counterSlice,
    user: userSlice,
    // Portfolio slices
    profile: profileSlice,
    projects: projectsSlice,
    skills: skillsSlice,
    timeline: timelineSlice,
    apps: appsSlice,
    contact: contactSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});
