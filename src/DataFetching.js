import React, { useEffect, useState } from 'react'
import axios from 'axios'

function DataFetching() {
    const [posts, setPost] = useState([])
    useEffect(() => {

        axios({
            method: 'get',
            url: 'https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/',
            responseType: 'stream'
        })
            .then(res => console.log("res: ", res))
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <ul>
                {
                    posts.map(post => {
                        <li key={post.id}>{post.title}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default DataFetching
