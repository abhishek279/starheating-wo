import React from 'react';
import axios from 'axios';
import './WorkOrderForm.css';

class WorkOrderForm extends React.Component {
    state = {
        jobSiteName: '',
        billingName: '',
        jobSiteAddress: '',
        billingAddress: '',
        email: '',
        date: '',
        customerPO: '',
        equipmentMake: '',
        model: '',
        serialNumber: '',
        gasPressureInlet: '',
        gasPressureWC: '',
        gasPressureManifold: '',
        coTest: false,
        coReadings: '',
        reasonForCall: '',
        quantity: '',
        material: '',
        unitPrice: '',
        coTestCompleted: false,
        heatExchangerWashed: false,
        heatExchangerCleaned: false,
        heatExchangerInspected: false,
        refractoryTested: false,
        refractorySet: false,
        operatorTested: false,
        operatorSet: '',
        highLimitTested: false,
        highLimitSet: '',
        waterPressureTested: false,
        waterPressureSet: '',
        flowSwitchTested: false,
        pressureSwitchTested: false,
        totalMaterial: '',
        totalLabour: '',
        travelCharges: '',
        subtotal: '',
        tax: '',
        total: '',
        recommendations: ''
    };

    handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        this.setState({ [name]: type === 'checkbox' ? checked : value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/serviceReports', this.state)
            .then(response => {
                alert("Work Order Submitted Successfully!");
                this.resetForm();
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                alert("Error submitting form. Please check the console for more information.");
            });
    };

    resetForm = () => {
        this.setState({
            jobSiteName: '',
            billingName: '',
            jobSiteAddress: '',
            billingAddress: '',
            email: '',
            date: '',
            customerPO: '',
            equipmentMake: '',
            model: '',
            serialNumber: '',
            gasPressureInlet: '',
            gasPressureWC: '',
            gasPressureManifold: '',
            coTest: false,
            coReadings: '',
            reasonForCall: '',
            quantity: '',
            material: '',
            unitPrice: '',
            coTestCompleted: false,
            heatExchangerWashed: false,
            heatExchangerCleaned: false,
            heatExchangerInspected: false,
            refractoryTested: false,
            refractorySet: false,
            operatorTested: false,
            operatorSet: '',
            highLimitTested: false,
            highLimitSet: '',
            waterPressureTested: false,
            waterPressureSet: '',
            flowSwitchTested: false,
            pressureSwitchTested: false,
            totalMaterial: '',
            totalLabour: '',
            travelCharges: '',
            subtotal: '',
            tax: '',
            total: '',
            recommendations: ''
           
        }); // Reset form after submission
    };

    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <h2 className="form-header">Create Work Order</h2>
                    {Object.keys(this.state).map(key => (
                        <div className="form-body" key={key}>
                            <label className="label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
                            <input
                                className="input"
                                type={key === 'date' ? 'date' : (typeof this.state[key] === 'boolean' ? 'checkbox' : 'text')}
                                name={key}
                                checked={typeof this.state[key] === 'boolean' ? this.state[key] : undefined}
                                value={typeof this.state[key] === 'boolean' ? undefined : this.state[key]}
                                onChange={this.handleChange}
                                placeholder={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            />
                        </div>
                    ))}
                    <div className="button-container">
                        <button className="submit-button" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default WorkOrderForm;
