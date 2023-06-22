import React, { useEffect, useState } from "react";
import Navbar from './Navbar'
import AdbIcon from "@mui/icons-material/Adb";
import TestContext from "../../TestContext";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import "./index.css";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

const AdminLogin = () => {
  const [fresherData,setFresherData]=useState([])
  const [pythonData,setPythonData]=useState([])
  const [fullStackData,setFullStackData]=useState([])
  const [shopifyData,setShopifyData]=useState([])
  const [mernDeveloperIntermediateData,setMernDeveloperIntermediateData]=useState([])
  const [frontEndFresherData,setfrontEndFresherData]=useState([])
  const [javaData,setJavaData]=useState([])
  const [mernDeveloperJuniorData,setMernDeveloperJuniorData]=useState([])
  const [qaData,setQAData]=useState([])
  const [freshersJuniorData,setFreshersJuniorData]=useState([])
  const [userEmail, setUserEmail] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate=useNavigate()



  useEffect(() => {
    const loadGoogleAPI = () => {
      const script = document.createElement("script");
      script.src = process.env.REACT_APP_SCRIPT_SRC;
      script.onload = initializeGoogleAPI;
      document.head.appendChild(script);
    };

    const initializeGoogleAPI = () => {
      window.gapi.load("client:auth2", initClient);
    };

    const initClient = () => {
      window.gapi.client
        .init({
          apiKey: process.env.REACT_APP_API_KEY,
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: [
            "https://sheets.googleapis.com/$discovery/rest?version=v4",
          ],
        })
        .then(() => {
          console.log("Google API client initialized");
          const authInstance = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(authInstance.isSignedIn.get());
          authInstance.isSignedIn.listen(updateSignInStatus);
          executeRequestFreshersTest();
          executeRequestPythonTest();
          executeRequestShopifyTest();
          executeRequestFrontEndFresherTest();
          executeRequestFullStackTest();
          executeRequestMernDeveloperIntermediateTest();
          executeRequestJavaTest()
          executeRequestMernDeveloperJuniorTest()
          executeRequestQATest()
          executeRequestFreshersJuniorTest()
          getUserEmail();
        })
        .catch((error) => {
          console.error("Error initializing Google API client", error);
        });
    };

    const updateSignInStatus = (isUserSignedIn) => {
      setIsSignedIn(isUserSignedIn);
      if (isUserSignedIn) {
        getUserEmail();
      } else {
        setUserEmail("");
      }
    };

    const executeRequestFreshersTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_FRESHERS_TEST_SHEET_ID,
          range: process.env.REACT_APP_FRESHERS_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // console.log(values);
          const headers = values[0];
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // console.log(jsonData, "json");
          setFresherData(jsonData);
        })
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    
    const executeRequestPythonTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_PYTHON_TEST_SHEET_ID,
          range: process.env.REACT_APP_PYTHON_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // console.log(values);
          const headers = values[0];
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // console.log(jsonData, "json");
          setPythonData(jsonData);
        })
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    const executeRequestShopifyTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_SHOPIFY_TEST_SHEET_ID,
          range: process.env.REACT_APP_SHOPIFY_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // console.log(values);
          const headers = values[0];
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // console.log(jsonData, "json");
          setShopifyData(jsonData);
        })
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    const executeRequestFrontEndFresherTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_FRONTEND_FRESHER_TEST_SHEET_ID,
          range: process.env.REACT_APP_FRONTEND_FRESHER_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          console.log('frontend',values);
          const headers = values[0];
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          console.log(jsonData, "json");
          setfrontEndFresherData(jsonData);
        })
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    const executeRequestFullStackTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_FULL_STACK_TEST_SHEET_ID,
          range: process.env.REACT_APP_FULL_STACK_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // console.log(values);
          const headers = values[0];
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // console.log(jsonData, "json");
          setFullStackData(jsonData);
        })
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    const executeRequestMernDeveloperIntermediateTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_MERN_DEVELOPER_INTERMEDIATE_TEST_SHEET_ID,
          range: process.env.REACT_APP_MERN_DEVELOPER_INTERMEDIATE_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // console.log(values);
          const headers = values[0];
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // console.log(jsonData, "json");
          setMernDeveloperIntermediateData(jsonData);
        })
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };
    const executeRequestJavaTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_JAVA_TEST_SHEET_ID,
          range: process.env.REACT_APP_JAVA_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          const headers = values[0];
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // console.log(jsonData, "json");
          setJavaData(jsonData);
        })
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    const executeRequestMernDeveloperJuniorTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_MERN_DEVELOPER_JUNIOR_TEST_SHEET_ID,
          range: process.env.REACT_APP_MERN_DEVELOPER_JUNIOR_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // console.log('JUNIOR',values);
          const headers = values[0];
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // console.log(jsonData, "json");
          setMernDeveloperJuniorData(jsonData);
        })
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    const executeRequestQATest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_QA_TEST_SHEET_ID,
          range: process.env.REACT_APP_QA_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // console.log('QA',values);
          const headers = values[0];
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // console.log(jsonData, "json");
          setQAData(jsonData);
        })
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    const executeRequestFreshersJuniorTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_FRESHERS_JUNIOR_TEST_SHEET_ID,
          range: process.env.REACT_APP_FRESHERS_JUNIOR_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          console.log('fj',values);
          const headers = values[0];
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          console.log(jsonData, "json");
          setFreshersJuniorData(jsonData);
        })
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    const getUserEmail = () => {
      const authInstance = window.gapi.auth2.getAuthInstance();
      if (authInstance.isSignedIn.get()) {
        const currentUser = authInstance.currentUser.get();
        const basicProfile = currentUser.getBasicProfile();
        const email = basicProfile.getEmail();
        if (email === "klocprojectone@gmail.com") {
          const loginId = uuidv4();
          Cookies.set("token", loginId, { expires: 30 });
        } else {
          navigate("/notFound");
        }
        setUserEmail(email);
      }
    };

    loadGoogleAPI();
  }, []);

  const fetchFresherData=()=>{
    fresherData.map((item,index)=>{
    let aptitude_score  = 0 
    let technical_score = 0 
    const aptitude  = JSON.parse(process.env.REACT_APP_FRESHER_TEST_APTITUDE_QUESTIONS_ANSWERS) 
    const technical = JSON.parse(process.env.REACT_APP_FRESHER_TEST_TECHNICAL_QUESTIONS_ANSWERS)
    Object.keys(item).map((_,i) =>{
     if(i>5 && i<26){
        if((i-5) in aptitude){
             if(item[_]===aptitude[i-5]){
                 aptitude_score+=1
             }
        }
     }else if(i>25 && i<56){
        if((i-25) in technical){
             if(item[_]===technical[i-25]){
                 technical_score +=1
             }
        }
     }
    })
     item.aptitude_score = aptitude_score
     item.technical_score =  technical_score
     item.total_score =  aptitude_score + technical_score
     item.testType='Freshers Test'
   })
  }

  useEffect(()=>{
    fetchFresherData()
  },[fresherData])
  console.log(fresherData)

  const fetchPythonData=()=>{
    let aptitude=JSON.parse(process.env.REACT_APP_PYTHON_TEST_APTITUDE_QUESTIONS_ANSWERS)
    let technical=JSON.parse(process.env.REACT_APP_PYTHON_TEST_TECHNICAL_QUESTIONS_ANSWERS)
    pythonData.map((item,index)=>{
        let aptitude_score=0
        let technical_score=0
        Object.keys(item).map((score,i)=>{
            if (i>5 && i<31){
                if ((i-5) in aptitude){
                    // console.log(item[score])
                    if (item[score]===aptitude[i-5]){
                        aptitude_score+=1
                    }
                }
            }else if(i>30 && i<56){
                if ((i-30) in technical){ 
                    // console.log(item[score])   
                    // console.log(technical[i-30])           
                    if (item[score]===technical[i-30]){
                        technical_score+=1
                    }
                }
            }
        })
        // console.log('aptitude_score',aptitude_score)
        // console.log('technical_score',technical_score)
        item.aptitude_score=aptitude_score
        item.technical_score=technical_score
        item.total_score=item.aptitude_score+item.technical_score
        item.testType='Python Test'
    })
  }
  useEffect(()=>{
    fetchPythonData()
  },[pythonData])
  // console.log(pythonData)

  const fetchShopifyData=()=>{
    shopifyData.map((item,index)=>{
      let aptitude_score  = 0 
      let technical_score = 0 
      const aptitude  = JSON.parse(process.env.REACT_APP_SHOPIFY_APTITUDE_QUESTIONS_ANSWERS) 
      const technical = JSON.parse(process.env.REACT_APP_SHOPIFY_TECHNICAL_QUESTIONS_ANSWERS)
      Object.keys(item).map((_,i) =>{
      if(i>5 && i<16){
          if((i-5) in aptitude){
              if(item[_]===aptitude[i-5]){
                  aptitude_score+=1
              }
          }
      }else if(i>15 && i<46){
          if((i-15) in technical){
              if(item[_]===technical[i-15]){ 
                  technical_score +=1
              }
          }
      }    
      })
      item.aptitude_score = aptitude_score
      item.technical_score =  technical_score
      item.total_score =  aptitude_score + technical_score
      item.testType='Shopify Test'
  })
  }

  useEffect(()=>{
    fetchShopifyData()
  },[shopifyData])

  const fetchFrontEndFresherData=()=>{
    let aptitude=JSON.parse(process.env.REACT_APP_FRONTEND_FRESHER_TEST_APTITUDE_QUESTIONS_ANSWERS)
    let technical=JSON.parse(process.env.REACT_APP_FRONTEND_FRESHER_TEST_TECHNICAL_QUESTIONS_ANSWERS)
    frontEndFresherData.map((item,index)=>{
        let aptitude_score=0
        let technical_score=0
        Object.keys(item).map((score,i)=>{
            if (i>5 && i<16){
              // console.log(item[score],i-5)
              // console.log(aptitude[i-5],i-5)
                if ((i-5) in aptitude){
                    if (item[score]===aptitude[i-5]){
                        aptitude_score+=1
                    }
                }
            }else if(i>15 && i<56){
                if ((i-15) in technical){          
                    if (item[score]===technical[i-15]){
                        technical_score+=1
                    }
                }
            }
        })
        // console.log('aptitude_score',aptitude_score)
        // console.log('technical_score',technical_score)
        item.aptitude_score=aptitude_score
        item.technical_score=technical_score
        item.total_score =  aptitude_score + technical_score
        item.testType='Front End Fresher Test'
    })
  }

  useEffect(()=>{
    fetchFrontEndFresherData()
  },[frontEndFresherData])
console.log(frontEndFresherData)

const fetchFullStackData=()=>{
  fullStackData.map((item,index)=>{
    let fullstack_java_score = 0 
    let fullstack_react_score  = 0
    const fullstack_java = JSON.parse(process.env.REACT_APP_FULLSTACK_JAVA_QUESTIONS_ANSWERS)
    const fullstack_react = JSON.parse(process.env.REACT_APP_FULLSTACK_REACT_QUESTIONS_ANSWERS)
    Object.keys(item).map((_,i)=>{
        if(i>5 && i<31){
            if(item[_]===fullstack_react[i-5]){
                fullstack_react_score +=1
            }
        }else if(i>30 && i<57){
            if([i-30] in fullstack_java){
                if(item[_]===fullstack_java[i-30]){
                    fullstack_java_score +=1
                }
            }
        }
    })
    item.fullstack_java_score = fullstack_java_score
    item.fullstack_react_score  = fullstack_react_score
    item.total_score = fullstack_java_score+fullstack_react_score
    item.testType='Full Stack Test'
})
}

useEffect(()=>{
  fetchFullStackData()
},[fullStackData])

  const fetchMernDeveloperIntermediateData=()=>{
    let aptitude=JSON.parse(process.env.REACT_APP_MERN_DEVELOPER_INTERMEDIATE_TEST_APTITUDE_QUESTIONS_ANSWERS)
    let technical=JSON.parse(process.env.REACT_APP_MERN_DEVELOPER_INTERMEDIATE_TEST_TECHNICAL_QUESTIONS_ANSWERS)
    mernDeveloperIntermediateData.map((item,index)=>{
        let aptitude_score=0
        let technical_score=0
        Object.keys(item).map((score,i)=>{
            if (i>5 && i<16){
                if ((i-5) in aptitude){
                    if (item[score]===aptitude[i-5]){
                        aptitude_score+=1
                    }
                }
            }else if(i>15 && i<56){
                if ((i-15) in technical){           
                    if (item[score]===technical[i-15]){
                        technical_score+=1
                    }
                }
            }
        })
        // console.log('aptitude_score',aptitude_score)
        // console.log('technical_score',technical_score)
        item.aptitude_score=aptitude_score
        item.technical_score=technical_score
        item.total_score =  aptitude_score + technical_score
        item.testType='MERN Developer Intermediate Test'
    })
  }

  useEffect(()=>{
    fetchMernDeveloperIntermediateData()
  },[mernDeveloperIntermediateData])

  const fetchJavaData=()=>{
    let aptitude=JSON.parse(process.env.REACT_APP_JAVA_TEST_APTITUDE_QUESTIONS_ANSWERS)
    let technical=JSON.parse(process.env.REACT_APP_JAVA_TEST_TECHNICAL_QUESTIONS_ANSWERS)
    javaData.map((item,index)=>{
        let aptitude_score=0
        let technical_score=0
        Object.keys(item).map((score,i)=>{
            if (i>5 && i<31){
                if ((i-5) in aptitude){
                    // console.log(item[score])
                    if (item[score]===aptitude[i-5]){
                        aptitude_score+=1
                    }
                }
            }else if(i>30 && i<56){
                if ((i-30) in technical){ 
                    // console.log(item[score])   
                    // console.log(technical[i-30])           
                    if (item[score]===technical[i-30]){
                        technical_score+=1
                    }
                }
            }
        })
        // console.log('aptitude_score',aptitude_score)
        // console.log('technical_score',technical_score)
        item.aptitude_score=aptitude_score
        item.technical_score=technical_score
        item.total_score =  aptitude_score + technical_score
        item.testType='Java Test'
    })
  }
  useEffect(()=>{
    fetchJavaData()
  },[javaData])
  // console.log(javaData)

  const fetchMernDeveloperJuniorData=()=>{
    let aptitude=JSON.parse(process.env.REACT_APP_MERN_DEVELOPER_JUNIOR_TEST_APTITUDE_QUESTIONS_ANSWERS)
    let technical=JSON.parse(process.env.REACT_APP_MERN_DEVELOPER_JUNIOR_TEST_TECHNICAL_QUESTIONS_ANSWERS)
    mernDeveloperJuniorData.map((item,index)=>{
        let aptitude_score=0
        let technical_score=0
        Object.keys(item).map((score,i)=>{
            if (i>5 && i<16){
              // console.log(item[score],i-5)
              // console.log(aptitude[i-5],i-5)
                if ((i-5) in aptitude){
                    if (item[score]===aptitude[i-5]){
                        aptitude_score+=1
                    }
                }
            }else if(i>15 && i<56){
                if ((i-15) in technical){           
                    if (item[score]===technical[i-15]){
                        technical_score+=1
                    }
                }
            }
        })
        // console.log('aptitude_score',aptitude_score)
        // console.log('technical_score',technical_score)
        item.aptitude_score=aptitude_score
        item.technical_score=technical_score
        item.total_score =  aptitude_score + technical_score
        item.testType='MERN Developer Junior Test'
    })
  }

  useEffect(()=>{
    fetchMernDeveloperJuniorData()
  },[mernDeveloperJuniorData])

  const fetchQAData=()=>{
    let aptitude=JSON.parse(process.env.REACT_APP_QA_TEST_APTITUDE_QUESTIONS_ANSWERS)
    let technical=JSON.parse(process.env.REACT_APP_QA_TEST_TECHNICAL_QUESTIONS_ANSWERS)
    qaData.map((item,index)=>{
        let aptitude_score=0
        let technical_score=0
        Object.keys(item).map((score,i)=>{
            if (i>5 && i<16){
              // console.log(item[score],i-5)
              // console.log(aptitude[i-5],i-5)
                if ((i-5) in aptitude){
                    if (item[score]===aptitude[i-5]){
                        aptitude_score+=1
                    }
                }
            }else if(i>15 && i<56){
              console.log(item[score],i-15)
              console.log(technical[i-15],i-15)
              console.log(item[score]===technical[i-15])
                if ((i-15) in technical){           
                    if (item[score]===technical[i-15]){
                        technical_score+=1
                    }
                }
            }
        })
        console.log('aptitude_score',aptitude_score)
        console.log('technical_score',technical_score)
        item.aptitude_score=aptitude_score
        item.technical_score=technical_score
        item.total_score =  aptitude_score + technical_score
        item.testType='QA Test'
    })
  }

  useEffect(()=>{
    fetchQAData()
  },[qaData])

  const fetchFreshersJuniorData=()=>{
    let aptitude=JSON.parse(process.env.REACT_APP_FRESHERS_JUNIOR_TEST_APTITUDE_QUESTIONS_ANSWERS)
    let reasoning=JSON.parse(process.env.REACT_APP_FRESHERS_JUNIOR_TEST_REASONING_QUESTIONS_ANSWERS)
    freshersJuniorData.map((item,index)=>{
        let aptitude_score=0
        let reasoning_score=0
        Object.keys(item).map((score,i)=>{
            if (i>5 && i<31){
                if ((i-5) in aptitude){
                    // console.log(item[score])
                    if (item[score]===aptitude[i-5]){
                        aptitude_score+=1
                    }
                }
            }else if(i>30 && i<56){
                if ((i-30) in reasoning){ 
                    // console.log(item[score])   
                    // console.log(technical[i-30])           
                    if (item[score]===reasoning[i-30]){
                        reasoning_score+=1
                    }
                }
            }
        })
        // console.log('aptitude_score',aptitude_score)
        // console.log('technical_score',technical_score)
        item.aptitude_score=aptitude_score
        item.reasoning_score=reasoning_score
        item.total_score =  aptitude_score + reasoning_score
        item.testType='Freshers Junior Test'
    })
  }
  useEffect(()=>{
    fetchFreshersJuniorData()
  },[freshersJuniorData])

  let allData=[]
  allData.push(fresherData)
  allData.push(pythonData)
  allData.push(shopifyData)
  allData.push(frontEndFresherData)
  allData.push(mernDeveloperIntermediateData)
  allData.push(fullStackData)
  allData.push(javaData)
  allData.push(mernDeveloperJuniorData)
  allData.push(qaData)
  allData.push(freshersJuniorData)
  console.log(allData)

  const handleSignIn = () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signIn().catch((error) => {
      if (error.error === "popup_closed_by_user") {
        console.error("Popup Closed By the User", error);
      } else {
        console.error("Error signing in with Google", error);
        // Handle other sign-in errors
      }
    });
  };

  // const handleFilter = () => {
  //   const filtered = sheetData.filter((item) => {
  //     const itemDate = new Date(item.Timestamp);
  //     const start = new Date(startDate);
  //     const end = new Date(endDate);
  //     end.setDate(end.getDate() + 1); // Added one day to the end date
  //     return itemDate >= start && itemDate <= end;
  //   });
  //   setFilteredData(filtered);
  // };

  const handleSignOut = () => {
    Cookies.remove("token");
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signOut();
  };
  console.log(isSignedIn)

  const datat={
    fresherData,
    pythonData,
    mernDeveloperIntermediateData,
    shopifyData,
    frontEndFresherData,
    fullStackData,
    javaData,
    mernDeveloperJuniorData,
    qaData,
    freshersJuniorData
  }
  console.log(datat)
  let finalData={
    allData,datat
  }

  return (
    <div>
      <div>
        <p>
          {isSignedIn ? (
            <div style={{paddingLeft:'30px',paddingTop:'10px',backgroundColor:'#0047AB',color:'white',height:'65px',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center'}}>
              <p onClick={()=>navigate('/')}style={{fontSize:'20px',marginRight:'30px',fontWeight:'bold'}}>ASSESSMENTS MADE SIMPLE </p>
              <p onClick={()=>navigate('/dashboard',{state:finalData})} style={{fontSize:'18px',marginRight:'20px'}}>Dashboard</p>
              <p onClick={()=>navigate('/sendAssessments',{state:finalData})}style={{fontSize:'18px',marginRight:'20px'}}>Assessments</p>
              <p onClick={()=>navigate('/testReports',{state:finalData})} style={{fontSize:'18px',marginRight:'20px'}}>Test Reports</p>
              <p onClick={()=>navigate('/studentReports',{state:finalData})} style={{fontSize:'18px'}}>Student Reports</p>
              </div>
              <div style={{marginRight:'30px'}}>
                <p style={{color:'white'}}onClick={handleSignOut}>Sign Out</p>
              </div>
            </div>
          ) : (
            <div className='display-column'>
              <h2>Login With Google</h2>
              <button onClick={handleSignIn} className='google-signin-button'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                  alt='Google Logo'
                />
                Sign In with Google
              </button>
            </div>
          )}
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
