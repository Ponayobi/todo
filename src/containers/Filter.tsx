import * as React from "react";
import {LinkButton} from "../components/LinkButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {getTodoList} from "../modules/Todo/actionApi";
import {generateKey} from "../utils";

export interface FilterProps<T> {
    title?: string;
    fields: FilterFields<T[keyof T]>[];
    fieldName: keyof T;
    fieldValue: T[keyof T];
}

export type FilterFields<T> = {
    name: string,
    value?: T,
}

export function Filter<T>({title, fields, fieldName, fieldValue}: FilterProps<T>) {
    const dispatch = useDispatch();
    const filter = useSelector(({ todo }: RootState) => todo.filters);

    const handleClickFilter = (value: T[keyof T]) => {
        if (fieldValue === value) return;

        dispatch(getTodoList({
            ...filter,
            [fieldName]: value,
        }));
    };

    console.log('render Filter');
    return (
        <ul className="filters">
            {title && (
                <React.Fragment>
                    <li>
                        {title}
                    </li>
                    {' '}
                </React.Fragment>
            )}

            {fields.map((field, index) => (
                <React.Fragment key={generateKey(index)}>
                    <li>
                        <LinkButton value={field.value} isActive={fieldValue === field.value} onClick={field.value && handleClickFilter}>
                            {field.name}
                        </LinkButton>
                    </li>
                    {' '}
                </React.Fragment>
            ))}
        </ul>
    )
}
