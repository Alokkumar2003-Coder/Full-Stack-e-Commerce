import React from 'react'
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <header className="fixed w-full z-20">
    <Navbar />
  </header>
  <main className="flex-1 pt-16">
    <Outlet />
  </main>
  <footer className="mt-auto">
    <Footer />
  </footer>
</div>

  )
}

export default Layout
