import React from 'react';
import Button from './Button'
import   {useState} from 'react';
function Search(props){

    // Set the title and use state 
    const [title,setTitle] = useState('');

    // The function will instantite on a change 
    const handleChange =(event)=>{
        setTitle(event.target.value);
    };

    // When there is a submission (enter key or search button) prevent the default and pass the input data to the onCreate function 
    const handleSubmit =(event)=>{
     event.preventDefault();
       props.onCreate(title);  
    };
    return (
        <div className='search' style={styles.container}>

            <h2 style={styles.header}>Employee Search</h2> 
            <p style={styles.instructions}>Enter the Countries Abbriviation code : AU, BR, CA, GB, MX, US</p>

            <form
                style={styles.section}
                 onSubmit={handleSubmit}>

                <input onChange={handleChange} placeholder='US' value={title} style={styles.input} maxLength='2' ></input>
                <Button buttonTitle="Search" buttonStyle={styles.button}/>
            </form> 
        </div>
    )
}

export default Search

const styles = {
    container: {
        padding: '1rem',
        marginTop: '1rem', 
        marginBottom: '1rem',
        textAlign: 'center',
        fontSize: '2rem',
        textTransform: 'uppercase',
        color: '#E4FDE1',
    },
    section: {
        display: 'flex',
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
        backgroundColor: '#E4FDE1 ',
        border: 'none',
        width: '5rem', 
        height: '2.1rem', 
        fontWeight: '600', 
        textTransform: 'uppercase'
        // color: 'white'
    }, 
    header: { 
        letterSpacing: '.06rem'
    },
    instructions: { 
        fontSize: '1.5rem', 
        letterSpacing: '.04rem'
    }


}