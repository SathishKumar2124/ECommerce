import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import MainContent from "./components/MainContent"
import ProductPage from "./components/ProductPage"
import TopSellers from "./components/TopSellers"





type Props = {}

export default function App({}: Props) {
  return (
    <div>
      <BrowserRouter>
        <div className="flex h-screen">
            <Sidebar />
            <div className="rounded flex justify-between flex-wrap">
              <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="/product/:id" element={<ProductPage />} />
              </Routes>

              <div>
                <TopSellers />
              </div>

            </div>
        </div>
      </BrowserRouter>
    </div>
  )
}