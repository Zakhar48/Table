import React from "react";


const Pagination = ({ countData,totalCountries,paginate }) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalCountries / countData);i++){
        pageNumbers.push(i)
    }
    return (
        <div className="paginationDiv">
            <ul className="pagination">
                {    
                    pageNumbers.map(number => (
                        <li className="page-item" key={number}>
                            <a href="#" className="page-link" onClick={()=> paginate(number)}>
                                {number}
                            </a>
                        </li>
                    ))
                }

            </ul>

        </div>
    )
}

export default Pagination