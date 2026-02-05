"use client";

import React, { useState } from 'react'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import TrendingProducts from '../components/home/TrendingProducts'
import QuickViewModal from '../components/shop/QuickViewModal'

function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <main className="min-h-screen bg-stone-50">
      <Hero />

      <TrendingProducts onQuickView={setSelectedProduct} />

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