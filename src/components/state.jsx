import "./state.css";
import { useEffect, useState } from "react";




function StateSelector() {

    const [ countries, setCountries ] = useState([]);
    const [ states, setStates ] = useState([]); 
    const [ cities, setCities ] = useState([]);

    const [ selectedCountry, setSelectedCountry ] = useState("");
    const [ selectedState, setSelectedState ] = useState("");
    const [ selectedCity, setSelectedCity ] = useState("");

    useEffect(() => {
        const getAllCountries  = async () => {
            try{
                const res = await fetch(`https://location-selector.labs.crio.do/countries`);
                const data = await res.json();
                setCountries(data);
    
            } catch(error) {
                console.error("Error fetching data: ", error);
            }
        };
        getAllCountries()
    
    }, [])

    useEffect(() => {
        if(!selectedCountry) return;

        const getAllStates = async () => {
            try{
                const res = await fetch(`https://location-selector.labs.crio.do/country=${selectedCountry}/states`);
                const data = await res.json();
                setStates(data);
                setSelectedState("");
                setCities([]);
                setSelectedCity("");
            } catch(error) {
                console.error("Error fetching data: ", error);
            }
        };
       getAllStates();
    
    }, [selectedCountry]);

    useEffect(() => {
        if(!selectedCountry || !selectedState) return;
        const getAllCities = async () => {
            try{   
                const res = await fetch(`https://location-selector.labs.crio.do/country=${selectedCountry}/state=${selectedState}/cities`);
                const data = await res.json();
                setCities(data);
                setSelectedCity("");
    
            } catch(error){
                console.error("Error fetching data: ", error)
            }
        };
        getAllCities();
    }, [selectedCountry, selectedState]);

/////final done
   

    return(
        <div className="State-Selector">
            <h1>State Selector</h1>
            <div className="dropdown">
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                    <option value="" disabled>Select a Country</option>
                    {countries.map((counrty) => <option key={counrty} value={counrty}>{counrty}</option>)}
                </select>
                
                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountry}>
                    <option value="" disabled>Select a State</option>
                    {states.map((state) => <option key={state} value={state}>{state}</option>)}
                </select>
                <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
                    <option value="" disabled>Select a City</option>
                    {Array.isArray(cities) && cities.map((city) => <option key={city} value={city}>{city}</option>)}
                </select>
            </div>
            {selectedCity && (
                <h3>
               You selected <span>{selectedCity}, {selectedState}, {selectedCountry}</span>
            </h3>
            )}


        </div>
    )
}

export default StateSelector;