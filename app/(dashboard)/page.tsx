import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/courses/CourseItem";
import Heading from "@/components/typography/Heading";
import { getAllCourse } from "@/lib/actions/course.actions";

const DashboardPage = async () => {
  const courses = (await getAllCourse()) || [];
  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {courses?.length > 0 &&
          courses?.map((item) => <CourseItem key={item?.slug} data={item} />)}
      </CourseGrid>
    </div>
  );
};

export default DashboardPage;
