"use client";

import React, { useState } from 'react'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import TrendingProducts from '../components/home/TrendingProducts'
import NewArrivals from '../components/home/NewArrivals'
import Testimonials from '../components/home/Testimonials'
import QuickViewModal from '../components/shop/QuickViewModal'

function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <main className="min-h-screen bg-stone-50">
      <Hero />

      <TrendingProducts onQuickView={setSelectedProduct} />

      <NewArrivals onQuickView={setSelectedProduct} />

      <Testimonials />

      <Footer />

      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  )
}

export default Home