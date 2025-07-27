import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function FormHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <h1 className="text-xl font-semibold text-white">Master Interview</h1>
        </div>
        <Avatar className="w-10 h-10 border-2 border-white">
          <AvatarImage src="/placeholder.svg?height=40&width=40" />
          <AvatarFallback className="bg-white text-blue-600 font-semibold">
            U
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
