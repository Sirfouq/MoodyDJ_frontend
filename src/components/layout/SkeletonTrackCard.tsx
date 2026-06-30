import { Skeleton } from "../ui/skeleton"

export const SkeletonTrackCard = () => (
    <div className="h-24 w-full rounded-lg p-4 bg-zinc-100">     {/* ← added bg-zinc-100 */}
        <div className="h-full flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-md flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
            </div>
        </div>
    </div>
)