import React, { Component } from 'react';
import Navigation from './components/NavigationBar';
import UserData from './components/User'
import Search from './components/Search';

class App extends Component {
  state = {
    userData: [],
    isLoaded: true
  }

  componentDidMount() {
    const profile = this.state.isLoaded
    if (profile) {
      this.fetchData()
    } else {
      console.log("Did not load User data")
    }
  }

  // Call the api
  fetchData() {
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
  }

  render() {
    const { isLoaded, userData } = this.state
    return (
      <div style={styles.container}>
        <section>
          <Navigation />
        </section>
        <section>
          <Search />
        </section> 
        <section style={styles.section}>
          {/* Map the data that was returned from the API */}
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
    backgroundColor: '#344966',
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
    background: '#344966', 
    
  }

}