import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            Master Interview
          </span>
        </div>

        <Avatar className="w-10 h-10">
          <AvatarImage
            src="/placeholder.svg?height=40&width=40"
            alt="User avatar"
          />
          <AvatarFallback className="bg-gray-300 text-gray-600">
            U
          </AvatarFallback>
        </Avatar>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-4xl font-bold text-blue-600">Master Interview</h1>

          <p className="text-lg text-gray-600">
            Let AI enhance your interview skills
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Button
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>

            <Button
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              <Github className="w-5 h-5" />
              Sign in with GitHub
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
