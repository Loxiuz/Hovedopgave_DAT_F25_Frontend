import { useNavigate } from 'react-router-dom';
import type { LayoutProps } from '../types';
import './Layout.css';

export default function Layout({ children }: Readonly<LayoutProps>) {

    const menuItems = [
        ["/export", "Export"],
        ["/import", "Import"],
        ["/flightSchedules", "Flight Schedules"],
        ["/cargoTracking", "Cargo Tracking"],
        ["/warehouse", "Warehouse"],
        ["/users", "Users"],
        ["/settings", "Settings"],
    ]

    const { pathname } = window.location;

    function renderMenuList(path: string, label: string) {

        if (pathname === path) {
            return (
                <li>
                    <button
                        onClick={() => {
                            navigate(path);
                        }}
                        className="menuListItemActive"
                    >
                        {label}
                    </button>
                </li>
            )
        } else {
            return (
                <li>
                    <button
                        onClick={() => {
                            navigate(path);
                        }}
                    >
                        {label}
                    </button>
                </li>
            )
        }
    }

    const navigate = useNavigate()
    return (
        <div id="layout">
            <nav id="menuBar">
                <ul>
                    {menuItems.map(([path, label]) => {
                        return renderMenuList(path, label);
                    })}
                </ul>
            </nav>
            <div id="content">
                {children}
            </div>
        </div>
    )
}