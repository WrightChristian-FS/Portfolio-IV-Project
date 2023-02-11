import React from 'react';

const UserData = props => {
    return (

            <main style={styles.card}>
                <header >
                    <img src={props.picture} alt="Contact Pictrue"  />
                    <p >{props.firstName} {props.lastName}</p>
                </header>
 
                <section style={styles.section}>
                    <p >{props.email}</p>
                </section>
                <section>
                    <h2 >Contact Information</h2>
                    <p >{props.phone}</p> 
                    <p >{props.street} {props.streetName} </p>
                    <p >{props.city} {props.state} {props.zipCode}</p>
                </section>
            </main>

    )
}

export default UserData

const styles = { 
    card: { 
        backgroundColor: '#498467', 
        padding: '1.5rem',
        marginLeft: '2rem',
        marginTop: '2rem',
        marginBottom: '2rem',
        minWidth: '15%', 
        // height: '40%', 
        borderRadius: '5px',
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;", 
    }, 
    picture: { 

    }
         
        
    
}