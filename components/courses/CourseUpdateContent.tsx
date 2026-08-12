"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { commonClassNames } from "@/constants";
import { IconDelete, IconEdit } from "../icons";
import { Button } from "../ui/button";
import { MouseEvent, useState } from "react";
import { createLecture, updateLecture } from "@/lib/actions/lecture.actions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ILecture } from "@/database/lecture.model";
import { TCouseUpdateParams, TUpdateCourseLecture } from "@/types";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import z from "zod";
import { createLesson } from "@/lib/actions/lesson.actions";
import { ILesson } from "@/database/lesson.model";

const formSchema = z.object({
  title: z.string().min(5, "Tên chương phải có ít nhất 5 ký tự"),
});

const CourseUpdateContent = ({ course }: { course: TCouseUpdateParams }) => {
  const lectures = course.lectures;
  const [lectureEdit, setLectureEdit] = useState("");
  const [lectureIdEdit, setLectureIdEdit] = useState("");

  const handleAddNewLecture = async () => {
    try {
      const res = await createLecture({
        title: "Chương mới",
        course: course._id,
        order: lectures.length + 1,
        path: `/manage/courses/update-content?slug=${course.slug}`,
      });
      if (res?.success) {
        toast.success("Thêm chương mới thành công!");
        setLectureIdEdit("");
        setLectureEdit("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string,
  ) => {
    e.stopPropagation();
    try {
      Swal.fire({
        title: "Bạn có chắc?",
        text: "Bạn sẽ không thể hoàn tác thao tác này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, xóa nó!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await updateLecture({
            lectureId,
            updateData: {
              _destroy: true,
              path: `/manage/courses/update-content?slug=${course.slug}`,
            },
          });
          if (res?.success) {
            toast.success("Xóa chương thành công!");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string,
  ) => {
    e.stopPropagation();
    const result = formSchema.safeParse({
      title: lectureEdit.trim(),
    });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    try {
      const res = await updateLecture({
        lectureId,
        updateData: {
          title: lectureEdit,
          path: `/manage/courses/update-content?slug=${course.slug}`,
        },
      });
      if (res?.success) {
        toast.success("Cập nhật thành công!");
        setLectureIdEdit("");
        setLectureEdit("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewLesson = async (lectureId: string, courseId: string) => {
    try {
      const res = await createLesson({
        path: `/manage/courses/update-content?slug=${course.slug}`,
        course: courseId,
        lecture: lectureId,
        title: "Tiêu đề bài học mới",
        slug: `tieu-de-bai-hoc-moi-${new Date().getTime().toString().slice(-3)}`,
      });
      if (res?.success) {
        toast.success("Thêm bài học mới thành công!");
        return;
      }
      toast.error(res?.message || "Đã xảy ra lỗi khi thêm bài học mới");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.length > 0 &&
          lectures.map((lecture: TUpdateCourseLecture) => (
            <div key={lecture._id.toString()}>
              <Accordion className="w-full">
                <AccordionItem value={lecture._id}>
                  <AccordionTrigger
                    render={
                      lecture._id.toString() === lectureIdEdit ? (
                        <div />
                      ) : undefined
                    }
                    nativeButton={lecture._id.toString() !== lectureIdEdit}
                  >
                    <div className="flex items-center gap-3 justify-between w-full pr-5">
                      {lecture._id.toString() === lectureIdEdit ? (
                        <>
                          <div
                            className="w-full"
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                          >
                            <Input
                              placeholder="Tên chương"
                              value={lectureEdit}
                              onChange={(e) => {
                                e.stopPropagation();
                                setLectureEdit(e.target.value);
                              }}
                            />
                          </div>
                          <div className="flex gap-2">
                            <span
                              className={cn(
                                commonClassNames.action,
                                "text-green-500",
                              )}
                              onClick={(e) =>
                                handleUpdateLecture(e, lecture._id.toString())
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </span>
                            <span
                              className={cn(
                                commonClassNames.action,
                                "text-red-500",
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                setLectureIdEdit("");
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>{lecture.title}</div>
                          <div className="flex gap-2">
                            <span
                              className={cn(
                                commonClassNames.action,
                                "text-blue-500",
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                setLectureIdEdit(lecture._id.toString());
                                setLectureEdit(() => lecture.title);
                              }}
                            >
                              <IconEdit />
                            </span>
                            <span
                              className={cn(
                                commonClassNames.action,
                                "text-red-500",
                              )}
                              onClick={(e) =>
                                handleDeleteLecture(e, lecture._id.toString())
                              }
                            >
                              <IconDelete />
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border-none bg-transparent!">
                    <div className="flex flex-col gap-5">
                      {lecture.lessons.map((lesson: ILesson) => (
                        <Accordion key={lesson._id.toString()}>
                          <AccordionItem value={lesson._id}>
                            <AccordionTrigger>{lesson.title}</AccordionTrigger>
                            <AccordionContent>
                              Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button
                onClick={() =>
                  handleAddNewLesson(
                    lecture._id.toString(),
                    course._id.toString(),
                  )
                }
                className="mt-5 ml-auto w-fit block"
              >
                Thêm bài học mới
              </Button>
            </div>
          ))}
      </div>
      <Button onClick={handleAddNewLecture} className="mt-5">
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
