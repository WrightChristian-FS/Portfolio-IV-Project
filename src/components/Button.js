import React from 'react';


const Button = props => {
    return (
        <header >
                  <button style={props.buttonStyle} onClick={props.onClick}>{props.buttonTitle}</button>  
        </header>
    )
}

export default Button