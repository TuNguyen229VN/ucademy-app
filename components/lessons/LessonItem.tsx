"use client";
import Link from "next/link";
import { IconPlay } from "../icons";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { createHistory } from "@/lib/actions/history.actions";

const LessonItem = ({
  lesson,
  url,
  isActive = false,
  isChecked = false,
}: {
  lesson: {
    title: string;
    duration: number;
    course: string;
    _id: string;
  };
  url?: string;
  isActive?: boolean;
  isChecked?: boolean;
}) => {

  const handleCompleteLesson = async (checked: boolean | string) => {
    try {
      await createHistory({
        course: lesson.course,
        lesson: lesson._id,
        checked,
      });
    } catch (error) {}
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 bgDarkMode border borderDarkMode rounded-lg p-4 font-medium text-sm",
        isActive ? "text-primary font-semibold pointer-events-none" : "",
      )}
    >
      {url && (
        <Checkbox
          defaultChecked={isChecked}
          className="size-4 shrink-0"
          onCheckedChange={(checked) => handleCompleteLesson(checked)}
        />
      )}
      <IconPlay className="size-5 shrink-0" />
      {url ? (
        <Link href={url} className="line-clamp-1" title={lesson.title}>
          {lesson.title}
        </Link>
      ) : (
        <h4 className="line-clamp-1" title={lesson.title}>
          {lesson.title}
        </h4>
      )}
      <span className="ml-auto text-xs font-semibold shrink-0">
        {lesson.duration} phút
      </span>
    </div>
  );
};

export default LessonItem;
