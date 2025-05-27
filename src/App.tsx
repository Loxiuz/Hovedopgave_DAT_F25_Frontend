import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ExportPage from "./export/ExportPage";
import Layout from "./layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/export" />} />
          <Route path="/export" element={<ExportPage />} />
          <Route path="/import" element={<h1>Import</h1>} />
          <Route path="/flight-schedules" element={<h1>Flight Schedules</h1>} />
          <Route path="/cargo-tracking" element={<h1>Cargo Tracking</h1>} />
          <Route path="/warehouse" element={<h1>Warehouse</h1>} />
          <Route path="/users" element={<h1>Users</h1>} />
          <Route path="/settings" element={<h1>Settings</h1>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
