import React from 'react'
import { NextPage } from 'next'

const IndexPage: NextPage = () => {
  return (
    <h1>Spotify <a href="spotify-remote-control://--" rel="noopener noreferrer">open app</a> or <a href="exp://exp.host/@suncin/spotify-remote-control">expo</a></h1>
  )
}

export default IndexPage
