export default function Results({ insights, correlations }) {
    const fetchResults = async () => {
        const res = await fetch('analyze/');
        const data = await res.json()
        console.log(data.results);
    };
    fetchResults()
    return (
        <div>
            <h1>Data Insights</h1>
            <h2>Descriptive Statistics</h2>
            <pre>{JSON.stringify(insights, null, 2)}</pre>

            <h2>Correlation</h2>
            <pre>{JSON.stringify(correlations, null, 2)}</pre>
        </div>
    );
};