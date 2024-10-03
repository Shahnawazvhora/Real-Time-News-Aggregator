import React from 'react'
import { Link } from 'react-router-dom'

const Pagination = ({handlePrevPage, handelNextPage, currentPage, setCureentPage, PageNumbers}) => {
  return (
    <>
    {/* https://levelup.gitconnected.com/a-simple-guide-to-pagination-in-react-facd6f785bd0 */}
    
      <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center mt-4">
                        <li className="page-item" onClick={handlePrevPage}>
                            <Link className="page-link text-dark border-warning" to="/" tabIndex="-1">Previous</Link>
                        </li>
                        {
                            PageNumbers.map((PageNumber) => {
                                return (
                                    <div key={PageNumber} onClick={() => setCureentPage(PageNumber)}>
                                        <li className={PageNumber === currentPage ? "page-item active" : ""} aria-current="page"><Link className="page-link text-dark border-warning" to="/">{PageNumber}</Link></li>
                                    </div>
                                )
                            })
                        }
                        <li className="page-item" onClick={handelNextPage}>
                            <Link className="page-link text-dark border-warning" to="/">Next</Link>
                        </li>
                    </ul>
                </nav>
    </>
  )
}

export default Pagination
