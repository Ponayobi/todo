import * as React from "react";
import { useDispatch } from "react-redux";
import { getTodoList } from "../modules/Todo/actionApi";
import { LinkButton, LinkButtonProps } from "../components/LinkButton";

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

const MemoLinkButton = React.memo<LinkButtonProps>(LinkButton);

export function Filter<T>({title, fields, fieldName, fieldValue}: FilterProps<T>) {
    const dispatch = useDispatch();

    const handleClickFilter = React.useCallback((value: T[keyof T]) => {
        dispatch(getTodoList({
            [fieldName]: value,
        }));
    }, [fieldName, dispatch]);

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
                <React.Fragment key={index}>
                    <li>
                        <MemoLinkButton value={field.value} isActive={fieldValue === field.value} onClick={field.value && handleClickFilter}>
                            {field.name}
                        </MemoLinkButton>
                    </li>
                    {' '}
                </React.Fragment>
            ))}
        </ul>
    )
}
