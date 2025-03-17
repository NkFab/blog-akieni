import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function BlogCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative block aspect-video overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      <CardHeader className="pb-2">
        <div className="flex gap-2 mb-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-7 w-full mb-1" />
        <Skeleton className="h-7 w-3/4" />
      </CardHeader>
      <CardContent className="flex-grow">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground border-t pt-4">
        <div className="flex items-center justify-between w-full">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardFooter>
    </Card>
  );
}
