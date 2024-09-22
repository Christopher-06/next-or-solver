import { configureStore } from "@reduxjs/toolkit";
import variablesReducer from "@/store/slices/Variables";

export const store = configureStore({
  reducer: {
    variables: variablesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
