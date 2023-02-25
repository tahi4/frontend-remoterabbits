import './JobListing.css'
// import Logo from '/Untitled 5.png'
// import datas from './Datas'

function JobListing(prop){


    let location;
    if (Array.isArray(prop.location)) {
      location = prop.location.join(', ');
    } else {
      location = prop.location;
    }


    let link;
    prop.link ? link = prop.link : link = prop.s_link
    
    return(
        <div className='job--listing'>
         
         
            <div className='job--listing--card'>
                <a href={link} target="_blank">
                <div className='job--card'>

                    <div className='company--info'>

                        <img src={prop.logo}/>
                        <p>{prop.company}</p>
                    
                    </div>
              
                    {/* <p>{prop.source}</p> */}
    
                 </div>
                
                <div className='job--details'>

                    <p>{prop.title}</p>
                    <div className='filters'>

                        <p> {location} </p>
                        <p>| {prop.jobtype} </p>
                        <p>| {prop.category} </p>
               
                     </div>
             
                </div>
                </a>
            </div>

        </div>
    
        )

}

export default JobListing

