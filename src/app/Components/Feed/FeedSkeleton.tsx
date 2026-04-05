import { Skeleton } from "../../../components/ui/skeleton";


export default function FeedSkeleton() {
  return (
    <div className="h-screen flex flex-col bg-[#f5f5f5] overflow-hidden p-5">
      <Skeleton className="bg-white h-20 w-full rounded mb-5" />
      <div className="grid grid-cols-4 gap-5">
        <div className="space-y-3">
          <Skeleton className="bg-white h-50 rounded" />
          <Skeleton className="bg-white h-30 rounded" />
          <Skeleton className="bg-white h-60 rounded" />
        </div>
        <div className="col-span-2 space-y-5">
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className=" bg-white h-40 w-full rounded-xl" />
            ))}
          </div>
          <div className="bg-white rounded-xl p-4 space-y-4 h-40">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 flex-1 rounded-full" />
            </div>

            <div className="flex justify-between">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="bg-white h-8 w-20 rounded-md" />
              ))}
            </div>
          </div>
          <Skeleton className="bg-white h-50 rounded" />
        </div>
        <div className="space-y-3">
          <Skeleton className="bg-white h-50 rounded" />
          <Skeleton className="bg-white h-30 rounded" />
          <Skeleton className="bg-white h-60 rounded" />
        </div>
      </div>
    </div>
  );
}