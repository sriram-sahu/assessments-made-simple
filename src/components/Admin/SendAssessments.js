import React, { useState, useEffect } from "react";
import EachCandidateInputField from "./EachCandidateInputField";
import uniqueRandom from "unique-random";
import emailjs from "@emailjs/browser";
import "./index.css";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
import { useLoaderData, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert } from "@mui/material";
import {useLocation} from 'react-router-dom'
const Assessment = () => {
  const [activeTest, setActiveTest] = useState("");
  const [studentCount, setStudentCount] = useState(1);
  const [proceeding, setProceeding] = useState(false);
  const [candidateFields, setCandidateFields] = useState([]);
  const [open, setOpen] = useState(false);
  const location=useLocation()
  const [finalData,setFinalData]=useState(location.state)
  const tests = [
    "Freshers Junior Test",
    "Fresher Test",
    "Freshers QA Test",
    "Full Stack Developer Test",
    "Freshers Python Test",
    "Freshers Java Test",
    "Frontend Freshers Test",
    "Shopify Developer Test",
    "MERN Developer Junior Test",
    "MERN Developer Intermediate Test",
  ];
  const isEmptyField = candidateFields.some((each) =>
    Object.values(each).some((value) => value === "")
  );
  const handleClickOpen = () => {
    if (!isEmptyField) {
      setOpen(true);
    }
    if (isEmptyField) {
      alert("Please fill in all the candidate details");
      return;
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/notFound");
    }
    setStudentCount(1);
    setProceeding(false);
  }, [activeTest]);
  const handleInputChange = (index, values) => {
    setCandidateFields((prevCandidateFields) => {
      const updatedFields = [...prevCandidateFields];
      updatedFields[index] = { ...updatedFields[index], ...values };
      return updatedFields;
    });
  };
  const onClickProceed = () => {
    if (activeTest === "") {
      alert("Select Test");
    } else {
      setProceeding(true);
      setCandidateFields(Array.from({ length: studentCount }, () => ({})));
    }
  };
  const sendingMailThroughEmailJs = (student) => {
    console.log(student);
    emailjs
      .send(
        "service_okvqzif",
        "template_3ujjkix",
        {
          to_name: student.name,
          from_name: "kloc",
          message: `You have been invited to write ${student.test}. \n Your login email is ${student.email} and Test pin in ${student.uniqueId}. \n Test Link : http://localhost:3000/studentLogin`,
          to_email: student.email,
        },
        "MkG09aTM7gyK7zTog"
      )
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        alert(`Email sent to ${student.email}`);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };
  const updateStudentThroughSheetDb = (student) => {
    console.log(activeTest);
    const random = uniqueRandom(10000, 100000);
    const details = {
      name: student.name,
      email: student.email,
      test: activeTest,
      phoneNo: student.phone,
      endDate: student.endDate,
      uniqueId: "kloc" + random(),
      isCompleted: "incomplete",
    };
    console.log(details, "gh");
    fetch("https://sheetdb.io/api/v1/qeetqgie30fhh", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer n95196updlz3oo643ihw1vmttqaq81atj4mfk7qq",
      },
      body: JSON.stringify(details),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    // sendingMailThroughEmailJs(details);
  };
  const onClickSendAssessment = () => {
    console.log("triggered");
    // Check if any of the candidate input fields are empty
    candidateFields.forEach((each) => {
      updateStudentThroughSheetDb(each);
      sendingMailThroughEmailJs(each);
    });
    handleClose();
    setProceeding(false);
  };
  return (
    <div className="send-assessment-container">
      <div style={{paddingLeft:'30px',paddingTop:'10px',backgroundColor:'#0047AB',color:'white',height:'65px',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center'}}>
              <p onClick={()=>navigate('/')}style={{fontSize:'20px',marginRight:'30px',fontWeight:'bold'}}>ASSESSMENTS MADE SIMPLE </p>
              <p onClick={()=>navigate('/dashboard',{state:finalData})} style={{fontSize:'18px',marginRight:'20px'}}>Dashboard</p>
              <p onClick={()=>navigate('/sendAssessments',{state:finalData})}style={{fontSize:'18px',marginRight:'20px'}}>Assessments</p>
              <p onClick={()=>navigate('/testReports',{state:finalData})} style={{fontSize:'18px',marginRight:'20px'}}>Test Reports</p>
              <p onClick={()=>navigate('/studentReports',{state:finalData})} style={{fontSize:'18px'}}>Student Reports</p>
              </div>
              <div style={{marginRight:'30px'}}>
                <p style={{color:'white'}}onClick={()=>
                navigate('/adminLogin')}>Admin</p>
              </div>
            </div>
      <div>
        <div className="assessment-container">
          <div>
            {tests.map((each, index) => (
              <div key={index} className="input-container">
                <div style={{marginTop:'5px'}}>
                  <input
                    type="radio"
                    name="test"
                    id={index}
                    onChange={(e) => setActiveTest(e.target.value)}
                    value={each}
                    style={{marginRight:'10px',transform: 'scale(1.2)'}}
                  />
                  <label htmlFor={index} style={{fontSize:'18px'}}>{each}</label>
                </div>
                <input
                  disabled={activeTest !== each}
                  type="number"
                  className="user-input"
                  id={index}
                  onChange={(e) => setStudentCount(e.target.value)}
                  value={activeTest === each ? studentCount : ""}
                />
              </div>
            ))}
          </div>
          <Button
            variant="contained"
            className="assessment-button m-3"
            onClick={onClickProceed}
          >
            Proceed
          </Button>
        </div>
        <div className="each-input-student-details-div">
          {proceeding &&
            Array.from({ length: studentCount }, (_, index) => (
              <EachCandidateInputField
                key={index}
                index={index} // Pass the index as a prop
                onInputChange={(values) => handleInputChange(index, values)}
              />
            ))}
          {proceeding && (
            <div className="text-center">
              <Button variant="contained" onClick={handleClickOpen}>
                Send Assessment
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are You Sure You Want To Send?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Let's Check onces before sending the assessment !
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Disagree</Button>
                  <Button onClick={onClickSendAssessment} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Assessment;