import useSWR from 'swr'

const fetcher = async (...args) => {
    const res = await fetch(...args);
    const data = await res.json();
    return data;
};

export default function QuoteSWR() {
    // using swr
    // npm i swr
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
            <h1>Get quotes using SWR</h1>
            <div>{data.content}</div>
        </div>
    )
}