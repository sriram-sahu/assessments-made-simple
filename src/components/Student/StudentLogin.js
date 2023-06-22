import React, { useState } from "react";
import { Navigate, createPath, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();
export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [testKey, setTestKey] = useState("");
  const [message, setMessage] = useState("");

  const testDetails = [
    { testName: "Freshers Junior Test", path: "/fresher-junior-test" },
    { testName: "Fresher Test", path: "/fresher-test" },
    { testName: "Freshers QA Test", path: "/fresher-qa-test" },
    {
      testName: "Full Stack Developer Test",
      path: "/fullstack-developer-test",
    },
    { testName: "Freshers Python Test", path: "/fresher-python-test" },
    { testName: "Freshers Java Test", path: "/fresher-java-test" },
    { testName: "Frontend Freshers Test", path: "/frontend-fresher-test" },
    { testName: "Shopify Developer Test", path: "/shopify-developer-test" },
    {
      testName: "MERN Developer Junior Test",
      path: "/mern-developer-junior-test",
    },
    {
      testName: "MERN Developer Intermediate Test",
      path: "/mern-developer-intermediate-test",
    },
  ];

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, testKey);
    const key = "AIzaSyAz1z7QqYvovxmnO-lvzoORcMC1UZzXNRE";
    fetch(
      `https://script.google.com/macros/s/AKfycbwMZQgowv_cRQcdYTCzxZ2bFuoJ1BO736bY4mBTxwYxCYfljouz6oeBWKiCQ6Q3KQ_9nw/exec?key=${key}`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        const filteredData = result.data.find(
          (item) => item.uniqueId === testKey
        );
        console.log(filteredData, "fg");
        if (filteredData === undefined) {
          setMessage("You don't have access to write this test");
        } else if (filteredData.isCompleted === "incomplete") {
          if (filteredData.uniqueId === testKey) {
            setMessage("You can write the Test");
            const testName = filteredData.test;
            console.log(filteredData, "test");
            const apiKey = "AIzaSyAz1z7QqYvovxmnO-lvzoORcMC1UZzXNRE";
            const path = testDetails.find(
              (test) => test.testName === testName
            )?.path;
            navigate(path);
            fetch(
              `https://script.google.com/macros/s/AKfycbyZ1M9Wiq5XVZwik3Pe-HvaLaklv_USkK15l5GLzMjtHXDND9cXzbmNraolbnGlUIS9Ig/exec?key=${apiKey}&uniqueId=${testKey}`
            )
              .then((response) => console.log(response))
              .catch((err) => console.log(err));
          } else {
            setMessage("Your email end password mismatch");
          }
        } else {
          setMessage("You already completed the test");
        }
      });
  };
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component='main' sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Sign in
              </Typography>
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={(event) => setEmail(event.target.value)}
                  autoFocus
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Test Pin'
                  type='text'
                  id='password'
                  onChange={(event) => setTestKey(event.target.value)}
                  autoComplete='current-password'
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Start Test
                </Button>
                <p>{message}</p>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
