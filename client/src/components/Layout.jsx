import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-black">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  )
}

export default Layout
