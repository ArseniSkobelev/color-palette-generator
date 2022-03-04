import React, { useEffect, useState } from 'react'
import Button from './Button'

export default function ColorPalette() {
    const [generateClicked, setGenerateClicked] = useState(false)
    const [apiAnswer, setApiAnswer] = useState({})
    let arrayOfColors = []
    let [data, setData] = useState()


    const CreateCubes = ({colorArray}) => (
        <div>
            {arrayOfColors.map(function (colorArray, i) {
                console.log("no")
                return <div style={{background: arrayOfColors[i]}} className={`w-[100px] h-[100px] m-2`} key={i}></div>
            })}
        </div>
    );
    
    
    useEffect(() => {
        fetch("https://www.thecolorapi.com/scheme?hex=24B1E0&mode=triad&count=6")
        .then(res => res.json())
        .then(
            (result) => {
                setApiAnswer(result.colors)
                // console.log(result.colors)
                for (let index = 0; index < apiAnswer.length; index++) {
                    // console.log(apiAnswer[index].hex.value)
                    arrayOfColors.push(apiAnswer[index].hex.value);
                }
                setData(arrayOfColors)
            },
            (error) => {
                console.log(error)
            }
            )
    
      return () => {
        
      }
    }, [generateClicked])
    
    return (
    <div className='pb-8 pt-8 h-full flex justify-center items-center flex-col'>

        {/* Header */}
        <h1 className='text-2xl text-center'>
            Color Palette Generator
        </h1>

        {/* Color display */}
        <div className='flex justify-center items-center flex-row flex-wrap py-20'>
            <div className='bg-gray-500 w-[100px] h-[100px] m-2'></div>
            {data.map(function (data, i) {
                return <div style={{background: data[i]}} className={`w-[100px] h-[100px] m-2`} key={i}></div>
            })}
        </div>

        {/* Button */}
        <div className='flex justify-center items-center'>
            <Button onClick={() => setGenerateClicked(!generateClicked)} text="Generate" />
        </div>
    </div>
  )
}
