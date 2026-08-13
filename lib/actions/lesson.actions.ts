"use server";
import { TCreateLessonParams, TUpdateLessonParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Course from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import Lesson from "@/database/lesson.model";
import { revalidatePath } from "next/cache";

export async function createLesson(params: TCreateLessonParams) {
  try {
    await connectToDatabase();
    const findCourse = await Course.findById(params.course);
    if (!findCourse)
      return { success: false, message: "Không tìm thấy khóa học" };
    const findLecture = await Lecture.findById(params.lecture);
    if (!findLecture)
      return { success: false, message: "Không tìm thấy chương" };
    const newLesson = await Lesson.create(params);
    findLecture.lessons.push(newLesson._id);
    await findLecture.save();
    revalidatePath(params.path || "");
    if (!newLesson) return { success: false, message: "Tạo bài học thất bại" };
    return { success: true };
  } catch (error) {
    return { success: false, message: "Đã xảy ra lỗi khi tạo bài học" };
  }
}

export async function updateLesson(params: TUpdateLessonParams) {
  try {
    await connectToDatabase();
    const findLesson = await Lesson.findById(params.lessonId);
    if (!findLesson)
      return { success: false, message: "Không tìm thấy bài học" };
    const updatedLesson = await Lesson.findByIdAndUpdate(
      params.lessonId,
      params.updateData,
      { new: true }
    );
    revalidatePath(params.path || "");
    if (!updatedLesson)
      return { success: false, message: "Cập nhật bài học thất bại" };
    return { success: true };
  } catch (error) {
    return { success: false, message: "Đã xảy ra lỗi khi cập nhật bài học" };
  }
}
