import React from "react";
import { filterData } from "../data/filterData";

interface FilterBarProps {
  id : number;
  category : string;
  isChecked : boolean;
  handleFilter : () => void
}

export const FilterBar:React.FC<FilterBarProps> = ({id, category, isChecked, handleFilter}) =>{


  return(

    <li 
    >
      <input 
        type="checkbox"
        id={category}
        checked={isChecked}
        onChange={()=>handleFilter()}
        />
    <label htmlFor={category}>
      {category}
    </label>
  </li>


  )
}