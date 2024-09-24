import axios from "axios";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function UserBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getUserBlogs();
    }, []);

    const getUserBlogs = () => {
        setLoading(true);
        axiosClient
            .get("/blogs")
            .then(({ data }) => {
                console.log(data);
                setBlogs(data.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };
    const onDelete = (blog) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) {
            return;
        }
        axiosClient.delete(`/blogs/${blog.id}`).then(() => {
            setNotification("Blog was successfully Deleted");

            getUserBlogs();
        });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>My Blogs</h1>
                <Link to="/blogs/new" className="btn-add">
                    Add new blog
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            {/* <th>Description</th> */}
                            <th>Created date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="text-center loading-message"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            blogs.map((b) => (
                                <tr key={b.id}>
                                    <td>{b.id}</td>
                                    <td>{b.title}</td>
                                    <td>{b.created_at}</td>
                                    <td>
                                        <Link
                                            to={`/blogs/${b.id}`}
                                            className="btn-edit"
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            onClick={() => onDelete(b)}
                                            className="btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
