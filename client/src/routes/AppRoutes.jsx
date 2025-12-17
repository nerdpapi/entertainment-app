import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import TVSeries from "../pages/TVSeries";
import Bookmarks from "../pages/Bookmarks";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "../components/ProtectedRoute";
import Details from "../pages/Details";
import AppLayout from "../layout/AppLayout";
import SearchResults from "../pages/SearchResults";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout>
  <Home />
</AppLayout>} />
      <Route path="/movies" element={<AppLayout><Movies /></AppLayout>} />
      <Route path="/tv" element={<AppLayout><TVSeries /></AppLayout>} />
      <Route path="/details/:type/:id" element={<AppLayout><Details /></AppLayout>} />
      <Route path="/bookmarks" element={<AppLayout><ProtectedRoute><Bookmarks /></ProtectedRoute></AppLayout>} />
      <Route path="/search" element={<AppLayout><SearchResults /></AppLayout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
