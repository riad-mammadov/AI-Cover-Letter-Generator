import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { User, FileText } from "lucide-react";
import Link from "next/link";
export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="relative w-full max-w-6xl mx-auto flex items-center justify-between py-6 px-6 z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            CoverMe
          </h1>
          <p className="text-xs text-gray-500">AI Powered</p>
        </div>
      </div>
      {session?.user?.name ? (
        <div className="flex items-center gap-2">
          <Link href="/protected">
            <Button
              variant="secondary"
              className="bg-white/5 hover:cursor-pointer border-white/10 hover:bg-white/10 text-white backdrop-blur-sm transition-all duration-200"
            >
              <User className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
          <Button
            variant="secondary"
            className="bg-white/5 hover:cursor-pointer border-white/10 hover:bg-white/10 text-white backdrop-blur-sm transition-all duration-200"
            onClick={() => signOut()}
          >
            <User className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      ) : (
        <Button
          variant="secondary"
          className="bg-white/5 hover:cursor-pointer border-white/10 hover:bg-white/10 text-white backdrop-blur-sm transition-all duration-200"
          onClick={() => signIn()}
        >
          <User className="w-4 h-4 mr-2" />
          Sign In
        </Button>
      )}
    </header>
  );
}
