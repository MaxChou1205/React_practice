import React from 'react';

const useroutput = (props) =>
{
    return (
        <div className="UserOutput">
            <p>User Name: {props.name}</p>
            <p>User Age: {props.age}</p>
        </div>
    )
}

export default useroutput;