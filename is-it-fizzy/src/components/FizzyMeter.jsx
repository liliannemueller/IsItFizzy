import React from 'react';
import bootstrap from 'bootstrap';
import '../styles/Meter.css'


export default function FizzyMeter(){
    return(
        <div>
        <div>
            <label htmlFor="fizzyMeter" className="form-label">How fizzy is it?</label>
        </div>
        <div className= "meter-container">
            <h4>flat</h4>
            <input type="range" className="form-range" min="0" max="4" step="1" id="fizzyMeter" /> 
            <h4>fizzy</h4>
        </div>
        </div>
    )
}