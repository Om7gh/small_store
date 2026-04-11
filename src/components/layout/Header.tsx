"use client";

import { useEffect, useState } from "react";
import {
  LuMenu,
  LuSearch,
  LuShoppingCart,
  LuUserRound,
  LuX,
} from "react-icons/lu";
import Modal from "../shared/Modal";
import Cart from "./product/Cart";
import useStore from "@/store";
import Link from "next/link";
import Login from "./login";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import createClient from "@/lib/supabase/client";

const navItems = ["Home", "Product", "Support"];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const {
    product,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    isCartModalOpen,
    toggleCartModal,
    closeCartModal,
  } = useStore();

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    const syncUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) {
        return;
      }

      const metadata = (user?.user_metadata ?? {}) as Record<string, unknown>;
      const image =
        (metadata.avatar_url as string | undefined) ??
        (metadata.picture as string | undefined) ??
        null;

      setIsAuthenticated(Boolean(user));
      setAvatarUrl(image);
      setEmail(user?.email ?? null);
    };

    void syncUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void syncUser();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated && isAuthModalOpen) {
      closeAuthModal();
    }
  }, [isAuthenticated, isAuthModalOpen, closeAuthModal]);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-text/10 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="grid size-10 place-items-center border border-text/20 text-text transition-colors hover:bg-text/5 md:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMenuOpen ? (
                <LuX className="size-5" />
              ) : (
                <LuMenu className="size-5" />
              )}
            </button>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Small<span className="text-accent">Shop</span>
            </h1>
          </div>

          <nav className="hidden md:block" aria-label="Main navigation">
            <ul className="flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <Link
                  href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                  key={item}
                  className="cursor-pointer  px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-accent/10 hover:text-accent lg:px-4"
                >
                  {item}
                </Link>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="Search"
              className="grid size-9 place-items-center  transition-colors hover:bg-text/5 sm:size-10"
            >
              <LuSearch className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Cart"
              className="grid size-9 place-items-center  transition-colors hover:bg-text/5 sm:size-10 relative"
              onClick={toggleCartModal}
            >
              <span className="absolute top-1 right-0 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-primary bg-background/50 shadow   ">
                {product.length}
              </span>
              <LuShoppingCart className="size-5" />
            </button>
            {isAuthenticated ? (
              <ProfileDropdownMenu avatarUrl={avatarUrl} email={email} />
            ) : (
              <button
                type="button"
                aria-label="Account"
                className="grid size-9 place-items-center  transition-colors hover:bg-text/5 sm:size-10"
                onClick={openAuthModal}
              >
                <LuUserRound className="size-5" />
              </button>
            )}
          </div>
        </div>

        <div
          id="mobile-nav"
          className={[
            "overflow-hidden border-t border-text/10 transition-[max-height] duration-300 md:hidden",
            isMenuOpen ? "max-h-80" : "max-h-0",
          ].join(" ")}
        >
          <nav
            className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                  key={item}
                  className="cursor-pointer  px-3 py-2 text-base font-medium transition-colors duration-150 hover:bg-accent/10 hover:text-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {isCartModalOpen && (
        <Modal closeFunc={closeCartModal}>
          <Cart />
        </Modal>
      )}

      {isAuthModalOpen && !isAuthenticated && (
        <Modal closeFunc={closeAuthModal}>
          <div className="grid place-items-center">
            <Login />
          </div>
        </Modal>
      )}
    </>
  );
}
