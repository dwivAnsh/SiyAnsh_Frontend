import { Navigate, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";

const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser); // only true when token is present
  const isOnboarded = authUser?.isOnboarded; // only true when user is onboarded

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Homepage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />{" "}
        {/* If token is present then show Homepage */}
        
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />}
        />

        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? <OnboardingPage /> : <Navigate to="/" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/chat"
          element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/call"
          element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/notifications"
          element={
            isAuthenticated ? <NotificationsPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
