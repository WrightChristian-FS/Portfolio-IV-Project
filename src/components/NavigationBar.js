import React from 'react';
import {Link} from 'react-router-dom'; 

const Navigation = () =>{
    return(
        <nav style={styles.container}>
            <h1 style={styles.navHeader}>Offices</h1>
            {/* <Link to='/home' style={styles.links}>Home</Link> */}
            <Link to='/united states' style={styles.links}>Unites States</Link>
            <Link to='/brazil' style={styles.links}>Brazil</Link>
            <Link to='/canada' style={styles.links}>Canada</Link>
            <Link to='/mexico' style={styles.links}>Mexico</Link>
        </nav>
    )
}

export default Navigation

const styles = {
    container: {
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: '#0D1821',
        height: '100vh', 
        width: '15%', 
    },
    links: { 
        color: 'white', 
        textDecoration: 'none', 
        paddingLeft: '1rem',
        paddingTop: '1rem', 
        fontSize: '1.3rem', 
        letterSpacing: '.1rem'
    }, 
    navHeader: { 
        paddingLeft: '1rem',
        color: '#6290C3 ', 
        letterSpacing: '.2rem'
    }
}
