import React from 'react';

const Search = () => {
    return (
        <div className='search' style={styles.container}>
            <p>Contact Search</p>
            <input placeholder='John Doe' style={styles.input}></input>
        </div>  
    )
}

export default Search

const styles = { 
    container: {
        // backgroundColor: '#F0F4EFF0F4EF',
        padding: '1rem', 
        marginBottom: '1rem',
        textAlign: 'center', 
        fontSize: '2rem', 
        textTransform: 'uppercase', 
        color: '#85BAA1'
    }, 
    input: { 
        height: '2rem',
        width: '40%', 
        border: 'none',
        borderRadius: '25px', 
        paddingLeft: '1rem'
    }
}