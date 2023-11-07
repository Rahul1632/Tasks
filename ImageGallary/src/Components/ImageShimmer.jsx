import { ShimmerThumbnail } from "react-shimmer-effects";

const ImageShimmer = () => {
  return (
    <>
      <div className="flex flex-wrap gap-10 h-full overflow-y-auto justify-center w-full m-0">
        {Array.from({ length: 20 }).map((item) => {
          return (
            <ShimmerThumbnail
              height={350}
              key={item}
              className="w-[430px] md:w-[380px] lg:w-[400px] mb-5"
              rounded
            />
          );
        })}
      </div>
    </>
  );
};

export default ImageShimmer;
