import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tournaments from "./pages/Tournaments";
import TournamentDetails from "./pages/TournamentDetails";
import Teams from "./pages/Teams";
import Matches from "./pages/Matches";
import PointsTable from "./pages/PointsTable";

import Navbar from "./components/Navbar";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/tournaments" element={<Tournaments />} />

                <Route
                    path="/tournaments/:id"
                    element={<TournamentDetails />}
                />

                <Route path="/teams" element={<Teams />} />

                <Route path="/matches" element={<Matches />} />

                <Route
                    path="/points-table/:id"
                    element={<PointsTable />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;