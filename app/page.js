"use client";

import React, { useState } from 'react'
import Hero from '../components/Hero'
import TrendingProducts from '../components/home/TrendingProducts'
import NewArrivals from '../components/home/NewArrivals'
import Testimonials from '../components/home/Testimonials'
import QuickViewModal from '../components/shop/QuickViewModal'
import useFetch from '@/utils/hooks/useFetch'
import { HOME_API } from '@/utils/APIs';


function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data, isLoading } = useFetch(HOME_API);

  return (
    <main className="min-h-screen bg-stone-50">
      <Hero />

      <TrendingProducts onQuickView={setSelectedProduct} />

      <NewArrivals onQuickView={setSelectedProduct} products={data?.latestProducts} />

      <Testimonials />

      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  )
}

export default Home