import React from "react";

export const Loader = () => {
    return (
            <div className="text-center w-75 m-auto m-0 pt-5 d-flex flex-column align-items-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <strong className='mt-2'><h3>Loading...</h3></strong>
            </div>
        )

}