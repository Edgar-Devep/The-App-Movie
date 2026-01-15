import { Skeleton } from "antd";

export const SkeletonHme = ({
  loading,
  col = false,
}: {
  loading: boolean;
  col?: boolean;
}) => (
  <div
    className={
      col
        ? "grid grid-cols-3 gap-3 border-2 border-indigo-500 p-2 m-10 bg-transparent rounded-lg animate-pulse"
        : "grid grid-cols-1 gap-3 border-2 border-indigo-500 p-2 bg-transparent rounded-lg animate-pulse "
    }
  >
    {Array.from(col ? { length: 3} : { length:1}).map((_, i) => (
      <Skeleton
        className="border-2 border-indigo-500 p-2 rounded-md"
        key={i}
        loading={loading}
      />
    ))}
  </div>
);
