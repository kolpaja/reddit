import { useState, useEffect } from 'react'
import axios from "axios";

export default function useComments(subredditId, id) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        axios({
            method: "get",
            url: `https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/${subredditId}/posts/${id}/comments`,
        })
            .then((res) => {
                setComments(res.data);
            })
            .catch((error) => console.log(error));
        // eslint-disable-next-line
    }, []);
    return { comments }
}
