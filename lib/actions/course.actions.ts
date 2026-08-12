"use server";
import {
  TCouseUpdateParams,
  TCreateCourseParams,
  TUpdateCourseParams,
} from "@/types";
import { connectToDatabase } from "../mongoose";
import Course, { ICourse } from "@/database/course.model";
import { revalidatePath } from "next/cache";
import Lecture from "@/database/lecture.model";

export async function getAllCourse(): Promise<ICourse[] | undefined> {
  try {
    await connectToDatabase();
    const courses = await Course.find();
    return courses;
  } catch (error) {
    console.log(error);
  }
}

export async function getCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<TCouseUpdateParams | undefined> {
  try {
    await connectToDatabase();
    const findCourse = await Course.findOne({ slug })
      .populate({
        path: "lectures",
        model: Lecture,
        select: "_id title",
        match: {
          _destroy: false,
        },
        populate: {
          path: "lessons",
          model: "Lesson",
          match: {
            _destroy: false,
          },
        },
      })
      .lean();
    return JSON.parse(JSON.stringify(findCourse));
  } catch (error) {
    console.log(error);
  }
}

export async function createCourse(params: TCreateCourseParams) {
  try {
    await connectToDatabase();
    const existCourse = await Course.findOne({ slug: params.slug });
    if (existCourse) {
      return {
        success: false,
        message: "Đường dẫn khóa học đã tồn tại",
      };
    }
    const course = await Course.create(params);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
    };
  } catch (error) {
    console.log(error);
  }
}

export async function updateCourse(params: TUpdateCourseParams) {
  try {
    await connectToDatabase();
    const findCourse = await Course.findOne({ slug: params.slug });
    if (!findCourse) return;
    await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, {
      new: true,
    });
    // refresh dữ liệu mới cho trang chủ
    revalidatePath(params.path || "/");
    return {
      success: true,
      message: "Cập nhật khóa học thành công",
    };
  } catch (error) {
    console.log(error);
  }
}
