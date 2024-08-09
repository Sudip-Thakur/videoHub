import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Create from './pages/Create.jsx'
import Home from './pages/Home.jsx'
import Liked from './pages/Liked.jsx'
import Search from './pages/Search.jsx'
import Subscription from './pages/Subscription.jsx'
import Video from './pages/Video.jsx'
import WatchHistory from './pages/WatchHistory.jsx'
import Playlist from './pages/Playlist.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Channel from './pages/Channel.jsx'
import MyChannel from './pages/MyChannel.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='liked' element={<Liked/>}/>
      <Route path='playlists' element={<Playlist/>}/>
      <Route path='search/:keyword' element={<Search/>}/>
      <Route path='subscribed' element={<Subscription/>}/>
      <Route path='video/:videoId' element={<Video/>}/>
      <Route path='watch-history' element={<WatchHistory/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='channel/:channelId' element={<Channel/>}/>
      <Route path='mychannel' element={<MyChannel/>}/>
      <Route path='create' element={< Create/>}></Route>
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />  
    </AuthProvider>
  </React.StrictMode>,
)
