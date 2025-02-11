import { useState, useEffect } from "react";

// custom hook for useFetch
function useFetch(url){
    const [data, setdata] = useState([]);
    const [error, seterror] = useState(null);
    const [loading, setloading] = useState(true);
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await fetch(url);
                const result = await response.json();
                setdata(result);
            } catch(err) {
                seterror(err);
            } finally {
                setloading(false);
            }
            
        }

        fetchData();
    }, [url])

    return {data, error, loading};
}

export default useFetch;