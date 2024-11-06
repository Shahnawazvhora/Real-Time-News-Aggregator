import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoPageFound from "../Images/No-page-found.jpg";
import Pagination from "./Pagination";
import Logo from "../Images/news-logo-design1.jpg";
import Footer from "./Footer";

const NewsApi = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCureentPage] = useState(1);
    const [searchTitle, setSearchTitle] = useState("react");
    const [pageError, setPageError] = useState(false);
    const postPerPage = 9;
    const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

    useEffect(() => {
        if (searchTitle) {
            fetch(`https://newsapi.org/v2/everything?q=${searchTitle}&apiKey=${API_KEY}`)
                .then((response) => response.json())
                .then((data) => {
                    setPosts(data.articles);
                    setPageError(false);
                })
                .catch((error) => {
                    setPageError(true);
                    console.error(error);
                });
        } else {
            // Fetch default posts if searchTitle is empty
            fetch(`https://newsapi.org/v2/everything?q=react&apiKey=${API_KEY}`)
                .then((response) => response.json())
                .then((data) => {
                    setPosts(data.articles);
                    setPageError(false);
                })
                .catch((error) => {
                    setPageError(true);
                    console.error(error);
                });
        }
    }, [searchTitle, API_KEY]);

    const IndexOfLastPost = currentPage * postPerPage;
    const IndexOfFirstPost = IndexOfLastPost - postPerPage;
    const CurrentPost = posts?.slice(IndexOfFirstPost, IndexOfLastPost);

    const PageNumbers = [];

    for (let i = 1; i <= Math.ceil(posts?.length / postPerPage); i++) {
        PageNumbers.push(i);
    }

    const handelNextPage = () => {
        if (currentPage < PageNumbers.length) {
            setCureentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCureentPage(currentPage - 1);
        }
    };

    return (
        <>
            <nav className="navbar fixed-top navbar-light bg-warning">
                <div className="container-fluid position-relative">
                    <div className="navbar-brand fw-bold fs-3" onClick={() => setCureentPage(1)}>
                        <img src={Logo} alt="logo" className="logo-image" />
                    </div>
                    <form className="d-flex">
                        <input
                            className="form-control me-2 position-relative input-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(e) => setSearchTitle(e.target.value)}
                        />
                        <div className="position-absolute serach-svg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </div>
                    </form>
                </div>
            </nav>
            <h1 className="mt-5 pt-5 news-heading">
                <span className="text-warning">Flash</span> News
            </h1>

            <div className="container">
                <div className="row">
                    {CurrentPost && CurrentPost.length > 0 ? (
                        CurrentPost.map((items, index) => {
                            return (
                                <div className="col-md-4 mt-4" key={index}>
                                    {items.urlToImage ?
                                        <div className="card card-container border-warning">
                                            <div className="card-body news-card">
                                                <img src={items.urlToImage} className="card-img-top card-image" alt="Images" />
                                                <h5 className="card-title text-start text-warning fst-italic">
                                                    {items.title && items.title.length < 20
                                                        ? items.title
                                                        : items.title?.substring(0, 70) + "..."}
                                                </h5>
                                                <p className="card-text text-start fst-italic">
                                                    {items.description && items.description.length < 100
                                                        ? items.description
                                                        : items.description?.substring(0, 70) + "..."}
                                                </p>
                                                <p className="text-start text-muted">
                                                    {items.publishedAt}
                                                </p>
                                                <button className="btn btn-outline-warning button-card ">
                                                    <Link to={items.url} target="_blank">
                                                        Learn More
                                                    </Link>
                                                </button>
                                            </div>
                                        </div>
                                        : null}
                                </div>
                            );
                        })
                    ) : (
                        <img src={NoPageFound} alt="NoPageFound" className="NoPageFound-image" />
                    )}
                </div>
            </div>

            {!pageError && CurrentPost && CurrentPost.length > 0 && (
                <Pagination
                    handlePrevPage={handlePrevPage}
                    handelNextPage={handelNextPage}
                    PageNumbers={PageNumbers}
                    setCureentPage={setCureentPage}
                    currentPage={currentPage}
                />
            )}

            <Footer />
        </>
    );
};

export default NewsApi;
