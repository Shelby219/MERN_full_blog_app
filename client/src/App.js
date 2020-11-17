import React, {useReducer, useEffect} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import './style.css';
import Nav from './components/Nav'
import BlogPosts from './components/BlogPosts'
import BlogPost from './components/BlogPost'
import NewBlogPost from './components/NewBlogPost'
import EditBlogPost from './components/EditBlogPost'
import SignIn from './components/SignIn'
import Register from './components/Register'
import stateReducer from './config/stateReducer'
import {StateContext} from './config/store'
import {getPostFromId, getAllBlogPosts} from './services/blogPostServices'


const App = () => {

  // initial state for state reducer
  const initialState = {
    blogPosts: [],
    loggedInUser: null
  }

  // Create state reducer store and dispatcher
  const [store, dispatch] = useReducer(stateReducer,initialState)
  const {blogPosts} = store


  function fetchBlogPosts(){
    getAllBlogPosts()
        .then((blogData) => {
          dispatch({
            type: "setBlogPosts",
            data: blogData
          })
        })
        .catch(error =>  console.log(error))
  }

  useEffect(() => {
    fetchBlogPosts()
  },[])

  return (
    <div class="main">
    <div class="container">
      <StateContext.Provider value={{store,dispatch}}>
        <BrowserRouter>
          <Nav />
          <h1 class="heading title">Blog App</h1>
          <Route exact path="/" component={BlogPosts} />
          <Route exact path="/posts/:id" render={(props) => <BlogPost {...props} post={getPostFromId(blogPosts, props.match.params.id)} showControls /> } />
          <Route exact path="/posts/new" component={NewBlogPost} />
          <Route exact path="/posts/edit/:id" component={EditBlogPost} /> 
          <Route exact path="/auth/login" component={SignIn} />
          <Route exact path="/auth/register" component={Register} />
        </BrowserRouter>
      </StateContext.Provider>
      </div>
    </div>
  )
}

export default App
