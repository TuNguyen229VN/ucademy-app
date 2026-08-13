"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { commonClassNames } from "@/constants";
import { IconCancel, IconCheck, IconDelete, IconEdit } from "../icons";
import { Button } from "../ui/button";
import { MouseEvent, useState } from "react";
import { createLecture, updateLecture } from "@/lib/actions/lecture.actions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { TCouseUpdateParams, TUpdateCourseLecture } from "@/types";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import z from "zod";
import { createLesson, updateLesson } from "@/lib/actions/lesson.actions";
import { ILesson } from "@/database/lesson.model";
import slugify from "slugify";
import LessonItemUpdate from "../lessons/LessonItemUpdate";

const formSchema = z.object({
  title: z.string().min(5, "Tên chương phải có ít nhất 5 ký tự").optional(),
  titleLesson: z.string().min(5, "Tên bài học phải có ít nhất 5 ký tự").optional(),
});

const CourseUpdateContent = ({ course }: { course: TCouseUpdateParams }) => {
  const lectures = course.lectures;
  const [lectureEdit, setLectureEdit] = useState("");
  const [lectureIdEdit, setLectureIdEdit] = useState("");
  const [lessonEdit, setLessonEdit] = useState("");
  const [lessonIdEdit, setLessonIdEdit] = useState("");

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

  const handleUpdateLesson = async (
    e: MouseEvent<HTMLSpanElement>,
    lessonId: string,
  ) => {
    e.stopPropagation();
    const result = formSchema.safeParse({
      titleLesson: lessonEdit.trim(),
    });

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    console.log("lessonEdit", lessonEdit);
    try {
      const res = await updateLesson({
        lessonId,
        path: `/manage/courses/update-content?slug=${course.slug}`,
        updateData: {
          title: lessonEdit,
          slug: slugify(lessonEdit, {
            lower: true,
            locale: "vi",
            remove: /[*+~.()'"!:@]/g,
          }),
        },
      });
      if (res?.success) {
        toast.success("Cập nhật thành công!");
        setLessonIdEdit("");
        setLessonEdit("");
        return;
      }
      toast.error(res?.message || "Đã xảy ra lỗi khi cập nhật bài học");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteLesson = async (
    e: MouseEvent<HTMLSpanElement>,
    lessonId: string,
  ) => {
    e.stopPropagation();
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
                              defaultValue={lecture.title}
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
                              <IconCheck />
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
                              <IconCancel />
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
                            <AccordionTrigger
                              render={
                                lesson._id.toString() === lessonIdEdit ? (
                                  <div />
                                ) : undefined
                              }
                              nativeButton={
                                lesson._id.toString() !== lessonIdEdit
                              }
                            >
                              <div className="flex items-center gap-3 justify-between w-full pr-5">
                                {lesson._id.toString() === lessonIdEdit ? (
                                  <>
                                    <div
                                      className="w-full"
                                      onClick={(e) => e.stopPropagation()}
                                      onKeyDown={(e) => e.stopPropagation()}
                                      onPointerDown={(e) => e.stopPropagation()}
                                    >
                                      <Input
                                        placeholder="Tên bài học"
                                        defaultValue={lesson.title}
                                        onChange={(e) => {
                                          e.stopPropagation();
                                          setLessonEdit(e.target.value);
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
                                          handleUpdateLesson(
                                            e,
                                            lesson._id.toString(),
                                          )
                                        }
                                      >
                                        <IconCheck />
                                      </span>
                                      <span
                                        className={cn(
                                          commonClassNames.action,
                                          "text-red-500",
                                        )}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setLessonIdEdit("");
                                        }}
                                      >
                                        <IconCancel />
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div>{lesson.title}</div>
                                    <div className="flex gap-2">
                                      <span
                                        className={cn(
                                          commonClassNames.action,
                                          "text-blue-500",
                                        )}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setLessonIdEdit(
                                            lesson._id.toString(),
                                          );
                                          setLessonEdit(() => lesson.title);
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
                                          handleDeleteLesson(
                                            e,
                                            lesson._id.toString(),
                                          )
                                        }
                                      >
                                        <IconDelete />
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <LessonItemUpdate lesson={lesson} />
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
