"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ModeToggle } from '@/components/layout/mode-toggle';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  LogIn,
  User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For demo purposes

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${
      isScrolled ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b' : 'bg-transparent'
    }`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl hidden sm:inline-block">InsurBuddy</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/needs-analyzer" className="text-foreground/80 hover:text-foreground transition-colors">
            Needs Analyzer
          </Link>
          <Link href="/plans" className="text-foreground/80 hover:text-foreground transition-colors">
            Compare Plans
          </Link>
          <Link href="/claims" className="text-foreground/80 hover:text-foreground transition-colors">
            Claims
          </Link>
          <Link href="/about" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <ModeToggle />
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard" className="w-full">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button className="w-full text-left" onClick={() => setIsLoggedIn(false)}>Logout</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setIsLoggedIn(true)}>
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="container py-4 flex flex-col space-y-4 bg-background border-b">
            <Link 
              href="/needs-analyzer" 
              className="px-4 py-2 text-foreground hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Needs Analyzer
            </Link>
            <Link 
              href="/plans" 
              className="px-4 py-2 text-foreground hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Compare Plans
            </Link>
            <Link 
              href="/claims" 
              className="px-4 py-2 text-foreground hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Claims
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-2 text-foreground hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;