import api from "../config/api"

// Returns a single post based on the id provided
function getPostFromId(blogPosts,id) {
    //console.log(id)
    //console.log(blogPosts)
    const post =  blogPosts.find((post) =>  post._id === id)
    return post
}

// Returns all blog posts from the server
async function getAllBlogPosts(){
    const response = await api.get("/posts")
    return response.data
}

// Adds a blog post on the server
async function addBlogPost(newPost) {
    const response = await api.post("/posts", newPost)
    return response.data
}

// Edit on the server
async function editBlogPost(editPost, id) {
    const response = await api.put(`/posts/${id}`, editPost)
    return response.data
}

// Deleteblog post on the server
async function deleteBlogPost(id) {
    const response = await api.delete(`/posts/${id}`)
    return response.data
}



export {
    getPostFromId,
    getAllBlogPosts,
    addBlogPost,
    editBlogPost,
    deleteBlogPost
}