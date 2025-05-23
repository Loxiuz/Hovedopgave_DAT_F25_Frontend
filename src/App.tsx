import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import ExportPage from './export/ExportPage';
import Layout from './layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/export" />} />
          <Route path="/export" element={<ExportPage />} />
          <Route path="/import" element={<h1>Import</h1>} />
          {/* <Route path="/export" element={<ExportPage />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App
