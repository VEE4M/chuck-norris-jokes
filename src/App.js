import { ListItemSecondaryAction } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import StorageStack from './StorageStack';
import SimplePaper from './SimplePaper';
const axios = require('axios');
function App() {

  const [currentJoke, setCurrentJoke] = useState("")
  const [isTimeToUpdate, setIsTimeToUpdate] = useState(true)
  const [isEmptyStorage, setIsEmptyStorage] = useState(true)
  const [jokes, setJokes] = useState([])
  const storage = window.localStorage;
  let lastSavedId = 0

  const getLastId = () => {
    return Object.keys(storage).length
  }
  lastSavedId = getLastId()


  const updateJokesList = (newJoke) => {
    console.log("updateJokesList")
    storage.setItem(lastSavedId + 1, newJoke)
    setJokes(getOrderedListOfJokes())
  }

  const displayJoke = (str) => {
    let current = 1
    let timePerLetter = 5000 / str.length
    let interval = setInterval(() => {
      setCurrentJoke(str.slice(0, current))
      current++
      if (current > str.length) {
        clearInterval(interval)
      }
    }, timePerLetter)
  }

  const getOrderedListOfJokes = () => {
    let orderedListOfJokes = []
    let keys = Object.keys(storage)
    keys = keys.sort((a, b) => a - b)
    for (let i of keys) {
      orderedListOfJokes.unshift(storage[i])
    }
    setJokes(orderedListOfJokes)
    return orderedListOfJokes
  }

  const getJokeFromStorage = () => {
    console.log("getJokeFromStorage")
    let randomJoke = ""
    do {
      randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
    } while (randomJoke === currentJoke && jokes.length > 1)
    return randomJoke
  }

  useEffect(() => {
    if (isTimeToUpdate) {
      let joke = ""
      const fetchData = async () => {
        try {
          let response = await axios.get('https://api.chucknorris.io/jokes/random')
          if (Object.values(storage).includes(response.data.value)) {
            fetchData()
          } else {
            joke = response.data.value
            updateJokesList(joke)
            setIsEmptyStorage(false)
          }
        } catch (error) {
          if (storage.length > 0) {
            joke = getJokeFromStorage()
          }
          console.log(error);
        } finally {
          displayJoke(joke)
          setIsTimeToUpdate(false)
        }
      }
      fetchData();
    }
  }, [isTimeToUpdate]);

  const clearStorage = () => {
    storage.clear()
    setJokes(Object.values(storage))
    setIsEmptyStorage(true)
  }

  return (
    (<div>
      <Timer setIsTimeToUpdate={setIsTimeToUpdate} />
      <SimplePaper vitsi={currentJoke} />
      <div class="center">
        <button disabled={isEmptyStorage} onClick={() => clearStorage()}>Poista tallennetut</button>
      </div>
      <StorageStack vitsit={jokes} />
    </div>)
  );

}

export default App;
