import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import {divStyles, inputStyles, labelStyles} from '../styles'
import {useGlobalState} from '../config/store'
import {addBlogPost} from "../services/blogPostServices"

const NewBlogPost = ({history}) => {
    const textAreaStyles = {
        height: "200px",
        margin: ".5em",
        width: "70vw"
    }

    // Gets the next available id for a new post 
    function getNextId(){
        const ids = blogPosts.map((post) => post._id)
        return ids.sort()[ids.length-1] + 1
    }

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        // const nextId = getNextId()    
        const newPost = {
            // _id: nextId,
            title: formState.title,
            category: formState.category || "general",
            modified_date: new Date(),
            content: formState.content
        }
        addBlogPost(newPost)
            .then((newPost) => {
                dispatch({
                    type: "setBlogPosts",
                    data: [...blogPosts, newPost]
                })
                history.push(`/posts/${newPost._id}`)
            })
            .catch(error =>  console.log(error))
    }
    const initialFormState = {
        title: "",
        category: "",
        content: ""
    } 
    const [formState,setFormState] = useState(initialFormState)
    const {store, dispatch} = useGlobalState()
    const {blogPosts} = store

    return (
        <div class="form-wrapper">
        <form id="newPostForm" onSubmit={handleSubmit}>
        <div class="form-styles">
                <label class="form-label">Title</label>
                <input class="form-input" required type="text" name="title" placeholder="Enter a title" onChange={handleChange}></input>
            </div>
            <div class="form-styles">
                <label class="form-label">Category</label>
                <input class="form-input" type="text" name="category" placeholder="Enter a category" onChange={handleChange}></input>
            </div>
            <div class="form-styles">
                <label class="form-label">Content</label>
                <textarea form="newPostForm" required class="form-input-text"  name="content" placeholder="Enter post here" onChange={handleChange}></textarea>
            </div>
            <input class="button" type="submit" value="Add post"></input>
        </form>
        </div>
    ) 
}

export default withRouter(NewBlogPost)