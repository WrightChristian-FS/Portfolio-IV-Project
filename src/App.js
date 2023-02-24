import React, { Component } from 'react';
import UserData from './components/User'
import Search from './components/Search';

class App extends Component {
  state = {
    userData: [],
    isLoaded: true
  };

  // Fetch data will return generic data that does not filter the results by nationality 
  fetchData(search) {
    fetch('https://randomuser.me/api/?results=20')
      .then(response => response.json())
      .then(responseJSON => responseJSON.results.map(user => ({
        // set the user data 
        userName: `${user.login.username}`,
        firstName: `${user.name.first}`,
        lastName: `${user.name.last}`,
        street: `${user.location.street.number}`,
        streetName: `${user.location.street.name}`,
        city: `${user.location.city}`,
        state: `${user.location.state}`,
        zipCode: `${user.location.postcode}`,
        email: `${user.email}`,
        phone: `${user.cell}`,
        picture: `${user.picture.medium}`,
      }
      )))
      .then(userData => this.setState({
        userData,
        isLoaded: false
      }))
      .catch(err => console.log(err))
  };

  // This function fetchNatData will return the data for a specific country 
  fetchNatData(search) {

    // Set a variable to add the prefex to call the nationality filter 
    let requestedCountry = "nat="

    fetch('https://randomuser.me/api/?' + requestedCountry + search)
      .then(response => response.json())
      .then(responseJSON => responseJSON.results.map(user => ({
        // set the user data 
        userName: `${user.login.username}`,
        firstName: `${user.name.first}`,
        lastName: `${user.name.last}`,
        street: `${user.location.street.number}`,
        streetName: `${user.location.street.name}`,
        city: `${user.location.city}`,
        state: `${user.location.state}`,
        zipCode: `${user.location.postcode}`,
        email: `${user.email}`,
        phone: `${user.cell}`,
        picture: `${user.picture.medium}`,
      }
      )))
      .then(userData => this.setState({
        userData,
        isLoaded: false
      }))
      .catch(err => console.log(err))
  };

  // Confirm that the component did mount => Create a if statement to decide if the API should return generic data or country specific data 
  componentDidMount(search) {

    // If the user input does not equal 2 characters, then request the API for generic data 
    if (String(search).length != 2) {
      this.fetchData(search)
    } else {
      // If the input has 2 charcaters then request a country specific user.
      this.fetchNatData(search)
    }

  }

  render() {
    // Set the state 
    const { isLoaded, userData } = this.state;

    // This function will take the input and pass it to the component Did mount for the completeion of the API fetch data 
    const SearchUser = (search) => {

      this.componentDidMount(search);
    }

    return (
      <div style={styles.container}>
   
        <section>
          <Search onCreate={SearchUser} />
        </section>
        <section style={styles.section} >
          {/* Map the user data returned from the API */}
          {!isLoaded && userData.length > 0 ? userData.map(user => {
            const { userName, firstName, lastName, street, streetName, city, state, zipCode, email, phone, picture } = user;
            return <UserData
              key={userName}
              picture={picture}
              firstName={firstName}
              lastName={lastName}
              email={email}
              street={street}
              streetName={streetName}
              city={city}
              state={state}
              zipCode={zipCode}
              phone={phone}
            />
          }) : null
          }
        </section>
      </div>
    )
  }

}
export default App;

const styles = {
  container: {
    backgroundColor: '#29335C',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',

  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    height: '100%',
    width: '100vw',
    overflow: 'scroll',
    background: '#29335C',

  }

}