import CourseUpdate from "@/components/courses/CourseUpdate";
import Heading from "@/components/typography/Heading";
import { getCourseBySlug } from "@/lib/actions/course.actions";

type PageProps = {
  searchParams: Promise<{
    slug?: string;
  }>;
};

const UpdateCoursePage = async ({ searchParams }: PageProps) => {
  const { slug } = await searchParams;
  if (!slug) return null;
  const findCourse = await getCourseBySlug({ slug });
  if (!findCourse) return null;
  return (
    <>
      <Heading className="mb-8">Cập nhật khóa học</Heading>
      <CourseUpdate data={JSON.parse(JSON.stringify(findCourse))}/>
    </>
  );
};

export default UpdateCoursePage;
