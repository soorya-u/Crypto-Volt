import { Route, Routes, useLocation } from "react-router-dom";
import {
  CampaignDetails,
  CreateCampaign,
  AllCampaigns,
  Profile,
  Multisender,
  Home,
} from "./pages";
import { Navbar, Sidebar } from "./components/custom";
import img from "@/assets/bg.png";

export default function App() {
  const location = useLocation();
  return (
    <main
      style={
        location.pathname === "/"
          ? {
              backgroundImage: `url(${img})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }
          : {
              backgroundColor: "#141025",
            }
      }
      className="relative p-4 min-h-screen flex flex-row w-full bg-center bg-cover"
    >
      <div className="sm:flex hidden mr-7 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<AllCampaigns />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          \<Route path="/multi-sender" element={<Multisender />} />
        </Routes>
      </div>
    </main>
  );
}
