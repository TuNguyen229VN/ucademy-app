import CourseUpdate from "@/components/courses/CourseUpdate";
import Heading from "@/components/typography/Heading";

const UpdateCoursePage = ({
  searchParams,
}: {
  searchParams: { slug: string };
}) => {
  return (
    <>
      <Heading className="mb-8">Cập nhật khóa học</Heading>
      <CourseUpdate/>
    </>
  );
};

export default UpdateCoursePage;
