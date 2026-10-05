"use client";
import { useState } from "react";
import { TUpdateCourseLecture } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LessonItem from "./LessonItem";
import { IHistory } from "@/database/history.model";

const LessonContent = ({
  lectures,
  course,
  slug,
  histories = [],
}: {
  lectures: TUpdateCourseLecture[];
  course: string;
  slug: string;
  histories?: IHistory[];
}) => {
  const activeLectureId =
    (slug &&
      lectures
        .find((l) => l.lessons.some((ls) => ls.slug === slug))
        ?._id.toString()) ||
    "";

  const [value, setValue] = useState<string[]>(
    activeLectureId ? [activeLectureId] : [],
  );
  const [prevActiveId, setPrevActiveId] = useState(activeLectureId);

  // Khi đổi sang bài thuộc chương khác: tự mở chương đó (không cần useEffect)
  if (activeLectureId !== prevActiveId) {
    setPrevActiveId(activeLectureId);
    if (activeLectureId && !value.includes(activeLectureId)) {
      setValue([...value, activeLectureId]);
    }
  }

  return (
    <Accordion
      multiple
      className="w-full flex flex-col gap-5"
      value={value}
      onValueChange={setValue}
    >
      {lectures.map((lecture: TUpdateCourseLecture) => (
        <AccordionItem key={lecture._id} value={lecture._id.toString()}  className="border-b-0 not-last:border-b-0">
          <AccordionTrigger>
            <div className="flex items-center gap-3 justify-between w-full pr-5">
              <div className="line-clamp-1" title={lecture.title}>
                {lecture.title}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-transparent! border-none p-0">
            <div className="flex flex-col gap-3 mt-3">
              {lecture.lessons.map((lesson) => (
                <LessonItem
                  key={lesson._id}
                  lesson={lesson ? JSON.parse(JSON.stringify(lesson)) : {}}
                  url={!course ? "" : `/${course}/lesson?slug=${lesson.slug}`}
                  isActive={!slug ? false : lesson.slug === slug}
                  isChecked={histories.some(
                    (el) => el.lesson.toString() === lesson._id.toString(),
                  )}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default LessonContent;