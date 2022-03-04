import React, { useEffect, useState } from 'react'
import Button from './Button'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

var randomHexColor = require('random-hex-color')

export default function ColorPalette() {
    // states
    const [mode, setMode] = useState('')
    
    const [arrayOfColors, setColors] = useState([])
    
    // variables
    let fetchMode = '';
    
    let fetchLink = '';
    
    let randomHex = randomHexColor();
    
    let newMode;
    
    let colorsArr = ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000"]
    
    
    // dropdown options
    const options = [
        'Monochrome', 
        'Monochrome dark', 
        'Monochrome light', 
        'Analogic',
        'Complement',
        'Analogic complement',
        'Triad',
        'Quad'
    ];
    
    const defaultOption = options[0];
    
    // functions
    const handleChange = (e) => {
        setMode(e.value);
    }

    // button onClick; get mode from dropdown, get full fetch link and fetch api
    const changeState = () => {
        newMode = mode.toLowerCase().split(' ').join('-');
        fetchMode = newMode;
        fetchLink = `https://www.thecolorapi.com/scheme?hex=${randomHex.substring(1)}&mode=${fetchMode}&count=6`
        getColors()
    }
    
    // main fetch function
    const getColors = () => {
        // clear array each time the function is called
        colorsArr = [];

        // fetch api (www.thecolorapi.com) with the link that was created before
        fetch(fetchLink)
        .then(res => res.json())
        .then(
            (result) => {
                // loop through the colors returned by the api
                for (let index = 0; index < result.colors.length; index++) {
                    // add each color to the array
                    colorsArr.push(result.colors[index].hex.value)
                }

                // set the state to the array value
                setColors(colorsArr);
            },
            (error) => {
                // console log if there are any errors
                console.log(error)
            }
        )

    }

    
    return (
    <div className='h-full flex justify-center items-center flex-col'>

        {/* Header */}
        <div>
            <h1 className='text-2xl text-center font-medium'>
                Color Palette Generator
            </h1>
        </div>

        {/* Mode choice dropdown */}
        <div className='pt-4'>
            <h2 className='text-center mb-1'><i>Choose palette mode</i></h2>
            <Dropdown options={options} onChange={handleChange} value={defaultOption} placeholder="Select an option" />
        </div>

        {/* Color display */}
        <div className='flex justify-center items-center flex-row flex-wrap py-5'>
            { 
                colorsArr.map(function (data, i) {
                    return <div style={{background: arrayOfColors[i]}} className={`w-[100px] h-[100px] m-2`} key={i}></div>;
                })
            }
        </div>


        {/* Button */}
        <div className='flex justify-center items-center'>
            <Button onClick={changeState} text="Generate" />
        </div>
    </div>
  )
}
