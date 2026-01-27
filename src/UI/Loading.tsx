import { Skeleton } from "antd";

export const SkeletonHme = ({
  loading,
  col = false,
  pages = false,
}: {
  loading: boolean;
  col?: boolean;
  pages?: boolean;
}) => (
  <div
    className={
      col
        ? pages
          ? "h-full relative p-2 mx-6 grid grid-cols-4 gap-3 border-2 border-indigo-600 rounded-2xl animate-pulse"
          : "h-full relative p-2 mx-6 grid grid-cols-4 gap-3 border-2 border-indigo-600 rounded-2xl animate-pulse"
        : "grid grid-cols-1 gap-3 border-2 border-indigo-500 p-2 bg-transparent rounded-lg animate-pulse "
    }
  >
    {Array.from(
      col ? (pages ? { length: 12 } : { length: 4 }) : { length: 1 },
    ).map((_, i) => (
      <Skeleton
        className="w-2xl border-2 border-indigo-500 p-2 rounded-2xl"
        key={i}
        loading={loading}
      />
    ))}
  </div>
);
