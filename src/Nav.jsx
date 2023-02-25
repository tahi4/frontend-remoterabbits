import './Nav.css'
import Logo from '/Untitled 5.png'




function Nav() {

  return (
   <div className='Nav'>

        <div className='Nav--items'>

          <img src={Logo}/>
          <div className='Nav--buttons'>
           <button> <a href='mailto:remoterabbits@gmail.com' target="_blank">Contact Us</a></button>
           {/* <button></button> */}
          </div>
  
        </div>
   
   </div>
   
  )
}

export default Nav