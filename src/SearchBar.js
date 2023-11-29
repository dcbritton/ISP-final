import React, { useState, useRef } from 'react'
import XIcon from './img/x.svg'
import SearchIcon from './img/search.svg'
import FilterIcon from './img/filter.svg'

function SearchBar({SetSearchFilters}) {
    const [SelectedFilters, SetSelectedFilters] = useState([])
    // use a ref here to prevent an abysmal number or re-renders. it's just a state that doesn't cause re-renders
    // source: https://react.dev/reference/react/useRef
    const FilterValues = useRef({title: "", author: "", content: "", category: ""})

    const HandleDropdownSelect = (FilterType) => {
        if (!SelectedFilters.includes(FilterType)) {
            SetSelectedFilters([...SelectedFilters, FilterType]) // source: https://react.dev/reference/react/useState#updating-objects-and-arrays-in-state
            FilterValues.current[FilterType] = '' // <--- this .current in an object (the one defined above) with attributes of the defined filters
        }
    }

    const UpdateFilterValue = (FilterType, value) => {
        FilterValues.current[FilterType] = value
    }

    const RemoveFilter = (FilterType) => {
        SetSelectedFilters(SelectedFilters.filter(filter => filter !== FilterType)) // this looks terrible i know
        FilterValues.current[FilterType] = ""
    }

    const HandleSearch = () => {
        // since js objects are references, and react state re-renders are shallow checks,
        // need to make a new object out of FilterValues.current with the spread operator
        SetSearchFilters({...FilterValues.current})
    }

    return (
        <>
            <span className="SearchBar">
                {SelectedFilters.map(FilterType => (
                    <div key={FilterType} className="FilterGroup">
                        <div className="Filter">
                            <button className="FilterXButton" onClick={() => RemoveFilter(FilterType)}>
                                <img src={XIcon} alt=''/>
                            </button>
                            {FilterType}:
                        </div>
                        <span
                            contentEditable="true"
                            className="SubInput"
                            onInput={e => UpdateFilterValue(FilterType, e.target.textContent)}
                            type="text"
                        >
                            {FilterValues.current[FilterType]}
                        </span>
                    </div>
                ))}
            </span>
            <div className="FilterDropDown">
                <img className="SearchIcon" src={FilterIcon} alt=""/>
                <div className="dropdown-options">
                    <div className='dropdown-option' onClick={() => HandleDropdownSelect('author')}>author</div>
                    <div className='dropdown-option' onClick={() => HandleDropdownSelect('title')}>title</div>
                    <div className='dropdown-option' onClick={() => HandleDropdownSelect('content')}>content</div>
                    <div className='dropdown-option' onClick={() => HandleDropdownSelect('category')}>category</div>
                </div>
            </div>
            <button className='BlogCardButton' onClick={HandleSearch}><img src={SearchIcon} alt=''/></button>
        </>
    );
}

export default SearchBar;
