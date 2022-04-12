import React from 'react'
import {Link} from "react-router-dom";
import routes from "../constants/contsRoutes";

export const Page404 = () => {

    return (
        <div className="page-wrap d-flex flex-row align-items-center pt-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                        <span className="display-4 d-block">Opps, Something wrong! 404</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                             className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                            <path
                                d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <div className='d-flex justify-content-center mt-4'>
                            <div className="mb-4 lead me-lg-2">The page you are looking for was not found</div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                 className="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </div>

                        <Link to={routes.home.href} className="text-dark">Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}