import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Filter, FilterFields } from "./Filter";
import { TodoFilters } from "../modules/Todo";

enum PageTypes {
    Left = 'LEFT',
    Right = 'RIGHT',
}

const range = (from: number, to: number, step = 1): number[] => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};

const fetchPageNumbers = (totalPages: number, currentPage: number, pageNeighbours: number): Array<number | PageTypes> => {
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) return range(1, totalPages);

    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

    let pages = range(startPage, endPage);
    let result: Array<number | PageTypes>;

    const hasLeftSpill = startPage > 2;
    const hasRightSpill = (totalPages - endPage) > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
            const extraPages = range(startPage - spillOffset, startPage - 1);
            result = [PageTypes.Left, ...extraPages, ...pages];
            break;
        }
        case (!hasLeftSpill && hasRightSpill): {
            const extraPages = range(endPage + 1, endPage + spillOffset);
            result = [...pages, ...extraPages, PageTypes.Right];
            break;
        }
        case (hasLeftSpill && hasRightSpill):
        default: {
            result = [PageTypes.Left, ...pages, PageTypes.Right];
            break;
        }
    }

    return [1, ...result, totalPages];
};

export interface PaginationProps {}

export function Pagination() {
    const filters = useSelector(({ todo }: RootState) => todo.filters);

    const pageLimit = 3;
    const pageNeighbours = 2;
    const totalCount = useSelector(({ todo }: RootState) => todo.totalCount);
    const totalPages = Math.ceil(totalCount / pageLimit);

    if (totalPages === 1) return null;

    const pages = fetchPageNumbers(totalPages, filters.pageNumber, pageNeighbours);

    const paginationFields: Array<FilterFields<number>> = pages.map((page) => {
        switch (page) {
            case PageTypes.Right:
                return {
                    name: '...', value: undefined,
                };
            case PageTypes.Left:
                return {
                    name: '...', value: undefined,
                };
            default:
                return {
                    name: page.toString(), value: page,
                };
        }
    });

    console.log('render Pagination');
    return (
        <Filter<TodoFilters> fields={paginationFields} fieldName="pageNumber" fieldValue={filters.pageNumber} />
    )
}