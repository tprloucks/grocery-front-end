import React from 'react'

function Button(props) {
    return (
    <React.Fragment>
        <button onClick={() => props.clickFunc()} id={props.cssid}>
            {props.buttonName}
        </button>
    </React.Fragment>

    );
}
export default Button
