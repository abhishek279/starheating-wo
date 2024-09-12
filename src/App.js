import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import WorkOrderForm from './WorkOrderForm';
import TimesheetForm from './TimesheetForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work-order" element={<WorkOrderForm />} />
          <Route path="/timesheets" element={<TimesheetForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
