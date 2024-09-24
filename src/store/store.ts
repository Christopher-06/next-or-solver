import { configureStore } from "@reduxjs/toolkit";
import variablesReducer from "@/store/slices/Variables";
import solveResultsReducer from "@/store/slices/SolveResults";
import inputTypeReducer from "@/store/slices/InputType";
import textFieldInputReducer from "@/store/slices/TextFieldInputs";


export const store = configureStore({
  reducer: {
    variables: variablesReducer,
    solveResults: solveResultsReducer,
    inputType: inputTypeReducer,
    textFieldInputs: textFieldInputReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
