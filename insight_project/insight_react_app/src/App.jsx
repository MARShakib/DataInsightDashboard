import { Suspense, useState, useEffect, useRef } from 'react';
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
  const [file_id, setFile_id] = useState();

  const analysisReady = useRef(false)

  const [insights, setInsights] = useState({});
  const [correlations, setCorrelations] = useState({});

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
      setFile_id(data.file_id)
    }
    fetchUpload();
  };

  useEffect(() => {
    const fetchAnalyze = async () => {
      if (file_id) {
        const res = await fetch(`analyze/${file_id}`)
        const data = await res.json();
        setInsights(data.insights)
        setCorrelations(data.correlations)
        setMessage(data.message)
        analysisReady.current = true;
      }
    };
    fetchAnalyze();
  }, [file_id]);

  return (
    <>
      <Upload handleSubmit={handleSubmit} />
      <div>
        <p>Message: {message}</p>
        <p>Error_message: {error_message}</p>
      </div>
      {analysisReady.current && <Results insights={insights} correlations={correlations} />}
      {/* <Routes>
        <Route path='/' element={<Upload handleSubmit={handleSubmit} />} />
        <Route path='/results' element={<Results />} />
      </Routes> */}
    </>
  );
}

export default App;
