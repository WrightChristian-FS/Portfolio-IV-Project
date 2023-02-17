import React from 'react';
import Button from './Button'

const Search = props => {
    return (
        <div className='search' style={styles.container}>

            <h2>Employee Search</h2> 
            <p style={styles.instructions}>Enter the Countries Abbriviation code : AU, BR, CA, GB, MX, US</p>

            <form
                style={styles.section}>
              
                {/* Input to get the country code requested by the user. This is explicitly limited to 2 characters  */}
                <input placeholder='US' value={props.employeeName} style={styles.input} maxLength='2' ></input>
                <Button buttonTitle="Search" buttonStyle={styles.button} />
            </form>
        </div>
    )
}

export default Search

const styles = {
    container: {
        // backgroundColor: '#F0F4EFF0F4EF',
        padding: '1rem',
        marginTop: '1rem', 
        marginBottom: '1rem',
        textAlign: 'center',
        fontSize: '2rem',
        textTransform: 'uppercase',
        color: '#85BAA1',
        // display: 'flex', 
        // flexDirection: 'colummn'
    },
    section: {
        display: 'flex',
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0rem',
        margin: '0rem'
    },
    dropdown: { 
        fontSize: '2rem', 
        marginTop: '1rem', 
    },
    input: {
        height: '2rem',
        width: '20%',
        fontSize: '1.5rem',
        border: 'none',
        borderRadius: '25px',
        paddingLeft: '1rem'
    },
    button: {
        alignSelf: 'center',
        padding: '.5rem',
        marginLeft: '1rem',
        borderRadius: '10px',
        backgroundColor: '#85BAA1',
        border: 'none',
        // color: 'white'
    }, 
    instructions: { 
        fontSize: '1.5 rem'
    }


}