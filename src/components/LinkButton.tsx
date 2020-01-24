import * as React from "react";
import classNames from "classnames";

export interface LinkButtonProps {
    children?: React.ReactNode;
    value?: any;
    isActive: boolean;
    onClick?: (value: any) => void;
}
export function LinkButton({value, onClick, isActive, children}: LinkButtonProps) {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onClick && value && onClick(value);
    };

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
