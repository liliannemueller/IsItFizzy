import React, { useState, useRef, useEffect } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import '../styles/Search.css';
import FizzyMeter from "./FizzyMeter.jsx";
import BackButton from "./BackButton.jsx";

//need to fix teh empty strings in bar/searchResult on first click.
//need to display the fizzy meter when a bar is selected, then send teh data to the DB

export default function Search(){
    const [fizzyValue, setFizzyValue] = useState(0);
    const [barDetails, setBarDetails] = useState({
        name: "",
        city: "",
        state: "",
        id: ""
    })

    const [searchResult, setSearchResult] = useState({
        name : "",
        id: ""
    })

    function extractName(description) {
      setBarDetails({
          name: description.split(",")[0].trim(),
          city: description.split(",")[2].trim(),
          state: description.split(",")[3].trim(),
      })  
     
  }

    useEffect(() => {
    if (searchResult.name && searchResult.id) {
      setSearchResult(searchResult);
      console.log("inUseEffect", searchResult);
    }
  }, [searchResult]);

    async function handleBarSelection(selectedResult){
        if(selectedResult && selectedResult.value){
            const { description, place_id } = selectedResult.value;
            setSearchResult({
                name: extractName(description) || description,
                id: place_id
            });
            console.log("in handleBarSelection",searchResult);
        }
    }

    function handleFizzyMeterChange(event){
        setFizzyValue(event.target.value);
    };

    function handleSumbit(event){
        event.preventDefault();

        const data = {
            name: barDetails.name,  
            place_id: searchResult.id,
            fizzyRating: fizzyValue,
        }

        console.log("Data",data)
        fetch('/bars/add', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
            if (response.ok) {
                // Request successful
                console.log('Data submitted successfully');
            } else {
                // Request failed
                console.error('Failed to submit data');
            }
            })
            .catch(error => {
            // Error occurred during the request
            console.error('Error:', error);
            });
        }
    

  return (
    <div>
        <div className="auto-complete-container">
        <GooglePlacesAutocomplete
            selectProps={{ 
            placeholder: 'What bar are you at?',  
            searchResult,
            onChange: handleBarSelection,
            fields: ["description", "place_id"],
            }}
        />
        </div>
        {searchResult.name && searchResult.id && (
            <h4 id="barName">{barDetails.name} — {barDetails.city}, {barDetails.state}</h4>
        )}
        {searchResult.name && searchResult.id && (
            <>
            <FizzyMeter value={fizzyValue} onChange={handleFizzyMeterChange} />
            <div className ='button-container'>
                <button onClick={handleSumbit}>Submit</button>
                <BackButton />
            </div>
            </>
        )}
    </div>
  );
}



