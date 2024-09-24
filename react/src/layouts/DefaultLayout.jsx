import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";


export default function DefaultLayout() {
    const { user, token,setUser ,setToken} = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post('/logout').then(() => {
            setUser({});
            setToken(null);
        })
    }
    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            setUser(data);
        })
    },[])
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/user_blogs">My blogs</Link>
                <Link to="/create_blog">Create blog</Link>
            </aside>
            <div className="content">
                <header>
                    <div>header</div>

                    <div>{user.name}
                        <a className="btn-logout" href="#" onClick={onLogout} >Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
