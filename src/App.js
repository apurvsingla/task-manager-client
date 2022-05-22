import { BrowserRouter } from "react-router-dom";
import Layout from "./modules/index";
import { Provider } from "react-redux";
import {store} from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Layout />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
