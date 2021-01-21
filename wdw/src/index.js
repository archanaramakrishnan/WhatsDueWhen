import React from 'react';
import ReactDOM from 'react-dom';
// import Calendar from './Calendar';
import App from './Components/App';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import SubjectSelector from './Components/SubjectSelector';
import wdw from './Components/wdw.png';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);