"use client";

import React, { useState, useEffect, useRef } from "react";
import AuthModal from "../auth/AuthModal";
import { navLinks, dummyProducts } from "./navData";
import NavLogo from "./NavLogo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ActionIcons from "./ActionIcons";
import SearchModal from "./SearchModal";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [activeNestedMenu, setActiveNestedMenu] = useState(null);

    // Search State
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchInputRef = useRef(null);

    // Auth Modal State
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Search Logic
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredProducts([]);
            return;
        }

        setIsSearching(true);
        const timer = setTimeout(() => {
            const results = dummyProducts.filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(results);
            setIsSearching(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Global Scroll Lock (Search Modal only, AuthModal handles its own)
    useEffect(() => {
        if (isSearchOpen) {
            document.body.style.overflow = "hidden";
            setTimeout(() => searchInputRef.current?.focus(), 100);
        } else if (!isAuthOpen) {
            document.body.style.overflow = "auto";
        }
    }, [isSearchOpen, isAuthOpen]);

    const toggleSubmenu = (name) => {
        setActiveSubmenu(activeSubmenu === name ? null : name);
        setActiveNestedMenu(null);
    };

    const toggleNestedMenu = (title) => {
        setActiveNestedMenu(activeNestedMenu === title ? null : title);
    };

    const handleSearchClick = () => {
        setIsSearchOpen(true);
        setIsOpen(false);
    };

    const handleAuthClick = () => {
        setIsAuthOpen(true);
        setIsOpen(false);
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500  ${scrolled
                    ? "bg-white/90 backdrop-blur-xl border-b border-stone-200/50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] py-2.5"
                    : "bg-transparent border-b border-transparent py-2.5"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
                    <NavLogo />
                    <DesktopNav navLinks={navLinks} />
                    <ActionIcons
                        setIsSearchOpen={setIsSearchOpen}
                        handleAuthClick={handleAuthClick}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                </div>

                <MobileNav
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    navLinks={navLinks}
                    activeSubmenu={activeSubmenu}
                    toggleSubmenu={toggleSubmenu}
                    activeNestedMenu={activeNestedMenu}
                    toggleNestedMenu={toggleNestedMenu}
                    handleSearchClick={handleSearchClick}
                    handleAuthClick={handleAuthClick}
                />
            </nav>

            <SearchModal
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isSearching={isSearching}
                filteredProducts={filteredProducts}
                searchInputRef={searchInputRef}
            />

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
            />
        </>
    );
};

export default Navbar;
