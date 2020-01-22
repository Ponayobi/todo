import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Filter, FilterFields } from "./Filter";
import { TodoFilters } from "../modules/Todo";
import { TodoListSortField } from "../api";

const fieldsOfType: Array<FilterFields<TodoListSortField>> = [
    { name: "Creation", value: "id" },
    { name: "Status", value: "status" },
    { name: "Username", value: "username" },
    { name: "Email", value: "email" },
];

export interface FilterTypesProps {}

export function FilterTypes() {
    const filters = useSelector(({ todo }: RootState) => todo.filters);

    console.log('render FilterTypes');
    return (
        <Filter<TodoFilters>
            title="Filter by"
            fields={fieldsOfType}
            fieldName="sortField"
            fieldValue={filters.sortField}
        />
    )
}
