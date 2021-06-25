import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Subreddits() {
    const [subReddits, setSubReddits] = useState([])
    useEffect(() => {

        axios({
            method: 'get',
            url: 'https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/',
            responseType: 'stream'
        })
            .then(res => {
                setSubReddits(res.data)
                console.log("res.data", res.data)
            })
            .catch(error => console.log(error))
    }, [])
    return (
        <div>

            <ul>subreddits

                {subReddits.map(subreddit => {
                    return <Link to={{ pathname: `/r/${subreddit.handle}/`, state: { id: subreddit.id } }}  ><li key={subreddit.id}>{subreddit.title}</li></Link>
                })
                }
            </ul>
        </div>
    )
}

export default Subreddits

