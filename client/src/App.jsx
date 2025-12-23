import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import PublicWaitlist from './pages/PublicWaitlist'
import DashboardGate from './pages/DashboardGate'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/dashboard" element={<DashboardGate />} />
          <Route path="/w/:slug" element={<PublicWaitlist />} />
         
         
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App