import { Icons } from "@/components/Icons";
import SearchBar from "@/components/SearchBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative isolate min-h-[calc(100vh-3.5rem)] overflow-hidden border-b">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-border [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>

      <div className="mx-auto max-w-7xl gap-16 px-6 pb-24 pt-10">
        <div className="flex h-full w-full flex-col items-center gap-4">
          <Icons.Sparkles className="h-16 w-16" />

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            MagicSearch
          </h1>

          <p className="max-w-xl text-center text-lg text-muted-foreground">
            A beautifully designed, hybrid search engine that enhances search
            accuracy by querying semantically related results.
          </p>
          <div className="w-full">
            <div className="mx-auto mt-16 flex w-full min-w-64 max-w-2xl flex-col">
              <SearchBar />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
