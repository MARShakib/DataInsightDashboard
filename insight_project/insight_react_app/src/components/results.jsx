export default function Results({ insights, correlations }) {

    const renderTable = (data) => {
        const cols = Object.keys(data)
        const rows = Object.keys(data[cols[0]])

        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th></th>
                        {cols.map((col) => (
                            <th>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr>
                            <td>{row}</td>
                            {
                                cols.map((col) => (
                                    <td>{data[col][row].toFixed(3)}</td>
                                ))
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    };

    return (
        <div>
            <h1>Data Insights</h1>
            <h2>Descriptive Statistics</h2>
            {renderTable(insights)}

            <h2>Correlation</h2>
            {renderTable(correlations)}
        </div>
    );
};