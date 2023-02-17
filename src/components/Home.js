import React from 'react'; 

function Home() { 
    return(
        <section style={styles.container}>
            <h1 >Employee List</h1>
            <p>Please select an office location to view the employees in that location</p>
        </section>
    )
}

export default Home;

const styles = {
    container: { 
        color: 'white', 
        textAlign: 'center', 
        width: '100vw', 

    },
}
