import { Skeleton } from "../../../../components/ui/skeleton";

export default function PostSkeleton() {
  return (
    <Skeleton className="space-y-5 bg-white rounded-lg p-8">
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <Skeleton className="bg-gray-300 h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="bg-gray-300 h-4 w-70 mb-2" />
            <Skeleton className="bg-gray-300 h-4 w-50" />
          </div>
        </div>
        <Skeleton className="bg-gray-300 h-6 w-2 mb-4" />
      </div>
      <Skeleton className="bg-gray-300 h-8 w-full mb-2" />
      <Skeleton className="bg-gray-300 h-70 w-full mt-4" />
    </Skeleton>
  )
}
