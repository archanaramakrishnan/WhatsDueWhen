import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';

ReactDOM.render(
  <React.StrictMode>
    <Paper>
    <Calendar />
    </Paper>
  </React.StrictMode>,
  document.getElementById('root')
);