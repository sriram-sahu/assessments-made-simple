import React, { useEffect, useState } from "react";
import TestContext from "../../TestContext";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./index.css";

const GetSheetData = () => {
  const [sheetData, setSheetData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [filteredData, setFilteredData] = useState(sheetData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { addToReports, reports } = React.useContext(TestContext);

  const navigate = useNavigate();

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
          scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
          discoveryDocs: [
            "https://sheets.googleapis.com/$discovery/rest?version=v4",
          ],
        })
        .then(() => {
          console.log("Google API client initialized");
          const authInstance = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(authInstance.isSignedIn.get());
          authInstance.isSignedIn.listen(updateSignInStatus);
          executeRequest();
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

    const executeRequest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_SHEET_ID,
          range: process.env.REACT_APP_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          console.log(values);
          const headers = values[0];
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          console.log(jsonData, "json");
          setSheetData(jsonData);
          setFilteredData(jsonData);
          addToReports(jsonData);
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
  }, [reports]);

  const handleSignIn = () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signIn().catch((error) => {
      if (error.error === "popup_closed_by_user") {
        console.error("Popup Closed By the User", error);
      } else {
        console.error("Error signing in with Google", error);
      }
    });
  };

  return <div>{handleSignIn()}</div>;
};

export default GetSheetData;
