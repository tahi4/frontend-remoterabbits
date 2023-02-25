import './MainPage.css'
import FilterButton from './Filter'
import JobListing from './JobListing'
import { useState, useEffect } from 'react'
import React from 'react';



function MainPage(){


  // to get rid of type error in flatMap
  interface Data { 
    location: string;
    category: string;
    jobtype: string;
  }

  // GETTING DATA
  const [datas, setData] = useState<Data[]>([])

  useEffect(()=>{
    fetch('https://web-production-a397.up.railway.app/').then(
      res=> (res).json()
             
    ).then(
      data=>{
        setData(data)
        // console.log(data)
 
      }
    )
  }, [])

  // FILTERING LOGIC

  enum Group {
    LOCATION = 'location',
    JOBTYPE ='jobtype',
    CATEGORY ='category'
  }

  type Filter = {
    name: string | number;
    group: Group;
    fnc: Function;
  };

  const [filters, setFilters] = useState<Filter[]>([]);

  // SO THAT FILTERS HAVE ONLY UNIQUE NAMES && FLATMAP SEPERATES LOCATION ARRAYS TO BE DIFFERENT VALUES

  const locations = [...new Set(datas.flatMap(q => q.location))];
  const categories = [...new Set(datas.flatMap(q => q.category))];
  const jobtypes = [...new Set(datas.flatMap(q => q.jobtype))];


  console.log(typeof datas);

  function filterExists(name: string | number, group: Group) {
    return (
        filters.find((f) => f.name === name && f.group === group) !== undefined
  );
}
      

  function addFilter(name: string | number, group: Group, fnc: Function) {
        setFilters((currentFilters) => [...currentFilters, { name, group, fnc }]);

}


function removeFilter(name: string, group: Group) {
  setFilters((currentFilters) =>
      currentFilters.filter((f) => !(f.name === name && f.group === group))
  );
}
      

function toggleFilter(name: string | number, group: Group, fnc: Function) {
   if (filterExists(name, group)) {
       removeFilter.apply(null, arguments);
   } else {
       addFilter.apply(null, arguments);
   }
}   


function isShownByFilter(databases, filters: Filter[], grouping){
  
  const neutralFilters = filters.filter((filter) => filter.group === grouping);
  if (!neutralFilters.length) return true;  //returns all data, if there are no filters

  if (!Array.isArray(databases.location)) {
    return neutralFilters.some((filter) => filter.fnc(databases));
  } //if location, doesnt have an array of values, just filter like normal 

  return databases.category.some(location => 
    neutralFilters.some((filter) => filter.fnc({ ...databases, location })) // if it does have an array, include those. 
  );
}


function applyFilters(databases, filters: Filter[]) {
    return databases.filter((data) => {
      const showByLocation = isShownByFilter(data, filters, Group.LOCATION);
      const showByCategory = isShownByFilter(data, filters, Group.CATEGORY);
      const showByJobType = isShownByFilter(data, filters, Group.JOBTYPE);

        
      return showByLocation && showByCategory && showByJobType
              

        });
      
    }
      

    return(


        <div className='MainPage'>

<div className='arranging--filters'> 

{/* FILTERS */}

<div className='column'>

<label htmlFor='location'><span>Location <i className="arrow down"></i></span></label>   
<input type="checkbox" id="location"/> 

<ul className="slide">
    
        {locations.map((l, index) => (
            <FilterButton
              key={index}
              text={l}
              active={filterExists(l, Group.LOCATION)}
              onClick={() => toggleFilter(l, Group.LOCATION, (d) => d.location === l)}
            />

    ))}



</ul>

</div>


<div className='column'>

<label htmlFor='category'><span>Category <i className="arrow down"></i></span></label>   
<input type="checkbox" id="category"/> 

<ul className="slide">
    
        {categories.map((c, index) => (
            <FilterButton
              key={index}
              text={c}
              active={filterExists(c, Group.CATEGORY)}
              onClick={() => toggleFilter(c, Group.CATEGORY, (d) => d.category === c)}
            />

    ))}



</ul>

</div>

<div className='column'>

<label htmlFor='jobtype'><span>Job Type<i className="arrow down"></i></span></label>   
<input type="checkbox" id="jobtype"/> 

<ul className="slide">

    

        {jobtypes.map((j, index) => (
            <FilterButton
              key={index}
              text={j}
              active={filterExists(j, Group.JOBTYPE)}
              onClick={() => toggleFilter(j, Group.JOBTYPE, (d) => d.jobtype === j) }
   />
    ))}
 
 
</ul>

</div>

{/* <div className='column'></div> */}


</div>

        {/* Job Listing Posted */}
        {applyFilters(datas, filters).map(function(data, index){
        return (
            // we put the values inside our card component
        <JobListing 

         key={index}
         company={data.company}
         title={data.title}
        //  date={data.date}
        location={Array.isArray(data.location) ? data.location.flatMap(loc => loc) : data.location}
       
         link={data.link}
        //  logo ={data.logo}
         category={data.category}
        // category={Array.isArray(data.category) ? data.category.flatMap(loc => loc) : data.category}
         jobtype={data.jobtype}
         source={data.source}
         s_link={data.s_link}
        />
       
        )
        })}

        </div>
    )
}

export default MainPage



