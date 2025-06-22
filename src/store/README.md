# Redux Toolkit Integration - Portfolio Edition

This project includes comprehensive Redux Toolkit integration for managing all portfolio data and API calls. Redux Toolkit is the official, recommended way to write Redux logic with less boilerplate and better developer experience.

## 📁 File Structure

```
src/store/
├── store.js              # Store configuration
├── hooks.js              # Typed hooks for React-Redux
├── api/
│   └── apiConfig.js      # API base configuration and endpoints
├── slices/
│   ├── counterSlice.js   # Counter example slice
│   ├── userSlice.js      # User management slice
│   ├── profileSlice.js   # User profile data
│   ├── projectsSlice.js  # Portfolio projects
│   ├── skillsSlice.js    # Technical skills
│   ├── timelineSlice.js  # Career timeline
│   ├── appsSlice.js      # Software applications
│   └── contactSlice.js   # Contact form management
└── README.md             # This file
```

## 🚀 Quick Start

### Using Redux State in Components

```jsx
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { increment, decrement } from "../store/slices/counterSlice";

function MyComponent() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
```

## 📦 Portfolio Slices

### Profile Slice

- **State**: `{ user: object | null, loading: boolean, error: string | null }`
- **Thunks**:
  - `fetchUserProfile()` - Fetch user profile from API
- **Actions**:
  - `clearError()` - Clear error state

### Projects Slice

- **State**:
  ```js
  {
    projects: array,
    currentProject: object | null,
    loading: boolean,
    projectLoading: boolean,
    error: string | null,
    projectError: string | null
  }
  ```
- **Thunks**:
  - `fetchProjects()` - Fetch all projects
  - `fetchProjectById(id)` - Fetch single project by ID
- **Actions**:
  - `clearError()` - Clear error states
  - `clearCurrentProject()` - Clear current project

### Skills Slice

- **State**: `{ skills: array, loading: boolean, error: string | null }`
- **Thunks**: `fetchSkills()` - Fetch all skills
- **Actions**: `clearError()` - Clear error state

### Timeline Slice

- **State**: `{ timeline: array, loading: boolean, error: string | null }`
- **Thunks**: `fetchTimeline()` - Fetch career timeline
- **Actions**: `clearError()` - Clear error state

### Apps Slice

- **State**: `{ apps: array, loading: boolean, error: string | null }`
- **Thunks**: `fetchApps()` - Fetch software applications
- **Actions**: `clearError()` - Clear error state

### Contact Slice

- **State**:
  ```js
  {
    loading: boolean,
    success: boolean,
    error: string | null,
    message: string | null
  }
  ```
- **Thunks**: `sendMessage(messageData)` - Send contact message
- **Actions**:
  - `clearContactState()` - Clear all contact state
  - `clearError()` - Clear error state

## 📦 Example Slices

### Counter Slice

- **State**: `{ value: number }`
- **Actions**:
  - `increment()` - Increment by 1
  - `decrement()` - Decrement by 1
  - `incrementByAmount(amount)` - Increment by specific amount
  - `reset()` - Reset to 0

### User Slice

- **State**:
  ```js
  {
    currentUser: object | null,
    isAuthenticated: boolean,
    loading: boolean,
    error: string | null
  }
  ```
- **Actions**:
  - `setUser(userData)` - Set current user and mark as authenticated
  - `clearUser()` - Clear user and mark as unauthenticated
  - `setLoading(boolean)` - Set loading state
  - `setError(errorMessage)` - Set error message
  - `updateUserProfile(updates)` - Update user profile

## 🔧 Creating New Slices

1. Create a new file in `src/store/slices/`
2. Use `createSlice` from Redux Toolkit:

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Your initial state
};

export const mySlice = createSlice({
  name: "myFeature",
  initialState,
  reducers: {
    // Your reducers
    myAction: (state, action) => {
      // Mutate state directly (Immer handles immutability)
      state.someProperty = action.payload;
    },
  },
});

export const { myAction } = mySlice.actions;
export default mySlice.reducer;
```

3. Add to store in `src/store/store.js`:

```js
import mySlice from "./slices/mySlice";

export const store = configureStore({
  reducer: {
    // ... existing reducers
    myFeature: mySlice,
  },
});
```

## 🎯 Demo Pages

- **Basic Redux Examples**: Visit `/redux-demo` to see counter and user management examples
- **Portfolio Redux State**: Visit `/portfolio-redux` to see all portfolio data management in action

## 🚀 Portfolio Integration

All portfolio components now use Redux for state management:

### Components Using Redux:

- **Hero** (`src/pages/miniComponents/Hero.jsx`) - Uses `profileSlice`
- **Portfolio** (`src/pages/miniComponents/Portfolio.jsx`) - Uses `projectsSlice`
- **Skills** (`src/pages/miniComponents/Skills.jsx`) - Uses `skillsSlice`
- **Timeline** (`src/pages/miniComponents/Timeline.jsx`) - Uses `timelineSlice`
- **MyApps** (`src/pages/miniComponents/MyApps.jsx`) - Uses `appsSlice`
- **Contact** (`src/pages/miniComponents/Contact.jsx`) - Uses `contactSlice`
- **ProjectView** (`src/pages/ProjectView.jsx`) - Uses `projectsSlice`

### API Configuration

All API calls are centralized in `src/store/api/apiConfig.js` with:

- Base URL configuration
- Axios instance with default settings
- Centralized endpoint definitions

## 📚 Useful Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React-Redux Hooks](https://react-redux.js.org/api/hooks)
- [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)

## 🛠️ Best Practices

1. **Use Redux Toolkit**: Always prefer RTK over plain Redux
2. **Colocate related logic**: Keep actions and reducers in the same slice
3. **Use typed hooks**: Import from `store/hooks.js` instead of directly from react-redux
4. **Keep slices focused**: Each slice should manage a specific piece of state
5. **Use Immer patterns**: Mutate state directly in reducers (RTK handles immutability)
