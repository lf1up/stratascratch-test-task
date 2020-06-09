import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import configureStore from '../../store/configureStore';

import TableFilters from '../../components/TableFilters';
import MainTable from '../../components/MainTable';

const { persistor, store } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <TableFilters />
        <MainTable />
      </PersistGate>
    </Provider>
  );
}

export default App;
