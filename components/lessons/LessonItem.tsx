"use client";
import Link from "next/link";
import { IconPlay } from "../icons";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { createHistory } from "@/lib/actions/history.actions";
import { startTransition, useOptimistic } from "react";

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
  const [optimisticChecked, setOptimisticChecked] = useOptimistic(isChecked);
  const handleCompleteLesson = async (checked: boolean | string) => {
    startTransition(async () => {
      setOptimisticChecked(!!checked); // đổi UI ngay lập tức
      try {
        await createHistory({
          course: lesson.course,
          lesson: lesson._id,
          checked,
          path: url || "/",
        });
      } catch (error) {
        // lỗi thì useOptimistic tự rollback về isChecked
      }
    });
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 bgDarkMode border borderDarkMode rounded-lg p-4 font-medium text-sm",
        isActive ? "font-bold" : "",
      )}
    >
      {url && (
        <Checkbox
          checked={optimisticChecked}
          className="shrink-0"
          onCheckedChange={handleCompleteLesson}
        />
      )}
      <IconPlay className="size-5 shrink-0" />
      {url ? (
        <Link
          href={url}
          className={cn("line-clamp-1", isActive && "pointer-events-none")}
          title={lesson.title}
        >
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
