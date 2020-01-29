import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
// import Image from "gatsby-image"

// receive id as prop? and match the id of the post with the author and print author gravatar, name and published date in this component on index page and the blog page

// useStaticQuery is used in components

import PropTypes from "prop-types"

const EntryMeta = ({ name, avatar, date }) => {   
    return (
      <div className="row">
        <img src={avatar} alt={name}/>
        <p>{name} on {date}</p>
      </div>
    )
}

EntryMeta.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  date: PropTypes.string
}

export default EntryMeta;