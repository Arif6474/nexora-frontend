import { allProducts } from "../../app/data/products";
export const dummyProducts = allProducts;

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
