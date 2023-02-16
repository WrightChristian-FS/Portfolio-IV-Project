import React from 'react';
import Button from './Button'

const Search = props => {
    return (
        <div className='search' style={styles.container}>

            <p>Contact Search</p>

            <form
                style={styles.section}
                onSubmit={props.buttonClicked}>

                <input placeholder='John Doe' value={props.employeeName} onChange={props.getInput} style={styles.input} ></input>
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
        marginBottom: '1rem',
        textAlign: 'center',
        fontSize: '2rem',
        textTransform: 'uppercase',
        color: '#85BAA1',
    },
    section: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0rem',
        margin: '0rem'
    },
    input: {
        height: '2rem',
        width: '40%',
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
    }
}