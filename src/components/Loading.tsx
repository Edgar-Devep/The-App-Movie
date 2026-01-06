import { PacmanLoader } from "react-spinners";
import { Skeleton } from 'antd';

export const Spinner = ({loading} : {loading : boolean}) => (
  <div className=" w-full h-full flex justify-center items-center ">
    <PacmanLoader loading={loading} color="#615FFF" size={36}/>
  </div>
)


export const SkeletonHme = ({loading} : {loading: boolean}) => <div className="p-4 mx-12 bg-indigo-500 rounded-lg animate-pulse">
  <Skeleton loading={loading} />
</div>
;