import React, { useEffect,useState } from "react";
import Navbar from "./Navbar";
import { useNavigate ,useLocation} from "react-router-dom";
import Cookies from "js-cookie";

const Dashboard = () => {
  const location=useLocation()
  const navigate = useNavigate();
  const [finalData,setFinalData]=useState(location.state)

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/notFound");
    }
  }, []);
  return (
    <div>
      <div style={{paddingLeft:'30px',paddingTop:'10px',backgroundColor:'#0047AB',color:'white',height:'65px',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center'}}>
              <p onClick={()=>navigate('/')}style={{fontSize:'20px',marginRight:'30px',fontWeight:'bold'}}>ASSESSMENTS MADE SIMPLE </p>
              <p onClick={()=>navigate('/dashboard',{state:finalData})} style={{fontSize:'18px',marginRight:'20px'}}>Dashboard</p>
              <p onClick={()=>navigate('/sendAssessments',{state:finalData})}style={{fontSize:'18px',marginRight:'20px'}}>Assessments</p>
              <p onClick={()=>navigate('/testReports',{state:finalData})} style={{fontSize:'18px',marginRight:'20px'}}>Test Reports</p>
              <p onClick={()=>navigate('/studentReports',{state:finalData})} style={{fontSize:'18px'}}>Student Reports</p>
              </div>
              <div style={{marginRight:'30px'}}>
                <p style={{color:'white'}} onClick={()=>
                navigate('/adminLogin')}>Admin</p>
              </div>
            </div>
      <div>dashboard</div>
    </div>
  );
};

export default Dashboard;
