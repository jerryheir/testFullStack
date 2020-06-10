import React from 'react';
import Routes from './Navigation/Routes';
import { Provider } from "react-redux";
import { store } from "./Store";

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
