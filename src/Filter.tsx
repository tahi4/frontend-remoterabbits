import './Filter.css'
import datas from './Datas'
import { useState, MouseEvent } from 'react'
import React from 'react';

// import Multiselect from 'multiselect-react-dropdown';

type FilterButtonProps = {
  text: string | number;
  active: boolean;
  onClick: (event: MouseEvent) => void;

};


export default function Filter({
  text,
  active,
  onClick
 
}: FilterButtonProps)
{



    return (

      <div>
         {/* <input type='checkbox' id='check' onClick={onClick}/> */}
        {/* <label>{text}</label> */}
        <li><input type='checkbox' onClick={onClick} className='space' id={text}/>
        <label htmlFor={text}><a>{text}</a></label>
        </li>
        {/* <option onClick={onClick}>{text}</option> */}

      </div>

      )
    
    
}


