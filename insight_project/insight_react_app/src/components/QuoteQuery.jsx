import useSWR from 'swr'

const fetcher = async (...args) => {
    const res = await fetch(...args);
    const data = await res.json();
    return data;
};

export default function QuoteQuery() {
    // using swr
    // npm i react-query
    const { data, error } = useSWR("https://api.quotable.io/random", fetcher, { suspense: true });
    if (error) {
        return (
            <div>
                <h1>There is an error</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Get quotes using react-query</h1>
            <div>{data.content}</div>
        </div>
    )
}