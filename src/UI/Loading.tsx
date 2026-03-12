import { Skeleton } from "antd";

export const SkeletonHome = ({ loading, col = false, pages = false }: { loading: boolean; col?: boolean; pages?: boolean; }) => {

  return (
    <div
      className={ col ? pages
            ? "skeletonPages grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
            : "skeletonPages h-full flex flex-row overflow-x-auto"
          : "gap-3 w-full h-48 md:h-112 border-2 border-blue-600 bg-blue-800/40 p-2 rounded-lg animate-pulse"
      }
    >
      {col ? (
        Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className={pages ? "w-full" : "w-28 md:w-52 shrink-0"}>
          <Skeleton
            loading={loading}
            className={` bg-blue-800/40
              ${
                pages
                  ? "w-full h-48 sm:h-72 border-2 border-blue-600 p-2 rounded-2xl"
                  : "h-44 md:h-72 border-2 border-blue-600 p-2 rounded-2xl"
              }`}
          />
        </div>
      )) ) : ( <Skeleton loading={loading} className="" />)
      }
      
    </div>
  );
};