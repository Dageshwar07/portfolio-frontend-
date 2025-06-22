# Redux Toolkit Integration

This project now includes Redux Toolkit for state management. Redux Toolkit is the official, recommended way to write Redux logic with less boilerplate and better developer experience.

## 📁 File Structure

```
src/store/
├── store.js              # Store configuration
├── hooks.js              # Typed hooks for React-Redux
├── slices/
│   ├── counterSlice.js   # Counter example slice
│   └── userSlice.js      # User management slice
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

## 📦 Included Slices

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

## 🎯 Demo Page

Visit `/redux-demo` to see working examples of both slices in action.

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
