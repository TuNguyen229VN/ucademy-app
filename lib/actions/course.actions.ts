"use server";
import { TCreateCourseParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Course from "@/database/course.model";

export async function getCourseBySlug({ slug }: { slug: string }) {
  try {
    await connectToDatabase();
    const findCourse = await Course.findOne({ slug });
    return findCourse;
  } catch (error) {
    console.log(error);
  }
}

export async function createCourse(params: TCreateCourseParams) {
  try {
    await connectToDatabase();
    const course = await Course.create(params);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
    };
  } catch (error) {
    console.log(error);
  }
}
