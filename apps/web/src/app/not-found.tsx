import { buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-400px)] flex-col items-center justify-center gap-4 p-4">
      <h1 className="animate-bounce text-6xl font-bold text-foreground">404</h1>
      <p className="animate-fade-in text-lg text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        aria-label="Return Home"
        className={cn(
          buttonVariants({ variant: "default", size: "default" }),
          "animate-fade-in-up transition-transform hover:scale-105",
        )}
      >
        Return Home
      </Link>
    </div>
  );
}
