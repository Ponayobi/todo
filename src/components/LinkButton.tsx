import * as React from "react";
import classNames from "classnames";

export interface LinkButtonTypes {
    children?: React.ReactNode;
    value: string | number | symbol;
    isActive: boolean;
    onClick(value: string | number | symbol): void;
}
export function LinkButton({value, onClick, isActive, children}: LinkButtonTypes) {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        onClick(value);
    };

    console.log('render LinkButton');
    return (
        <a
            href={`#`}
            className={classNames({
                selected: isActive
            })}
            onClick={handleClick}
        >
            {children}
        </a>
    );
}