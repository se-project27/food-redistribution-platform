import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RoleSelection from "./pages/auth/RoleSelection";
import DonorDashboard from "./pages/donor/DonorDashboard";
import NGODashboard from "./pages/ngo/NGODashboard";
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import AddFood from "./pages/donor/AddFood";
import FoodStatus from "./pages/donor/FoodStatus";
import NearbyFood from "./pages/ngo/NearbyFood";
import AcceptedFood from "./pages/ngo/AcceptedFood";
import PickupTasks from "./pages/volunteer/PickupTasks";
import DeliveryHistory from "./pages/volunteer/DeliveryHistory";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role" element={<RoleSelection />} />
        <Route path="/donor" element={<DonorDashboard />} />
        <Route path="/ngo" element={<NGODashboard />} />
        <Route path="/volunteer" element={<VolunteerDashboard />} />
        {/* Donor routes*/}
        <Route path="/donor/add-food" element={<AddFood />} />
        <Route path="/donor/status" element={<FoodStatus />} />

        {/* NGO routes*/}
        <Route path="/ngo/nearby-food" element={<NearbyFood />} />
        <Route path="/ngo/accepted" element={<AcceptedFood />} />

        {/* Volunteer routes*/}
        <Route path="/volunteer/tasks" element={<PickupTasks />} />
        <Route path="/volunteer/history" element={<DeliveryHistory />} />
        

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
