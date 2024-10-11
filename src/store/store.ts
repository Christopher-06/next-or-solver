/*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, version 2 of the License.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*/

import { configureStore } from "@reduxjs/toolkit";
import variablesReducer from "@/store/slices/Variables";
import modellReducer from "@/store/slices/Modell";
import solveResultsReducer from "@/store/slices/SolveResults";
import inputTypeReducer from "@/store/slices/InputType";
import textFieldInputReducer from "@/store/slices/TextFieldInputs";

export const store = configureStore({
  reducer: {
    variables: variablesReducer,
    modell: modellReducer,
    solveResults: solveResultsReducer,
    inputType: inputTypeReducer,
    textFieldInputs: textFieldInputReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
