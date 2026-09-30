import { TUpdateCourseLecture } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import LessonItem from "./LessonItem";

const LessonContent = ({
  lectures,
  course,
  slug,
}: {
  lectures: TUpdateCourseLecture[];
  course: string;
  slug: string;
}) => {
  return (
    <div className="flex flex-col gap-5">
      {lectures.map((lecture: TUpdateCourseLecture) => (
        <Accordion
          className="w-full"
          key={lecture._id}
        >
          <AccordionItem value={lecture._id.toString()}>
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
                    lesson={lesson}
                    url={!course ? "" : `/${course}/lesson?slug=${lesson.slug}`}
                    isActive={!slug ? false : lesson.slug === slug}
                  ></LessonItem>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default LessonContent;