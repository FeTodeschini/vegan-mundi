import { enumPagination } from "@/_lib/enums";
import config from '../_lib/config';
import '../_styles/pagination.css';
import { useState } from "react";

const PaginationBar = ({page, onPageChange, pageNumber, totalPages}:{page: number, onPageChange: React.Dispatch<React.SetStateAction<number>>, pageNumber: number, totalPages: number}) => {
    const [activePage, setActivePage] = useState<Number>(0);

    const pageSize = Number(config.pageSize);

    const pageNumbers = Array.from({length: totalPages}, (_, index)=> index)

    const handlePageChange = (navigationMode: number, specificPage?: number| null) => {
        const currentPage = pageNumber;

        switch (navigationMode) {
            case enumPagination.FIRST_PAGE:
                onPageChange(0);
                setActivePage(0);
                break;
            case enumPagination.PREVIOUS_PAGE:
                if (currentPage > 0 ) {
                    onPageChange(currentPage - 1);
                    setActivePage(currentPage - 1);
                }
                break;
            case enumPagination.NEXT_PAGE:
                if (currentPage < totalPages -1 && totalPages > 1) {
                    onPageChange(currentPage + 1);
                    setActivePage(currentPage + 1);
                }
                break;
            case enumPagination.LAST_PAGE:
                onPageChange((totalPages-1));
                setActivePage((totalPages-1))
                break;
            case enumPagination.SPECIFIC_PAGE:
                onPageChange(specificPage!);
                setActivePage(specificPage!)
                break;                
          }
    }

    return (
            <div className="pagination-bar">        
                <span className="heading-tertiary">Showing page {page + 1} of {totalPages}</span>
                <div className="pagination-bar__navigation">
                    <span className="pagination-bar__navigation-button--medium" onClick={()=>handlePageChange(enumPagination.FIRST_PAGE)}>&lt;&lt; First</span>
                    <span className="pagination-bar__navigation-button--medium" onClick={()=>handlePageChange(enumPagination.PREVIOUS_PAGE)}>&lt; Previous</span>
                    {
                        pageNumbers.map((number)=>(
                            <span
                                key={number} 
                                className={`pagination-bar__navigation-button ${activePage===number ? 'pagination-bar__navigation-button--active' : ''}`}
                                onClick={()=>handlePageChange(enumPagination.SPECIFIC_PAGE, number)}>
                                    {number +1}
                            </span>
                        ))
                    }
                    <span className="pagination-bar__navigation-button--medium" onClick={()=>handlePageChange(enumPagination.NEXT_PAGE)}>Next &gt;</span>
                    <span className="pagination-bar__navigation-button--medium" onClick={()=>handlePageChange(enumPagination.LAST_PAGE)}>Last &gt;&gt;</span>
                </div>
            </div>
    )
}

export default PaginationBar;