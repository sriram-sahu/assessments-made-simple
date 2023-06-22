import React, { useEffect,useState } from "react";
import Navbar from "./Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import {useLocation} from 'react-router-dom'
import Cookies from "js-cookie";

const TestReports = () => {
  const location=useLocation()
    const [data,setData]=useState(location.state)
  const navigate = useNavigate();
  const testDetails = [
    {
      name: "Fresher QA Test",
      id: "fresher_qa_test",
      url: "https://www.fitaacademy.in/includes/assets/img/blog/software-testing.jpg",
      data:data.datat.qaData
    },
    {
      name: "Full Stack Developer Test",
      id: "fullstack_developer_test",
      url: "https://assets.website-files.com/6239c24c282f5581285fbbb3/6357613e0b897b701b563c7a_full%20stack%20developer%20assessment%20test.jpg",
      data:data.datat.fullStackData
    },
    {
      name: "Fresher Python Test",
      id: "fresher_python_test",
      url: "https://st3.myideasoft.com/idea/ct/82/myassets/blogs/python-ne-icin-kullanilir.jpg",
      data:data.datat.pythonData
    },
    {
      name: "Fresher Java Test",
      id: "fresher_java_test",
      url: "https://i0.wp.com/www.techbooky.com/wp-content/uploads/2019/10/java-logo.png",
      data:data.datat.javaData
    },
    {
      name: "Fresher Test",
      id: "fresher_test",
      url: "https://img.freepik.com/premium-vector/man-with-laptop-studying-working-concept_113065-167.jpg",
      data:data.datat.fresherData
    },
    {
      name: "Frontend Freshers Assessment",
      id: "frontend_fresher_test",
      url: "https://staticlearn.shine.com/l/m/images/blog/Front--end-developer.png",
      data:data.datat.frontEndFresherData
    },
    {
      name: "Shopify Developer Test",
      id: "shopify_developer_test",
      url: "https://colorlib.com/wp/wp-content/uploads/sites/2/free-shopify-themes.jpg",
      data:data.datat.shopifyData
    },
    {
      name: "MERN Developer - Junior",
      id: "mern_developer_junior",
      url: "https://www.technology4u.in/wp-content/uploads/2021/07/epv55hgtsfi8csprpj9u.jpg",
      data:data.datat.mernDeveloperJuniorData
    },
    {
      name: "MERN Developer - Intermediate",
      id: "mern_developer_intermediate",
      url: "https://www.bigscal.com/wp-content/uploads/2022/09/Features-of-Mern-stack-development-services-You-Should-Know.png",
      data:data.datat.mernDeveloperIntermediateData
    },
    {
      name:'Freshers Junior',
      id:"freshers_junior_test",
      url:'https://play-lh.googleusercontent.com/8HEJdrLd48HwrAzlRva8xjG1wxCuu0VUd9ML6ySw76q-lBD0AeWofbNZqYPrjWSCgf8=w240-h480-rw',
      data:data.datat.freshersJuniorData
    }
  ];

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
              <p onClick={()=>navigate('/dashboard',{state:data})} style={{fontSize:'18px',marginRight:'20px'}}>Dashboard</p>
              <p onClick={()=>navigate('/sendAssessments',{state:data})}style={{fontSize:'18px',marginRight:'20px'}}>Assessments</p>
              <p onClick={()=>navigate('/testReports',{state:data})} style={{fontSize:'18px',marginRight:'20px'}}>Test Reports</p>
              <p onClick={()=>navigate('/studentReports',{state:data})} style={{fontSize:'18px'}}>Student Reports</p>
              </div>
              <div style={{marginRight:'30px'}}>
                <p style={{color:'white'}} onClick={()=>
                navigate('/adminLogin')}>Admin</p>
              </div>
            </div>
      <div>
        <h1>Test Reports</h1>
        <div className='test-container'>
          {testDetails.map((each, index) => {
            return (
              <Card sx={{ width: 345, margin: "20px" }} key={index}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    height='140'
                    image={each.url}
                    alt='green iguana'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {each.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button
                  sx={{ margin: "20px" }}
                  variant='contained'
                  onClick={() =>
                    navigate(`/testReports/${each.id}`, { state: each.data })
                  }
                >
                  View
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestReports;
