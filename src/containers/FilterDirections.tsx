import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Filter, FilterFields } from "./Filter";
import { TodoFilters } from "../modules/Todo";
import { TodoListSortDirection } from "../api";

const fieldsOfDirection: Array<FilterFields<TodoListSortDirection>> = [
    { name: "Increase", value: "asc" },
    { name: "Decrease", value: "desc" },
];

export interface FilterDirectionsProps {}

export function FilterDirections() {
    const filters = useSelector(({ todo }: RootState) => todo.filters);

    console.log('render Pagination');
    return (
        <Filter<TodoFilters> title="Filter by" fields={fieldsOfDirection} fieldName="sortDirection" fieldValue={filters.sortDirection} />
    )
}
