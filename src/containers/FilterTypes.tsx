import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Filter, FilterFields, FilterProps } from "./Filter";
import { TodoFilters } from "../modules/Todo";
import { TodoListSortField } from "../api";

const fieldsOfType: Array<FilterFields<TodoListSortField>> = [
    { name: "Creation", value: "id" },
    { name: "Status", value: "status" },
    { name: "Username", value: "username" },
    { name: "Email", value: "email" },
];

export interface FilterTypesProps {}

const MemoFilter = React.memo<FilterProps<TodoFilters>>(Filter);

export function FilterTypes() {
    const sortField = useSelector(({ todo }: RootState) => todo.filters.sortField);

    return (
        <MemoFilter
            title="Filter by"
            fields={fieldsOfType}
            fieldName="sortField"
            fieldValue={sortField}
        />
    )
}
