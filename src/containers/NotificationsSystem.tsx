import * as React from "react";
import Notifications from 'react-notification-system-redux';
import { useSelector } from "react-redux";
import { RootState } from "../store";

export function NotificationsSystem() {
    const notifications = useSelector((state: RootState) => state.notifications);
    return <Notifications notifications={notifications} />;
}
