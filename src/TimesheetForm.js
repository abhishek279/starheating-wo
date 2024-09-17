import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TimesheetForm.css';  // Import the CSS file

// Configuring Axios to use a base URL
const api = axios.create({
    baseURL: 'https://starheatinwo-production.up.railway.app'
});

// After configuring the Axios instance
console.log('API Base URL:', api.defaults.baseURL);

const TimesheetForm = () => {
    const [timesheets, setTimesheets] = useState([]);
    const [timesheet, setTimesheet] = useState({
        name: '',
        workOrderNumber: '',  // Added workOrderNumber field
        startTime: new Date(),  // Using Date object for DatePicker
        endTime: new Date(),  // Using Date object for DatePicker
        completed: false,
        hours: 0
    });

    // Fetch timesheets on component mount
    useEffect(() => {
        fetchTimesheets();
    }, []);

    // Function to fetch timesheets from the backend
    const fetchTimesheets = async () => {
        try {
            console.log('Fetching timesheets from:', api.defaults.baseURL + '/api/timesheets');
            const response = await api.get('/api/timesheets');
            setTimesheets(response.data);
        } catch (error) {
            console.error('Error fetching timesheets:', error);
        }
    };

    // Handle input changes for text fields and checkbox
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTimesheet({
            ...timesheet,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Handle date changes for DatePicker
    const handleDateChange = (fieldName, date) => {
        setTimesheet((prev) => {
            const updated = { ...prev, [fieldName]: date };

            // Automatically calculate hours if both startTime and endTime are set
            if (fieldName === 'startTime' || fieldName === 'endTime') {
                const { startTime, endTime } = updated;
                if (startTime && endTime) {
                    const diffInHours = (endTime - startTime) / 3600000; // Difference in hours
                    updated.hours = diffInHours > 0 ? diffInHours : 0;
                }
            }

            return updated;
        });
    };

    // Submit form data to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Format date to ISO string for backend compatibility
            const formattedTimesheet = {
                ...timesheet,
                startTime: timesheet.startTime.toISOString(),
                endTime: timesheet.endTime.toISOString()
            };

            console.log('Submitting timesheet to:', api.defaults.baseURL + '/api/timesheets');
            await api.post('/api/timesheets', formattedTimesheet);
            fetchTimesheets();  // Refresh the list after posting
            setTimesheet({ name: '', workOrderNumber: '', startTime: new Date(), endTime: new Date(), completed: false, hours: 0 });  // Reset form fields
        } catch (error) {
            console.error('Failed to submit timesheet:', error);
        }
    };

    return (
        <div className="timesheet-container">
            <h2>Submit Timesheet</h2>
            <form className="timesheet-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={timesheet.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Work Order Number:</label>
                    <input
                        type="text"
                        name="workOrderNumber"
                        value={timesheet.workOrderNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Start Time:</label>
                    <DatePicker
                        selected={timesheet.startTime}
                        onChange={(date) => handleDateChange('startTime', date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </div>
                <div className="form-group">
                    <label>End Time:</label>
                    <DatePicker
                        selected={timesheet.endTime}
                        onChange={(date) => handleDateChange('endTime', date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </div>
                <div className="form-group">
                    <label>Completed (Y/N):</label>
                    <input
                        type="checkbox"
                        name="completed"
                        checked={timesheet.completed}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Hours:</label>
                    <input
                        type="text"
                        name="hours"
                        value={timesheet.hours}
                        readOnly
                    />
                </div>
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default TimesheetForm;
