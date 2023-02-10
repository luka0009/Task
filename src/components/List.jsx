import "../App.css";
import React, { useState, useEffect } from "react";

export default function List() {
  const [characters, setCharacters] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedCharacher, setSelectedCharachter] = useState({});
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(3);
  const [films, setFilms] = useState([]);
  const [species, setSpecies] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showfilms, setShowFilms] = useState(false);
  const [showspecies, setShowSpecies] = useState(false);
  const [showstarships, setShowStarships] = useState(false);
  const [showvehicles, setShowVehicles] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  //  fetching data from the api for the charachters
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://swapi.dev/api/people`);
      const data = await res.json();
      setCharacters(data.results);
    }
    fetchData();
  }, []);


  // fetching data for the details of the charachters
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://swapi.dev/api/people`);
      const data = await res.json();
      setCharacters(data.results);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData(endpoint, setter) {
      if (selectedCharacher[endpoint]) {
        const dataPromises = selectedCharacher[endpoint].map(async (item) => {
          const res = await fetch(item);
          const data = await res.json();
          return data;
        });
        const data = await Promise.all(dataPromises);
        setter(data);
      }
    }

    fetchData("films", setFilms);
    fetchData("species", setSpecies);
    fetchData("starships", setStarships);
    fetchData("vehicles", setVehicles);
  }, [selectedCharacher]);


  // filtering charachters list for searching
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1 className="text-[30px] mt-[50px] ml-[30px] text-center">List Of Charachters</h1>
      <div className="mt-[50px] ml-[70px] mx-auto text-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name"
        />
      </div>
      <div className="mt-[-50px] ml-[50px] flex justify-center gap-12 scale-150">
        {
            // button to navigate between pages
            // if it's the first page it's disabled
          <button
            disabled={secondIndex <= 3}
            className="text-[40px]"
            onClick={() => {
              setFirstIndex((prev) => prev - 3);
              setSecondIndex((prev) => prev - 3);
            }}
          >{`<`}</button>
        }
        <div className="flex justify-center items-center border-4 border-emerald-400 p-4 h-fit my-44">
          <ul className="list-none p-0">
            {
            // mapping over filteredCharachters to create a list
            filteredCharacters
              .slice(firstIndex, secondIndex)
              .map((character, index) => (
                <li key={index} className="relative my-4 flex justify-between">
                  <span> {character.name}</span>
                  {!show && (
                    <button
                      onClick={() => {
                        setShow((prevShow) => !prevShow);
                        setSelectedCharachter((prevSelectedCharachter) => ({
                          ...prevSelectedCharachter,
                          ...character,
                        }));
                      }}
                      className="bg-blue-400 px-2 rounded-md ml-9 z-1"
                    >
                      See the details
                    </button>
                  )}
                  {
                  // this details modal will be showed conditionally if show === true  
                 
                  show && selectedCharacher.name === character.name && (
                    <div className="min-w-[380px] text-left top-[-230px] left-[70px] pl-3 h-fit absolute scale-[0.7]  z-99 bg-slate-800 text-blue-500 text-[14px] pb-7 pt-2">
                      <button
                        onClick={() => setShow((prevShow) => !prevShow)}
                        className="bg-red-600 px-2 text-white text-center text-lg"
                      >
                        x
                      </button>
                      <br />
                      <br />
                      <div>
                        <span className="block">
                          {" "}
                          {selectedCharacher.name} height -{" "}
                          {selectedCharacher.height}
                        </span>
                        <span className="block">
                          {" "}
                          {selectedCharacher.name} hair color -{" "}
                          {selectedCharacher.hair_color}
                        </span>
                        <span className="block">
                          {" "}
                          {selectedCharacher.name} skin color -{" "}
                          {selectedCharacher.skin_color}
                        </span>
                        <span className="block">
                          {" "}
                          {selectedCharacher.name} eye color -{" "}
                          {selectedCharacher.eye_color}
                        </span>
                        <span className="block">
                          {" "}
                          {selectedCharacher.name} gender -{" "}
                          {selectedCharacher.gender}
                        </span>
                        <br />
                        <br />
                        <span className="block">Films:</span>
                        {
                        // Complex data, like (films, species, starships and vehicles) 
                        // are hidden by default and presented on user action.
                        showfilms ? (
                          <ul>
                            {films.length > 0 ? (
                              films.map((film, index) => (
                                <li key={index} className="block">
                                  {film.title}
                                </li>
                              ))
                            ) : (
                              <p className="text-red-500">No Items</p>
                            )}
                            <button
                              onClick={() => setShowFilms(false)}
                              className="absolute right-1 mt-[-21px] bg-green-400 text-black px-2 text-[14px]"
                            >
                              {" "}
                              Close{" "}
                            </button>
                          </ul>
                        ) : (
                          <button
                            onClick={() => {
                              setShowFilms(true);
                              setShowSpecies(false);
                              setShowStarships(false);
                              setShowVehicles(false);
                            }}
                            className="absolute right-1 mt-[-21px] bg-green-400 text-black px-2 text-[14px]"
                          >
                            {" "}
                            See Films{" "}
                          </button>
                        )}

                        <br />
                        <br />
                        <span className="block">Vehicles:</span>
                        {showvehicles ? (
                          <ul>
                            {vehicles.length > 0 ? (
                              vehicles.map((vehicle, index) => (
                                <li key={index} className="block">
                                  {vehicle.name} - {vehicle.model}
                                </li>
                              ))
                            ) : (
                              <p className="text-red-500">No Items</p>
                            )}
                            <button
                              onClick={() => setShowVehicles(false)}
                              className="absolute right-1 mt-[-21px] bg-green-400 text-black px-2 text-[14px]"
                            >
                              {" "}
                              close{" "}
                            </button>
                          </ul>
                        ) : (
                          <button
                            onClick={() => {
                              setShowVehicles(true);
                              setShowFilms(false);
                              setShowSpecies(false);
                              setShowStarships(false);
                            }}
                            className="absolute right-1 mt-[-21px] bg-green-400 text-black px-2 text-[14px]"
                          >
                            {" "}
                            See vehicles{" "}
                          </button>
                        )}
                        <br />

                        <span className="block">Starships:</span>
                        {showstarships ? (
                          <ul>
                            {starships.length > 0 ? (
                              starships.map((starship, index) => (
                                <li key={index} className="block">
                                  {starship.name} - {starship.model}
                                </li>
                              ))
                            ) : (
                              <p className="text-red-500">No Items</p>
                            )}
                            <button
                              onClick={() => setShowStarships(false)}
                              className="absolute right-1 mt-[-21px] bg-green-400 text-black px-2 text-[14px]"
                            >
                              {" "}
                              close{" "}
                            </button>
                          </ul>
                        ) : (
                          <button
                            onClick={() => {
                              setShowStarships(true);
                              setShowFilms(false);
                              setShowSpecies(false);
                              setShowVehicles(false);
                            }}
                            className="absolute right-1 mt-[-21px] bg-green-400 text-black px-2 text-[14px]"
                          >
                            {" "}
                            See Starships{" "}
                          </button>
                        )}
                        <br />

                        <span className="block">Species:</span>
                        {showspecies ? (
                          <ul>
                            {species.length > 0 ? (
                              species.map((item, index) => (
                                <li key={index} className="block">
                                  {item.name} - {item.classification}
                                </li>
                              ))
                            ) : (
                              <p className="text-red-500">No Items</p>
                            )}
                            <button
                              onClick={() => setShowSpecies(false)}
                              className="absolute right-1 mt-[-21px] bg-green-400 text-black px-2 text-[14px]"
                            >
                              {" "}
                              close{" "}
                            </button>
                          </ul>
                        ) : (
                          <button
                            onClick={() => {
                              setShowSpecies(true);
                              setShowFilms(false);
                              setShowStarships(false);
                              setShowVehicles(false);
                            }}
                            className="absolute right-1 mt-[-21px] bg-green-400 text-black px-2 text-[14px]"
                          >
                            {" "}
                            See Species{" "}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
        {
// this is identical to the first button component
// but if it's last page it's disabled
          <button
            disabled={secondIndex >= 10}
            className="text-[40px]"
            onClick={() => {
              setFirstIndex((prev) => prev + 3);
              setSecondIndex((prev) => prev + 3);
            }}
          >{`>`}</button>
        }
      </div>
    </>
  );
}
