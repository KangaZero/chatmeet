import { Skeleton } from "@chakra-ui/react";

interface SkeletonLoaderProps {
    count: number;
    height: string;
    width?: string;
}


const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
    count,
    height,
    width
}) => {
  return (
    <>
    {[...Array(count)].map((_, i) => (
        <Skeleton
         key={i} 
         height={height} 
         width={{base: 'full'}} 
         borderRadius={4} />
        // startColor and endColor are optional
    ))}
    </>
  );
};

export default SkeletonLoader;