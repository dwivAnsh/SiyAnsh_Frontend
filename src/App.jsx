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
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();
  const isAuthenticated = Boolean(authUser); // only true when token is present
  const isOnboarded = authUser?.isOnboarded; // only true when user is onboarded

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Homepage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />{" "}
        {/* If token is present then show Homepage */}
        
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to={
            isOnboarded ? "/" : "/onboarding"
          } />}
        />

        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to={
            isOnboarded ? "/" : "/onboarding"
          } />}
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
          path="/chat/:id"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={false}>
              <ChatPage />
            </Layout>
          ): (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )}
        />

        <Route
          path="/call/:id"
          element={isAuthenticated && isOnboarded? (
            <Layout showSidebar={false}>
              <CallPage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )}
        />

        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) :(
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
