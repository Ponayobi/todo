import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Filter, FilterFields, FilterProps } from "./Filter";
import { TodoFilters } from "../modules/Todo";
import { TodoListSortDirection } from "../api";

const fieldsOfDirection: Array<FilterFields<TodoListSortDirection>> = [
    { name: "Increase", value: "asc" },
    { name: "Decrease", value: "desc" },
];

export interface FilterDirectionsProps {}

const MemoFilter = React.memo<FilterProps<TodoFilters>>(Filter);

export function FilterDirections() {
    const sortDirection = useSelector(({ todo }: RootState) => todo.filters.sortDirection);

    return (
        <MemoFilter
            title="Sorted by"
            fields={fieldsOfDirection}
            fieldName="sortDirection"
            fieldValue={sortDirection}
        />
    )
}
