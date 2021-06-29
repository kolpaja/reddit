import { useEffect, useState } from 'react'
import axios from "axios";

export default function useSubreddits() {
    const [subReddits, setSubReddits] = useState([]);
    useEffect(() => {
        axios({
            method: "get",
            url: "https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/",
        })
            .then((res) => {
                setSubReddits(res.data)
            })
            .catch((error) => console.log(error));
    }, []);
    return { subReddits }
}
