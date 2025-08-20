"use client";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, LogOut } from "lucide-react";

const Navbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleToggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/sign-in");
    } catch (e) {
      // Optionally show error
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="flex items-center justify-between py-4 px-4 md:px-8 bg-background border-b border-border mb-8">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="InterVue AI Logo" width={38} height={32} />
        <h2 className="text-primary-100 font-bold text-lg">InterVue AI</h2>
      </Link>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={handleToggleTheme}
        >
          {resolvedTheme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Logout"
          onClick={handleLogout}
          disabled={loading}
        >
          <LogOut className="size-5" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar; 