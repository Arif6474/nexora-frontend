"use client";

import React, { useState } from 'react'
import Hero from '../components/Hero'
import CategorySection from '../components/home/CategorySection'
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

      <CategorySection />

      <TrendingProducts onQuickView={setSelectedProduct} products={data?.featuredProducts} />

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