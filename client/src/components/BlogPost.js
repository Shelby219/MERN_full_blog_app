import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {useGlobalState} from '../config/store'
import {getPostFromId, deleteBlogPost} from '../services/blogPostServices'

const BlogPost = ({history, post, showControls}) => {

    const {store, dispatch} = useGlobalState()
    const {blogPosts} = store
    // If we don't have a post, return null

    if (!post) return null
    //console.log(post._id)
    const linkStyles = {
        textDecoration: 'none',
        color: 'black' 
    }
    const buttonStyles = {
        margin: '.5em',
        fontSize: '1em'
    }
    const {title, modified_date, category, content} = post 

    // Handle the delete button
    function handleDelete(event) { 
        event.preventDefault()
        const updatedPosts = blogPosts.filter((blogPost) => blogPost._id !== post._id)
        deleteBlogPost(post._id)
        .then((updatedPost) => {
            dispatch({
                type: "setBlogPosts",
                data: [...updatedPosts, updatedPost]
            })
            history.push("/") 
        })
        .catch(error =>  console.log(error.message))
    }
    


    // Handle the edit button
    function handleEdit(event) {
        event.preventDefault()
        history.push(`/posts/edit/${post._id}`)
    }

    return (
        <div>
            <Link style={linkStyles} to={`/posts/${post._id}`}>
            <div class="blog-posts">
                <h1 class="heading blog-title">{title}</h1>
                <p  class="blog-content">{modified_date.toLocaleString()}</p>
                <p  class="blog-content">{category}</p>
                <p  class="blog-content">{content}</p>
                {showControls && (
                    <div>
                        <button class="button"  onClick={handleDelete}>Delete</button>
                        <button class="button"  onClick={handleEdit}>Edit</button>
                    </div>
                )}
                </div>
            </Link>
        </div>
    )
}

export default BlogPost