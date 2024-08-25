import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux'


//import {criteriosApi} from './acreditacion/services/acreditacionApi'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      {/* <ApiProvider api={criteriosApi}> */}
      <Provider store={store}>
      <App />
      </Provider>
      {/* </ApiProvider> */}
      
   

  </React.StrictMode>
);


/// 77