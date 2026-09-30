import Link from "next/link";
import { IconPlay } from "../icons";
import { cn } from "@/lib/utils";

const LessonItem = ({
  lesson,
  url,
  isActive,
}: {
  lesson: {
    title: string;
    duration: number;
  };
  url?: string;
  isActive?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 bgDarkMode border borderDarkMode rounded-lg p-4 font-medium text-sm",
        isActive ? "text-primary font-semibold pointer-events-none" : ""
      )}
    >
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
