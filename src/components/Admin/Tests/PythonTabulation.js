import { useState,useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import '../Tabulation.css'

const PythonTest = () =>{
    const location=useLocation()
    const [data,setData]=useState(location.state)
      const navigate=useNavigate()
      
    return (
        <div style={{display:'flex',flexDirection:'column',textAlign:'center',paddingTop:'20px'}}>
            <h1 style={{marginBottom:'20px'}}>Python Test Tabulation Data</h1>
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
                        <th>Technical Score</th> 
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
                        <td>{item.technical_score}</td>
                        <td>
                            <button onClick={()=>navigate('/studentChart',{state:item})
                            } >
                                View
                            </button>
                        </td>
                    </tr>)}
                </tbody>
            </table> :"No Data Found"}
        </div>
    )
}
export default PythonTest