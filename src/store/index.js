import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/authReducer";
import taskReducer from "./reducers/taskReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  authReducer,
  taskReducer,
});

const persistConfig = {
  key: "authReducer",
  storage: storage,
  whitelist: ["authReducer"],
};

const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = composeEnhancers(applyMiddleware(thunk));
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);

export { persistor, store };
