import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-400px)] flex-col items-center justify-center gap-6 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
      <div className="text-center space-y-4">
        <div className="relative">
          <h1 className="text-8xl font-bold text-blue-600 dark:text-blue-400 animate-bounce">404</h1>
          {/* Swimming goggles decoration */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <svg
              viewBox="0 0 100 40"
              className="w-20 h-8 text-blue-500"
              fill="currentColor"
            >
              <circle cx="25" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="75" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="3"/>
              <path d="M40 20 L60 20" stroke="currentColor" strokeWidth="2"/>
              <path d="M10 20 Q5 15 0 20" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M90 20 Q95 15 100 20" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-100">
          Oops! You've swum off course
        </h2>
        <p className="text-lg text-blue-700 dark:text-blue-300 max-w-md mx-auto">
          The page you're looking for seems to have dived too deep. Let's get you back to the pool deck.
        </p>
      </div>
      
      <Link
        href="/"
        aria-label="Return to Arizona Seals Swimming Academy Home"
        className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          Return to Pool Deck
        </span>
        {/* Wave animation */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" 
              fill="currentColor" 
              className="animate-pulse"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
}