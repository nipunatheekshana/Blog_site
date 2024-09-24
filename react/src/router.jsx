import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from './views/login';
import Register from './views/register';
import Blogs from './views/blogs';
import NotFound from './views/NotFound';
import DefaultLayout from './layouts/DefaultLayout';
import GuestLayout from './layouts/GuestLayout';
import UserBlogs from './views/UserBlogs';
import BlogForm from './views/BlogForm';

const router = createBrowserRouter([
    //loged users
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/user_blogs" />,
            },
            ,
            {
                path: '/user_blogs',
                element: <UserBlogs />,
            },
            {
                path: '/blogs/new',
                element: <BlogForm key="blogCreate" />,
            },
            {
                path: '/blogs/:id',
                element: <BlogForm key="blogUpdate" />,
            }

        ],
    },

    //for guest
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/blogs',
                element: <Blogs />,
            },

        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
])
export default router;
