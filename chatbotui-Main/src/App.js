import "./components/styles/style.css";
import axios from "axios";
import Flow from "./components/Pages/Flow";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/SignIn/Login";
import NotFound from "./components/reusable/NotFound";
import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import SignUp from "./components/SignUp/SignUp";
import { useCallback, useState } from "react";
import SuccessAlert from "./components/reusable/SuccessAlert";
import PublicRouting from "./components/routing/PublicRouting";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import ChatBot from "./components/ChatBot/ChatBot";
import Metrics from "./components/Metrics/Metrics";
import { ForgotPassword } from "./components/ResetPassword/ForgotPassword";
import Share from "./components/Pages/Share";
import Analyze from "./components/Pages/Analyze";
import ShareEmbed from "./components/ShareFlow/ShareEmbed";
import ShareLink from "./components/ShareFlow/ShareLink";

axios.interceptors.request.use(
  (config) => {
    const authorizationConfig = config;
    authorizationConfig.headers.common.Authorization = `Bearer ${localStorage.getItem(
      "token"
    )}`;
    return authorizationConfig;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axios.interceptors.response.use(
  (config) => config,
  (error) => {
    const response = error && error.response;
    if (response && response.status === 401) {
      const currUrl = window.location.href;
      if (currUrl && currUrl.indexOf("/login") === -1) {
        const oldToken = localStorage.getItem("token");
        if (oldToken) {
          localStorage.clear();
        }
        window.location.replace("/login");
      }
    } else if (response && response.status === 403) {
      setTimeout(() => {
        window.location.replace("/login");
      }, 3000);
    }
    return Promise.reject(error);
  }
);

const App = () => {
  const [successAlert, setSuccessAlert] = useState({
    showAlert: false,
    alertMessage: "",
    alertSeverity: "success",
  });
  const handleAlertClose = () => {
    setSuccessAlert((a) => ({ ...a, showAlert: false }));
  };
  const handleAlert = useCallback(
    (msg, severity) => {
      if (severity !== undefined) {
        setSuccessAlert(() => ({
          showAlert: true,
          alertMessage: msg,
          alertSeverity: severity,
        }));
      } else {
        setSuccessAlert((a) => ({
          ...a,
          showAlert: true,
          alertMessage: msg,
        }));
      }
    },
    [setSuccessAlert]
  );
  return (
    <div className="App">
      {successAlert.showAlert && (
        <SuccessAlert
          successAlert={successAlert}
          setSuccessAlert={setSuccessAlert}
          handleAlertClose={handleAlertClose}
        />
      )}
      <Router>
        <>
          <Routes>
            <Route
              exact
              path="/*"
              element={<NotFound handleAlert={handleAlert} />}
            />
            <Route
              exact
              path="login"
              element={
                <PublicRouting>
                  <Login handleAlert={handleAlert} />
                </PublicRouting>
              }
            />
            <Route
              exact
              path="signup"
              element={
                <PublicRouting>
                  <SignUp handleAlert={handleAlert} />
                </PublicRouting>
              }
            />
            <Route
              exact
              path="/forgot"
              element={
                <PublicRouting>
                  <ForgotPassword handleAlert={handleAlert} />
                </PublicRouting>
              }
            />
            <Route
              exact
              path=":token/preview"
              element={<ChatBot handleAlert={handleAlert} />}
            />
            <Route
              exact
              path="/chatbot"
              element={<ChatBot handleAlert={handleAlert} />}
            />
            <Route
              exact
              restricted={true}
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout handleAlert={handleAlert} />
                </ProtectedRoute>
              }
            >
              <Route
                exact
                path="dashboard"
                element={<Dashboard handleAlert={handleAlert} />}
              />

              <Route
                exact
                path="dashboard/:name"
                element={<Dashboard handleAlert={handleAlert} />}
              />

              <Route
                exact
                path="dashboard/:name/:id"
                element={<Dashboard handleAlert={handleAlert} />}
              />

              <Route
                exact
                path="bot/:botId"
                element={<Flow handleAlert={handleAlert} />}
              />

              <Route
                exact
                path="metrics"
                element={<Metrics handleAlert={handleAlert} />}
              />
              <Route
                exact
                path="share/:botId"
                element={<Share handleAlert={handleAlert} />}
              >
                <Route
                  exact
                  path="embed"
                  element={<ShareEmbed handleAlert={handleAlert} />}
                />
                <Route
                  exact
                  path="link"
                  element={<ShareLink handleAlert={handleAlert} />}
                />
              </Route>

              <Route
                exact
                path="analyze/:botId"
                element={<Analyze handleAlert={handleAlert} />}
              />
            </Route>
          </Routes>
        </>
      </Router>
    </div>
  );
};
export default App;
