import React, { useState } from "react";
import './Paging.css';
import Pagination from "react-js-pagination";

const Paging = (props) => {
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
    props.pageReload(page - 1);
    window.scrollTo(0, 0)
  };

  return (
    <div>
      <Pagination
        activePage={page}
        itemsCountPerPage={props.size}
        totalItemsCount={props.totalElements}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Paging;