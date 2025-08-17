import {
  combineReducers,
  configureStore,
  PayloadAction,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authSlice } from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { toastSlice } from "./toastSlice";
import { modalSlice } from "./modalSlice";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = (state: any, action: PayloadAction<any>) => {
  return combineReducers({
    [authSlice.name]: authSlice.reducer,
    [toastSlice.name]: toastSlice.reducer,
    [modalSlice.name]: modalSlice.reducer,
  })(state, action);
};
const persistedReducer = persistReducer(persistConfig, reducer);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(),
  });

export const store = makeStore();
export const persistor = persistStore(store);
export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === "development",
});
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export const dispatch = store.dispatch;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
