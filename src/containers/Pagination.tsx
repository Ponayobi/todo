import * as React from "react";
import {LinkButton} from "../components/LinkButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {getTodoListRequest} from "../modules/Todo/actionApi";

enum PageTypes {
    Left = 'LEFT',
    Right = 'RIGHT',
}

const range = (from: number, to: number, step = 1): (string | number)[] => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};

const fetchPageNumbers = (totalPages: number, currentPage: number, pageNeighbours: number) => {
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) return range(1, totalPages);

    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

    let pages = range(startPage, endPage);

    const hasLeftSpill = startPage > 2;
    const hasRightSpill = (totalPages - endPage) > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
            const extraPages = range(startPage - spillOffset, startPage - 1);
            pages = [PageTypes.Left, ...extraPages, ...pages];
            break;
        }
        case (!hasLeftSpill && hasRightSpill): {
            const extraPages = range(endPage + 1, endPage + spillOffset);
            pages = [...pages, ...extraPages, PageTypes.Right];
            break;
        }
        case (hasLeftSpill && hasRightSpill):
        default: {
            pages = [PageTypes.Left, ...pages, PageTypes.Right];
            break;
        }
    }

    return [1, ...pages, totalPages];
};

export interface PaginationProps {}

export function Pagination() {
    const dispatch = useDispatch();
    const filter = useSelector(({ todo }: RootState) => todo.filter);

    const pageLimit = 3;
    const pageNeighbours = 2;
    const totalCount = useSelector(({ todo }: RootState) => todo.totalCount);
    const totalPages = Math.ceil(totalCount / pageLimit);

    if (totalPages === 1) return null;

    const pages = fetchPageNumbers(totalPages, filter.page, pageNeighbours);

    const handleClickPage = (data: number | PageTypes) => {

        let page = filter.page;

        switch (data) {
            case PageTypes.Left: {
                page -=  1;
                break;
            }
            case PageTypes.Right: {
                page +=  1;
                break;
            }
            default: {
                page = data;
                break;
            }
        }

        if (page === filter.page) return;

        dispatch(getTodoListRequest({
            ...filter,
            page
        }));
    };

    console.log('render Pagination');
    return (
        <ul className="pagination">
            {pages.map((page) => (
                <React.Fragment key={page}>
                    <li>
                        <LinkButton value={page} isActive={filter.page === page} onClick={handleClickPage}>
                            {page}
                        </LinkButton>
                    </li>
                    {' '}
                </React.Fragment>
            ))}
        </ul>
    )
}