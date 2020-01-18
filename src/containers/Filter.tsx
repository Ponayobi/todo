import * as React from "react";
import {LinkButton} from "../components/LinkButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {getTodoListRequest} from "../modules/Todo/actionApi";
import { GetTodoListRequest } from "../api";

export interface FiltersProps {
    title: string;
    fields: FilterFields<GetTodoListRequest[keyof GetTodoListRequest]>[];
    fieldName: keyof GetTodoListRequest;
}

export type FilterFields<T> = {
    name: string,
    value: T,
}

export function Filter({title, fields, fieldName}: FiltersProps) {
    const dispatch = useDispatch();
    const filter = useSelector(({ todo }: RootState) => todo.filter);

    const handleClickFilter = (value: GetTodoListRequest[keyof GetTodoListRequest]) => {
        if (filter[fieldName] === value) return;

        dispatch(getTodoListRequest({
            ...filter,
            [fieldName]: value,
        }));
    };

    console.log('render Filter');
    return (
        <ul className="filters">
            <li>
                {title}
            </li>
            {' '}

            {fields.map((field) => (
                <React.Fragment>
                    <li>
                        <LinkButton value={field.value} isActive={filter[fieldName] === field.value} onClick={handleClickFilter}>
                            {field.name}
                        </LinkButton>
                    </li>
                    {' '}
                </React.Fragment>
            ))}
        </ul>
    )
}
