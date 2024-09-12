import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Ensure this CSS path is correct

function HomePage() {
    return (
        <div className="home-container">
            <h1 className="home-header">Welcome to Star Heating Services</h1>
            <div className="link-container">
                <Link to="/work-order" className="home-link">Create a New Work Order</Link>
                <Link to="/timesheets" className="home-link">Manage Timesheets</Link>
            </div>
        </div>
    );
}

export default HomePage;
