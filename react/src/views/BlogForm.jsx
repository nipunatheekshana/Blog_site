import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function BlogForm() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const navigate =useNavigate();
    const {setNotification} = useStateContext();
    const [blog, setBlog] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient
                .get(`/blogs/${id}`)
                .then(({ data }) => {
                    console.log(data);
                    setBlog(data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, []);

    const onSubmit = (ev) => {
        ev.preventDefault();

        if (blog.id) {
            axiosClient
                .put(`/blogs/${blog.id}`, blog)
                .then((red) => {
                    console.log(red);
                    setNotification("Blog was successfully updated");
                    navigate("/user_blogs");
                    setErrors(null);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/blogs", blog)
                .then(() => {
                    setNotification("Blog was successfully created");

                    navigate("/user_blogs");
                    setErrors(null);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {blog.id && <h1>Edit Blog</h1>}
            {!blog.id && <h1>New Blog</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}

                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input  value={blog.title} onChange={ev=>setBlog({...blog, title: ev.target.value})} placeholder="Title" />
                        <textarea  value={blog.description} onChange={ev=>setBlog({...blog, description: ev.target.value})} placeholder="Content" />
                            <button className="btn"> Save </button>
                    </form>
                )}
            </div>
        </>
    );
}
