import { useEffect, useState } from 'react'
import axios from "axios";

export default function usePosts(subredditId) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios({
            method: "get",
            url: `https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/${subredditId}/posts/`,
        })
            .then((res) => {
                setPosts(res.data);
            })
            // eslint-disable-next-line
            .catch((error) => console.log(error));
        // eslint-disable-next-line
    }, []);

    return { posts }
}

