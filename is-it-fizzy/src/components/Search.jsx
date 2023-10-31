import React, { useState, useRef, useEffect } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import '../styles/Search.css';


export default function Search(){
const [searchResult, setSearchResult] = useState({
    name : "",
    id: ""
})


  return (
    <div>
      <GooglePlacesAutocomplete
        selectProps={{
          placeholder: 'What bar are you at?',  
          searchResult,
          
          onChange: (selectedResult) =>{
            if (selectedResult && selectedResult.value){
                setSearchResult({
                 name: selectedResult.value.description,

                 id: selectedResult.value.place_id,// / Use 'value' for the place ID
                });
                 console.log("Selected Place Data:", searchResult);
            } else {
                setSearchResult({
                    name: "",
                    id: "",
                    });
            }
          },
          feilds: ["description", "place_id"],
          styles: {
            input: (provided) => ({
                ...provided,
                color: 'black',
            }),
            option: (provided) => ({
                ...provided,
                color: 'pink',
            }),
            singleValue: (provided) => ({
                ...provided,
                color: 'pink',
            }),
        },
        }}
      />
    </div>
  );
}