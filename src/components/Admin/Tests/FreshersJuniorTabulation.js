import { useState,useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import '../Tabulation.css'

function FreshersJuniorTabulation() {
    const location=useLocation()
    const [data,setData]=useState(location.state)
      const navigate=useNavigate()
      const handleUpdate=(item)=>{
        if (item.Total_Score===undefined){
            fetch(`https://sheetdb.io/api/v1/f3kdvdrvltn08/Email_Address/${item.Email_Address}`,{
                method: "PATCH",
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer 1bnneqvs9h583u64f4f5i5ba1oyojsw3skwzbyfe",
                },
                body: JSON.stringify({
                    data: {
                      Aptitude_Score: item.aptitude_score,
                      Reasoning_Score: item.reasoning_score,
                      Total_Score:
                        item.aptitude_score+item.reasoning_score
                    },
                  }),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
        }
      }
      
    return (
        <div style={{display:'flex',flexDirection:'column',textAlign:'center',paddingTop:'20px'}}>
            <h1 style={{marginBottom:'20px'}}>Freshers Junior Test Tabulation Data</h1>
            {data.length> 0 ? <table border="2px" style={{margin:'auto'}}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Completed On</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Phone Number</th>
                        <th>Total Score</th>
                        <th>Aptitude Score</th>
                        <th>Reasoning Score</th> 
                        <th>View Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,index) =><tr>
                        <td>{index}</td>
                        <td>{item.Timestamp}</td>
                        <td>{item.Name}</td>
                        <td>{item.Email_Address}</td>
                        <td>{item.Phone_Number}</td>
                        <td>{item.Score}</td>
                        <td>{item.aptitude_score}</td>
                        <td>{item.reasoning_score}</td>
                        <td>
                            <button onClick={()=>{navigate('/studentChart',{state:item})
                            handleUpdate(item)}}
                             >
                                View
                            </button>
                        </td>
                    </tr>)}
                </tbody>
            </table> :"No Data Found"}
        </div>
    )
}

export default FreshersJuniorTabulation