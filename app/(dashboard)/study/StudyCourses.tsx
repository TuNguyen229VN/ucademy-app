"use client";
import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/courses/CourseItem";
import { lastLessonKey } from "@/constants";
import { ICourse } from "@/database/course.model";
import { useMemo, useSyncExternalStore } from "react";

type LastLesson = { course: string; lesson?: string };

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

// Trả về string (so sánh theo giá trị) để snapshot ổn định, tránh render lặp vô hạn
const getSnapshot = () => localStorage.getItem(lastLessonKey) || "[]";
const getServerSnapshot = () => "[]";

const StudyCourses = ({
  courses,
}: {
  courses: ICourse[] | null | undefined;
}) => {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const lastLesson = useMemo<LastLesson[]>(() => {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }, [raw]);

  if (!courses || courses.length <= 0) return null;

  return (
    <CourseGrid>
      {courses.map((item) => {
        const url =
          lastLesson.find((el) => el.course === item.slug)?.lesson || "";

        return (
          <CourseItem
            key={item.slug}
            data={item}
            cta="Tiếp tục học"
            url={url}
          />
        );
      })}
    </CourseGrid>
  );
};

export default StudyCourses;