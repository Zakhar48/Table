import React from "react";


const Pagination = ({ pageLimit, skip, setSkip, limit }) => {

    return (
        <div className="paginationDiv">

            <button onClick={() => {

                if (skip >= pageLimit) {
                    setSkip(skip - pageLimit)
                }


            }}>prev</button>
            <button onClick={() => {
                console.log(pageLimit)

                if (limit >= 1) {
                    setSkip(pageLimit + skip)
                }


            }}>next</button>

        </div>
    )
}

export default Pagination