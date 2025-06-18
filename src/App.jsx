import { Navigate, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import { Toaster } from "react-hot-toast";
import { axiosInstance } from "./lib/axios.js";
import { useQuery } from "@tanstack/react-query";


const App = () => {

  const {data:authData, isLoading, isError} = useQuery(
    {
      queryKey: ["authUser"],
      queryFn: async () => {
        const res = await axiosInstance.get("/auth/me");  // axiosInstance is from axios.js
        return res.data;
      },
      retry: false // disable retry for auth check 
    }
  );

  const authUser = authData?.user // user.route.js me /me me user naam se defined h

  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />} /> {/* If token is present then show Homepage */}
        <Route path="/signup" element={!authUser? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/onboarding" element={authUser? <OnboardingPage /> :  <Navigate to="/login" />} />
        <Route path="/chat" element={authUser? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={authUser? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={authUser? <NotificationsPage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
