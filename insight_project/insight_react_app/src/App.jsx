import { Suspense, useState, useEffect } from 'react';
import './App.css';
import Quote from './components/Quote';
import QuoteAxios from './components/QuoteAxios';
import QuoteSWR from './components/QuoteSWR';
import QuoteQuery from './components/QuoteQuery';
import Upload from './components/Upload';
import Results from './components/results';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import { getCookie } from "./csrf";


function App() {

  const [message, setMessage] = useState();
  const [error_message, setError_message] = useState();

  const handleSubmit = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const fetchUpload = async () => {
      const res = await fetch('upload/', {
        method: "POST",
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: formData
      });
      const data = await res.json()
      setMessage(data.message);
      setError_message(data.error_message);
    }
    fetchUpload();
  };

  // useEffect(() => {
  //   const fetchAnalyze = async () => {
  //     if (!error_message) {
  //       const res2 = await fetch('analyze/')
  //       const data2 = await res2.json();
  //       console.log(data2.results);
  //     }
  //   };
  //   fetchAnalyze();
  // }, [error_message]);

  return (
    <>
      <Upload handleSubmit={handleSubmit} />
      <div>
        <p>Message: {message}</p>
        <p>Error_message: {error_message}</p>
      </div>
      {/* <Routes>
        <Route path='/' element={<Upload handleSubmit={handleSubmit} />} />
        <Route path='/results' element={<Results />} />
      </Routes> */}
    </>
  );
}

export default App;
