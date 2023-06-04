import {
  combineReducers,
  configureStore,
  PayloadAction,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { authSlice } from "./authSlice";
import counterReducer from "./countSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = (state: any, action: PayloadAction<any>) => {
  return combineReducers({
    counter: counterReducer,
    [authSlice.name]: authSlice.reducer,
  })(state, action);
};
const persistedReducer = persistReducer(persistConfig, reducer);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(),
  });

export const store = makeStore();
export const persistor = persistStore(store);
export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === "development",
});
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
