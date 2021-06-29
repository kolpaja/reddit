import React from 'react'

import axios from "axios"

export const getComments = async (subredditId, postId) => {
    return await axios({
        method: "get",
        url: `https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/${subredditId}/posts/${postId}/comments`,
        responseType: "stream",
    })
        .then((res) => {
            const number = res.data.length
            console.log("comments number", number);
        })
        .catch((error) => console.log(error));

}