import SkeletonWrapper from "@/components/shared/SkeletonWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Props {
  isFetching: boolean;
}
const ProjectSkeleton = ({ isFetching }: Props) => {
  return (
    <>
      {new Array(3).fill(null).map((_, i) => (
        <Card key={i} className="w-full overflow-hidden">
          <SkeletonWrapper isLoading={isFetching}>
            <div className={cn(isFetching ? "h-48 w-full" : "")} />
          </SkeletonWrapper>
          <CardHeader>
            <SkeletonWrapper isLoading={isFetching}>
              <CardTitle
                className={cn(isFetching ? "h-2 w-6" : "")}
              ></CardTitle>
            </SkeletonWrapper>

            <SkeletonWrapper isLoading={isFetching}>
              <CardDescription className="h-2 w-4"></CardDescription>
            </SkeletonWrapper>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-1">
            <SkeletonWrapper isLoading={isFetching}>
              <div className="h-4 w-full" />
            </SkeletonWrapper>
            <SkeletonWrapper isLoading={isFetching}>
              <div className="h-4 w-full" />
            </SkeletonWrapper>
            <SkeletonWrapper isLoading={isFetching}>
              <div className="h-4 w-16" />
            </SkeletonWrapper>
            <SkeletonWrapper isLoading={isFetching}>
              <div className="h-4 w-16" />
            </SkeletonWrapper>
          </CardContent>
          <Separator />
          <CardFooter className="mt-4 flex w-full items-center justify-between gap-16">
            <SkeletonWrapper isLoading={isFetching}>
              <div className="h-4 w-3/5" />
            </SkeletonWrapper>
            <SkeletonWrapper isLoading={isFetching}>
              <div className="h-4 w-2/5" />
            </SkeletonWrapper>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default ProjectSkeleton;
