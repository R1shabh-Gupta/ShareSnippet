import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="z-50 fixed top-0 w-[100%]">
      <div className="flex w-full justify-between items-center my-6">
        <h1 className="font-bold font-logo text-2xl sm:text-3xl text-slate-200 sm:ml-16 ml-6">
          Share Snippet
        </h1>

        <button className="relative inline-flex h-8 sm:h-10 w-24 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 sm:mr-16 mr-6">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#5EA7F5_0%,#36CF99_50%,#36CF99_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            <Link
              href="https://github.com/R1shabh-Gupta/ShareSnippet"
              target="_blank"
            >
              GitHub
            </Link>
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
