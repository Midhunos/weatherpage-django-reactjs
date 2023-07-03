import React from 'react'
import {AiOutlineArrowDown} from 'react-icons/ai'
import "./descriptions.css"


const Descriptions = ({weather,units}) => {
    const tempUnit =units==="metric"?"°C":"°F"
    // const windUnit =units === "metric"?"m/s":"m/h"
   
    const cards = [
        {
            id:1,
            title:"max",
            icon:<AiOutlineArrowDown/>,
            data: weather.temp_max.toFixed(),
            unit:tempUnit,
           
        },
        {
          id:2,
          title:"min",
          icon:<AiOutlineArrowDown/>,
          data: weather.temp_min.toFixed(),
          unit:tempUnit

        },
        {
          id:3,
          title:"feels like",
          icon:<AiOutlineArrowDown/>,
          data: weather.feels_like.toFixed(),
          unit:tempUnit
        },
        {
            id:4,
            title:"humidity",
            icon:<AiOutlineArrowDown/>,
            data: weather.humidity,
            unit:"%",
          },
        {
            id:5,
            title:"lat",
            icon:<AiOutlineArrowDown/>,
            data: weather.lat.toFixed(),
            unit:"°",

        },
        {
          id:6,
          title:"lon",
          icon:<AiOutlineArrowDown/>,
          data: weather.lon.toFixed(),
          unit:"°",
        }


    ]
  return (
    <div className='section section__description'>
        {cards.map(({id,icon,title,data,unit

        })=> 
         <div key={id} className="card">
        <div className="description__card-icon">
         {icon}
         <small>{title}</small>

        </div>
        <h2>{`${data}  ${unit}`}</h2>
    </div>
        )}
      
        
    </div>
  )
}

export default Descriptions;