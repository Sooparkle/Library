import React from 'react';

interface ReasultSearchBarProps{
  setSearch : (search : string ) => void;
  search : string

}


export const ReasultSearchBar :React.FC<ReasultSearchBarProps> = ({setSearch, search}) =>{

  return(
    <div>
      <form>
        <label >
          결과 내 검색 : {' '}
          <input 
            type='text'
            value={search}
            onChange={e=>setSearch(e.target.value)}
          /> 
        </label>
      </form>
    </div>
  )
}