import { enumSkeletonShapes } from "../_lib/enums"
import Skeleton from "react-loading-skeleton"

const SkeletonShape = ({shape}: {shape: number}) => {

    let width = "0";
    let height = "0";
    let count = 1;

    switch (shape) {
        case enumSkeletonShapes.IMAGE:
            width = "12rem";
            height = "10rem"
          break;
        case enumSkeletonShapes.CLASS_TITLE:
            width = "30rem";
            height = "3rem"
          break;
        case enumSkeletonShapes.CLASS_DESCRIPTION:
            width = "30rem";
            height = "2rem"
            count = 3;
          break;
        case enumSkeletonShapes.SINGLE_LINE_HALF:
          width = "15rem";
          height = "2rem"
        break;
      }
    return <Skeleton height={height} width={width} count={count}/>
}

export default SkeletonShape;