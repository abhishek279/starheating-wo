import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Configuring Axios to use a base URL
const api = axios.create({
    baseURL: 'http://localhost:8080'
});

const TimesheetForm = () => {
    const [timesheets, setTimesheets] = useState([]);
    const [timesheet, setTimesheet] = useState({
        name: '',
        loginTime: new Date(),  // Using Date object for DatePicker
        logoutTime: new Date()  // Using Date object for DatePicker
    });

    // Fetch timesheets on component mount
    useEffect(() => {
        fetchTimesheets();
    }, []);

    // Function to fetch timesheets from the backend
    const fetchTimesheets = async () => {
        try {
            const response = await api.get('/api/timesheets');
            setTimesheets(response.data);
        } catch (error) {
            console.error('Error fetching timesheets:', error);
        }
    };

    // Handle input changes for text fields
    const handleChange = (e) => {
        setTimesheet({
            ...timesheet,
            [e.target.name]: e.target.value
        });
    };

    // Handle date changes for DatePicker
    const handleDateChange = (fieldName, date) => {
        setTimesheet({
            ...timesheet,
            [fieldName]: date
        });
    };

    // Submit form data to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Format date to ISO string for backend compatibility
            const formattedTimesheet = {
                ...timesheet,
                loginTime: timesheet.loginTime.toISOString(),
                logoutTime: timesheet.logoutTime.toISOString()
            };
            await api.post('/api/timesheets', formattedTimesheet);
            fetchTimesheets();  // Refresh the list after posting
            setTimesheet({ name: '', loginTime: new Date(), logoutTime: new Date() });  // Reset form fields
        } catch (error) {
            console.error('Failed to submit timesheet:', error);
        }
    };

    return (
        <div>
            <h2>Submit Timesheet</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={timesheet.name}
                    onChange={handleChange}
                />
                <label>Login Time:</label>
                <DatePicker
                    selected={timesheet.loginTime}
                    onChange={(date) => handleDateChange('loginTime', date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
                <label>Logout Time:</label>
                <DatePicker
                    selected={timesheet.logoutTime}
                    onChange={(date) => handleDateChange('logoutTime', date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default TimesheetForm;
