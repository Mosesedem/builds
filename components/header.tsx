"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { Menu, ChevronDown } from 'lucide-react'
import {   
  Sheet,   
  SheetContent,   
  SheetTrigger, 
} from "@/components/ui/sheet"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Route = {
  href: string;
  label: string;
};

const productRoutes: Route[] = [
  { href: "/plans", label: "Medicare Plans" },
  { href: "/compare", label: "Compare Plans" },
  { href: "/providers", label: "Find Providers" },
]

const supportRoutes: Route[] = [
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Support" },
]

const companyRoutes: Route[] = [
  { href: "/about", label: "About Us" },
  { href: "/careers", label: "Careers" },
  { href: "/ambassador", label: "Refer and Earn" },
]

const dropdownVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30
    }
  },
  exit: { 
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.2
    }
  }
}

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const renderRouteGroup = (routes: Route[], title: string) => (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={dropdownVariants}
      className="p-4 backdrop-blur-xl bg-background/95 rounded-lg shadow-lg border border-border/50"
    >
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">{title}</h3>
      <div className="space-y-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "block py-2 px-3 text-sm rounded-md transition-all duration-200",
              "hover:bg-primary/5 hover:text-primary",
              pathname === route.href 
                ? "text-primary font-medium bg-primary/5" 
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </motion.div>
  )

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60",
        scrolled ? "border-border/40 shadow-sm" : "border-transparent"
      )}
    >
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2 hover:bg-transparent hover:text-primary"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="w-full sm:max-w-md p-0"
            >
              <div className="h-full overflow-y-auto py-6 px-4">
                <Link 
                  href="/" 
                  className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 block mb-8"
                  onClick={() => setIsOpen(false)}
                >
                  Proton Medicare
                </Link>

                <div className="space-y-6">
                  {[
                    { title: "Products", routes: productRoutes },
                    { title: "Support", routes: supportRoutes },
                    { title: "Company", routes: companyRoutes }
                  ].map(({ title, routes }) => (
                    <div key={title}>
                      <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3">
                        {title}
                      </h3>
                      <div className="space-y-2">
                        {routes.map((route) => (
                          <Link
                            key={route.href}
                            href={route.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "block py-2 text-base transition-colors",
                              "hover:text-primary",
                              pathname === route.href 
                                ? "text-primary font-medium" 
                                : "text-muted-foreground"
                            )}
                          >
                            {route.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    asChild
                  >
                    <Link href="/signin">Sign In</Link>
                  </Button>
                  <Button 
                    className="w-full" 
                    asChild
                  >
                    <Link href="/enroll">Enroll Now</Link>
                  </Button>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link 
            href="/" 
            className="flex items-center space-x-2"
          >
            <motion.span 
              className="font-bold text-lg sm:text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              Proton Medicare
            </motion.span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {[
            { id: 'products', label: 'Products', routes: productRoutes, title: 'Our Services' },
            { id: 'support', label: 'Support', routes: supportRoutes, title: 'Get Help' },
            { id: 'company', label: 'Company', routes: companyRoutes, title: 'About Proton' }
          ].map(({ id, label, routes, title }) => (
            <DropdownMenu 
              key={id}
              open={activeDropdown === id} 
              onOpenChange={(open) => setActiveDropdown(open ? id : null)}
            >
              <DropdownMenuTrigger asChild>
                <motion.button 
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors",
                    "hover:text-primary focus:outline-none focus:text-primary",
                    activeDropdown === id ? "text-primary" : "text-muted-foreground"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {label}
                  <motion.span
                    animate={{ rotate: activeDropdown === id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </motion.span>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56 p-0" 
                align="start"
              >
                {renderRouteGroup(routes, title)}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              // variant="ghost" 
              size="sm"
              asChild
              className="bg-teal-500 hover:bg-teal-600"
            >
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button 
              size="sm"
              asChild
              className="bg-blue-400 hover:bg-blue-500 shadow-sm"
            >
              <Link href="/enroll">Enroll Now</Link>
            </Button>
          </div>
          <div className="hidden md:block">
            <ModeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  )
}