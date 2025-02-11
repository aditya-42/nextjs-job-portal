/*   

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistedState } from "redux-persist/es/types";

// 定义 RootState 类型
export type RootState = ReturnType<typeof rootReducer>;

// 配置 redux-persist
const persistConfig: PersistConfig<RootState> & { whitelist?: (keyof RootState)[] } = {
  key: "root",
  version: 1,
  storage,
};

// 组合所有 reducers
const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
  application: applicationSlice,
});

// 使用 `persistReducer`
const persistedReducer = persistReducer<RootState, any>(persistConfig, rootReducer);

// 创建 Redux Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 持久化 Store
export const persistor = persistStore(store);

// 定义 Redux 类型
export type AppDispatch = typeof store.dispatch;

*/