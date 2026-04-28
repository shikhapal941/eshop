import "./App.css";
import { Box, CircularProgress } from "@mui/material";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Checkout from "./components/Checkout";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import Login from "./components/Login";
import { Products } from "./components/Products";
import Register from "./components/Register";
import { useAuth } from "./context/useAuth";

function RequireAuth() {
  const { user, authReady } = useAuth();
  const location = useLocation();

  if (!authReady) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress aria-label="Loading" />
      </Box>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}

function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function HomePage() {
  return (
    <>
      <Home />
      <Products />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="shop" element={<HomePage />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
