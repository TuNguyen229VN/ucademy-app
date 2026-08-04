import { ICourse } from "@/database/course.model";
import { ILecture } from "@/database/lecture.model";
import { Types } from "mongoose";
import { ReactNode } from "react";

type TActiveLinkProps = {
  url: string;
  children: ReactNode;
};

type TMenuItem = {
  url: string;
  title: string;
  icon?: ReactNode;
  onlyIcon?: boolean;
};

type TCreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};

// Course
type TCreateCourseParams = {
  title: string;
  slug: string;
  author: Types.ObjectId;
};

type TUpdateCourseParams = {
  slug: string;
  updateData: Partial<ICourse>;
  path?: string;
};

type TCouseUpdateParams = {
  _id: Types.ObjectId;
  slug: string;
  lectures: ILecture[];
};
// Lecture
type TCreateLectureParams = {
  course: Types.ObjectId;
  title?: string;
  order?: number;
  path?: string;
};

type TUpdateLectureParams = {
  lectureId: string;
  updateData: {
    title?: string;
    order?: number;
    _destroy?: boolean;
    path?: string;
  };
};
export {
  TActiveLinkProps,
  TMenuItem,
  TCreateUserParams,
  TCreateCourseParams,
  TUpdateCourseParams,
  TCouseUpdateParams,
  TCreateLectureParams,
  TUpdateLectureParams,
};
