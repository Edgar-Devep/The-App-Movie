import { PacmanLoader } from "react-spinners";
import { Skeleton } from "antd";

export const Spinner = ({ loading }: { loading: boolean }) => (
  <div className=" w-full h-full flex justify-center items-center text-indigo-500 font-bold gap-3 p-3">
    Loading<PacmanLoader loading={loading} color="#615FFF" size={15} />
  </div>
);

export const SkeletonHme = ({ loading }: { loading: boolean }) => (
  <div className="grid grid-cols-4 gap-3 border-2 border-indigo-500 p-2 mx-12 bg-transparent rounded-lg animate-pulse">
    {Array.from({ length: 4 }).map((_, i) => (
      <Skeleton className="border-2 border-indigo-500 p-2 rounded-md" key={i} loading={loading} />
    ))}
  </div>
);
