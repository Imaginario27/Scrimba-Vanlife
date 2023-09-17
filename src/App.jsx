/** React Router *******/
import { BrowserRouter, Routes, Route } from "react-router-dom"

/** Mirage JS Server *******/
import "./server"

/** Pages *******/
import Home from "./pages/Home"
import About from "./pages/About"
import Vans from "./pages/Vans/Vans"
import VanDetail from "./pages/Vans/VanDetail"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans from "./pages/Host/HostVans"
import HostVanDetail from "./pages/Host/HostVanDetail"
import HostVanInfo from "./pages/Host/HostVanInfo"
import HostVanPrice from "./pages/Host/HostVanPrice"
import HostVanPhotos from "./pages/Host/HostVanPhotos"
import NotFound from "./pages/NotFound"
import AuthRequired from "./components/AuthRequired"
import Login from "./pages/Login"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />
          <Route path="login" element={<Login />} />
          <Route element={<AuthRequired />}>
            <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="vans" element={<HostVans />} />
              <Route path="vans/:id" element={<HostVanDetail />}>
              <Route index element={<HostVanInfo />} />
              <Route path="price" element={<HostVanPrice />} />
              <Route path="photos" element={<HostVanPhotos />} />
              </Route>
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} /> {/* 404 page */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}