import React, { useState, useRef, useEffect } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import '../styles/Search.css';
import FizzyMeter from "./FizzyMeter.jsx";

//need to fix teh empty strings in bar/searchResult on first click.
//need to display the fizzy meter when a bar is selected, then send teh data to the DB

export default function Search(){
    const [searchResult, setSearchResult] = useState({
        name : "",
        id: ""
    })

    function extractName(description) {
    return description.split(",")[0].trim();
  }

    useEffect(() => {
    if (searchResult.name && searchResult.id) {
      // Perform any additional actions with the selectedResult object
      const { name, id } = searchResult;
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

    
    
  return (
    <div>
      <GooglePlacesAutocomplete
        selectProps={{ 
          placeholder: 'What bar are you at?',  
          searchResult,
          onChange: handleBarSelection,
          fields: ["description", "place_id"],
        }}
      />
      <h4 id="barName">{searchResult.name}</h4>
      {searchResult.name && searchResult.id && (
        <FizzyMeter />
      )}
    </div>
  );
}



