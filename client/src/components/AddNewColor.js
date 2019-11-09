import React, { useState } from 'react';
import api from "../utils/api";

function AddNewColor(props) {

    const [hex, setHex] = useState({
        hex: ""
    });
    const [color, setColor] = useState(  {
        color: "",
        code: {
            hex: ""
        },
        id: Date.now()});

    const changeHandler = (event) => {
        setColor({
            ...color,
            [event.target.name]: event.target.value
        })
    };

    const hexHandler = (event) => {
        setHex({
            ...hex,
            [event.target.name]: event.target.value
        })
    };

    const submitHandler = (event) => {
        event.preventDefault();

        setColor({
            ...color,
            [color.code.hex]: hex
        });

        api()
            .post("/api/colors", color)
            .then(result => {
                props.history.push("/bubbles");
            })
            .catch(error => {
                console.log(error);
            });
    };
console.log(color);
    return (
        <div>
            <form className="add-form" onSubmit={submitHandler} >
                <h1>Add New Color</h1>
                <input className="input" type="text" name="color" value={color.color} placeholder="Color Name" onChange={changeHandler} />
                <input className="input" type="text" name="hex" value={hex} placeholder="Hex Value of Color" onChange={hexHandler} />
                <button className="button" type="submit" >Add Color</button>
            </form>
        </div>
    )
}

export default AddNewColor;