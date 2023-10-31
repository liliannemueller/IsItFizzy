import React from 'react';
import bootstrap from 'bootstrap';


export default function FizzyMeter(){
    return(
        <div>
            <label for="fizzyMeter" class="form-label">How fizzy is it?</label>
            <br></br>
            <input type="range" class="form-range" min="0" max="4" step="1" id="fizzyMeter" /> 
        </div>
    )
}