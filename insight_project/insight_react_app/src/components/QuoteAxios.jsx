import { useState, useEffect } from "react";
import axios from "axios";

export default function QuoteAxios() {
    // using axios
    // npm i axios
    const [quote, setQuote] = useState();
    useEffect(() => {
        const fetchQuote = async () => {
            const res = await axios.get("https://api.quotable.io/random");
            setQuote(res.data);
        }
        fetchQuote();
    }, []);
    return (
        <div>
            <h1>Get quotes using axios</h1>
            <div>{quote?.content}</div>
        </div>
    )
}