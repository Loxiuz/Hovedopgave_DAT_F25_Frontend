import { useNavigate } from 'react-router-dom';
import type { LayoutProps } from '../types';
import './Layout.css';

export default function Layout({ children }: Readonly<LayoutProps>) {

    const navigate = useNavigate()
    return (
        <div id="layout">
            <nav id="menuBar">
                <ul>
                    <li>
                        <button
                            onClick={() => {
                                navigate('/export');
                            }}
                        >
                            Export
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                navigate('/import');
                            }}
                        >Import</button>
                    </li>
                    <li>
                        <button>Flight Schedule</button>
                    </li>
                    <li>
                        <button>Cargo Tracking</button>
                    </li>
                    <li>
                        <button>Warehouse</button>
                    </li>
                    <li>
                        <button>Users</button>
                    </li>
                    <li>
                        <button>Settings</button>
                    </li>
                </ul>
            </nav>
            <div id="content">
                {children}
            </div>
        </div>
    )
}