import React from 'react'
import {useNavigate} from 'react-router-dom'
function Home() {
  const navigate=useNavigate()
  return (
    <>
        <div style={{paddingLeft:'30px',paddingTop:'10px',backgroundColor:'#0047AB',color:'white',height:'65px',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center'}}>
              <p onClick={()=>navigate('/')} style={{fontSize:'20px',marginRight:'30px',fontWeight:'bold'}}>ASSESSMENTS MADE SIMPLE </p>
              </div>
              <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <p onClick={()=>navigate('/')} style={{fontSize:'18px',marginRight:'20px'}}>Home</p>
              <p onClick={()=>navigate('/studentLogin')}style={{fontSize:'18px',marginRight:'20px'}}>Student</p>
              <p onClick={()=>navigate('/adminLogin')} style={{fontSize:'18px',marginRight:'20px'}}>Admin</p>
              </div>
              </div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'300px'}}>
            KLOC HIREME
        </div>
        </>
  )
}

export default Home