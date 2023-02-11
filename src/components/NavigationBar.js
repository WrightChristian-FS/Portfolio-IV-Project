import React from 'react';

const Navigation = () => {
    return (
        <div className='navigation' >
            <h1 style={styles.container}>User Database </h1>
        </div>
    )
}

export default Navigation

const styles = {
    container: {
        backgroundColor: '#0D1821',
        height: '5vh',
        width: '100vw',
        margin: '0rem', 
        padding: '.5rem',
        alignContent: 'center', 
        color: 'white', 
        fontFamily: 'Roboto', 
        fontWeight: '500', 
        textTransform: 'uppercase', 
        letterSpacing: '.2rem', 
        // textAlign: 'center'
        
    },
}
