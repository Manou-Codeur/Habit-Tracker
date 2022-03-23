import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Views/home/home";
import Auth from "./Layouts/auth/auth";
import Dashboard from "./Views/dashboard/dashboard";
import NotFound from "./Views/NotFound/notFound";
import NavBar from "./Components/navBar/navBar";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notFound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notFound" />} />
      </Routes>
    </>
  );
};

export default App;
