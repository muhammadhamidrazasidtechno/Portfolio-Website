import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard">
            <Button variant="ghost" className="flex items-center gap-2 text-lg font-bold">
              <Home className="h-5 w-5" />
              <span>Admin Dashboard</span>
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">View Site</Link>
          </Button>
          <ThemeToggle />
          <Button
            variant="default"
            onClick={() => {
              // TODO: Implement logout
              window.location.href = "/admin";
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
