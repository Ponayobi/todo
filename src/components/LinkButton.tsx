import * as React from "react";
import classNames from "classnames";

export interface LinkButtonTypes {
    children?: React.ReactNode;
    value?: any;
    isActive: boolean;
    onClick?: (value: any) => void;
}
export function LinkButton({value, onClick, isActive, children}: LinkButtonTypes) {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClick && onClick(value);
    };

    console.log('render LinkButton');
    return (
        <button
            className={classNames("link-btn", {
                selected: isActive,
                clickable: !!onClick,
            })}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}