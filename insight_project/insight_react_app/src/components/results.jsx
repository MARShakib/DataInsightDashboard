export default function Results() {
    const fetchResults = async () => {
        const res = await fetch('analyze/');
        const data = await res.json()
        console.log(data.results);
    };
    fetchResults()
    return (
        <div>
            <h1>Results</h1>
        </div>
    );
};