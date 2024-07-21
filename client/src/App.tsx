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
      className="relative flex min-h-screen w-full flex-row bg-cover bg-center p-4"
    >
      <div className="relative mr-7 hidden sm:flex">
        <Sidebar />
      </div>

      <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
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
