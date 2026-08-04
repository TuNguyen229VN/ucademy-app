import CourseUpdateContent from "@/components/courses/CourseUpdateContent";
import Heading from "@/components/typography/Heading";
import { getCourseBySlug } from "@/lib/actions/course.actions";

type PageProps = {
  searchParams: Promise<{
    slug?: string;
  }>;
};
const UpdateContentCoursePage = async ({ searchParams }: PageProps) => {
  const { slug } = await searchParams;
  if (!slug) return null;
  const findCourse = await getCourseBySlug({ slug });
  if (!findCourse) return <div>Không tìm thấy khóa học</div>;
  return (
    <>
      <Heading className="mb-10">
        Nội dung: <strong className="text-primary">{findCourse.title}</strong>
      </Heading>
      <CourseUpdateContent course={JSON.parse(JSON.stringify(findCourse))} />
    </>
  );
};

export default UpdateContentCoursePage;
