import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import EachCandidateInputField from "./EachCandidateInputField";
import Cookies from "js-cookie";

const Assessment = () => {
  const [activeTest, setActiveTest] = useState("");
  const [studentCount, setStudentCount] = useState(1);
  const [proceeding, setProceeding] = useState(false);
  const [candidateFields, setCandidateFields] = useState([]);

  const tests = [
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

  useEffect(() => {
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

  const onClickSendAssessment = () => {
    console.log(candidateFields);

    // Check if any of the candidate input fields are empty
    const isEmptyField = candidateFields.some((each) =>
      Object.values(each).some((value) => value === "")
    );

    if (isEmptyField) {
      alert("Please fill in all the candidate details");
      return;
    }

    candidateFields.forEach((each) => {
      //   updateStudentThroughSheetDb(each);
    });
  };

  return (
    <div className='send-assessment-container'>
      <Navbar />
      <div>
        <div className='assessment-container'>
          <div>
            {tests.map((each, index) => (
              <div className='input-container'>
                <div>
                  <input
                    type='radio'
                    name='test'
                    id={index}
                    onChange={(e) => setActiveTest(e.target.value)}
                    value={each}
                  />
                  <label htmlFor={index}>{each}</label>
                </div>
                <input
                  disabled={activeTest !== each}
                  type='text'
                  className='user-input'
                  id={index}
                  onChange={(e) => setStudentCount(e.target.value)}
                  value={activeTest === each ? studentCount : ""}
                />
              </div>
            ))}
          </div>
          <button
            onClick={onClickProceed}
            className='btn btn-primary assessment-button'
          >
            Proceed
          </button>
        </div>
        <div className='each-input-student-details-div'>
          {proceeding &&
            Array.from({ length: studentCount }, (_, index) => (
              <EachCandidateInputField
                key={index}
                index={index} // Pass the index as a prop
                onInputChange={(values) => handleInputChange(index, values)}
              />
            ))}

          {proceeding && (
            <div className='text-center'>
              <button
                onClick={onClickSendAssessment}
                className='btn btn-primary m-2'
              >
                Send Assessment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
