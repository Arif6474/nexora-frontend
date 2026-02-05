// Dummy Product Data
export const dummyProducts = [
    { id: 2, title: "Stone Wash Denim Jacket", category: "Men", image: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?q=80&w=200&h=200&auto=format&fit=crop", price: "$85" },
    { id: 3, title: "Minimalist Leather Watch", category: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&h=200&auto=format&fit=crop", price: "$150" },
    { id: 4, title: "Organic Cotton T-shirt", category: "Men", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=200&h=200&auto=format&fit=crop", price: "$35" },
    { id: 5, title: "Luxe Amber Perfume", category: "Beauty", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=200&h=200&auto=format&fit=crop", price: "$95" },
    { id: 6, title: "Smart Home Hub", category: "Electronics", image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=200&h=200&auto=format&fit=crop", price: "$210" },
];

export const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    {
        name: "Sale",
        href: "/sale",
        isAccent: true,
        subItems: [
            {
                title: "Special Offers",
                links: [
                    { name: "Flash Sale", href: "/sale/flash" },
                    { name: "Clearance", href: "/sale/clearance" },
                    { name: "Seasonal", href: "/sale/seasonal" },
                ]
            },
            {
                title: "Member Exclusive",
                links: [
                    { name: "Early Access", href: "/sale/early-access" },
                    { name: "BOGO Deals", href: "/sale/bogo" },
                ]
            }
        ],
    },
    {
        name: "Men",
        href: "/men",
        subItems: [
            {
                title: "Clothing",
                links: [
                    { name: "All Clothing", href: "/men/clothing" },
                    { name: "T-Shirts & Polos", href: "/men/clothing/t-shirts" },
                    { name: "Jackets & Coats", href: "/men/clothing/jackets" },
                    { name: "Pants", href: "/men/clothing/pants" },
                ]
            },
            {
                title: "Shoes",
                links: [
                    { name: "Sneakers", href: "/men/shoes/sneakers" },
                    { name: "Formal Shoes", href: "/men/shoes/formal" },
                    { name: "Boots", href: "/men/shoes/boots" },
                ]
            }
        ],
    },
    { name: "Collections", href: "/collections" },
];
