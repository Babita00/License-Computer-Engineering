import { OctagonAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-[80vh] justify-center items-center flex-col gap-8">
      <div className="relative size-44 ">
        <div className="size-40 bg-gray-200/60 rounded-full flex justify-center items-center absolute bottom-2 ">
          <OctagonAlert className="w-16 h-16 text-gray-500" />
        </div>
      </div>
      <div className="text-center space-y-4 max-w-xl">
        <h3 className="text-2xl font-bold">Page Not Found</h3>
        <p className="text-lg text-gray-600">
          Oops! The page you are looking for doesnt exists.
        </p>
      </div>
      <Button onClick={() => navigate('/')}>Go Back Home</Button>
    </div>
  )
}

export default NotFound
