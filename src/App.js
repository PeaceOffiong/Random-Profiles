import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

const App = () => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [value, setValue] = useState("random person");
  const [title, setTitle] = useState("name");

  const fetchData = async() => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const presentPerson = data.results[0];
      setLoading(false);
      console.log(presentPerson);
      const { gender, dob, email, location, login, cell, picture} = presentPerson;
      const { age } = dob;
      const { title, first, last } = presentPerson.name
      const { city, country, street } = location;
      const { large: image } = picture
      const { password } = login;
      const { name, number } = street;
      console.log(street)
      const nperson = {
        image,
        name: `${title}. ${first} ${last}`,
        email,
        age,
        street: `${name}, ${number}, ${city}, ${country}`,
        phone: cell,
        password
      }
      setPerson(nperson);
      setValue(nperson.name)

    } catch (error) {
      console.error("Data not loaded");
      setLoading(false);
    }
  }
  
useEffect(() => {
  fetchData();
}, [])
  const handleValue = (e) => {
    e.preventDefault()
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      setValue(person[newValue])
      setTitle(newValue);
    }
  }
  
  if (loading) {
    return <section>
      <h3>Loading...</h3>
    </section>
  }

  return <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img
            src={(person && person.image) || defaultImage}
            alt='random user'
            className='user-img'
          />
          <p className='user-title'>My {title} is</p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
            <button
              className='icon'
              data-label='name'
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className='icon'
              data-label='email'
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className='icon' data-label='age' onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className='icon'
              data-label='street'
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className='icon'
              data-label='phone'
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className='icon'
              data-label='password'
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className='btn' type='button' onClick={fetchData}>
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main>
}

export default App
