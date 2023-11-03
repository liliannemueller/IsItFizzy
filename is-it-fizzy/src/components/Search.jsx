import React, { useState, useRef, useEffect } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import '../styles/Search.css';



export default function Search(){
const [searchResult, setSearchResult] = useState({
    name : "",
    id: ""
})

async function handleBarSelection(selectedResult){
    if(selectedResult && selectedResult.value){
        const { description, place_id } = selectedResult.value;
        console.log(searchResult);
        try {
            const response = await fetch('/bars/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: description, id: place_id})
            });

            if(response.ok){
                console.log("Added successfully!")
            } else {
                console.error('Error is sending data to the server')
            }
        } catch (error) {
            console.error('Error in sending data:', error)
        }
        setSearchResult({
            name: description,
            id: place_id
        })
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
    </div>
  );
}