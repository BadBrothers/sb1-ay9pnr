import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Politicians from './pages/Politicians';
import SuperPACs from './pages/SuperPACs';
import PACProfile from './pages/PACProfile';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Methodology from './pages/Methodology';
import Resources from './pages/Resources';
import Legislation from './pages/Legislation';
import BillDetail from './pages/BillDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/politicians" element={<Politicians />} />
            <Route path="/superpacs" element={<SuperPACs />} />
            <Route path="/pac/:id" element={<PACProfile />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/legislation" element={<Legislation />} />
            <Route path="/legislation/:slug" element={<BillDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;