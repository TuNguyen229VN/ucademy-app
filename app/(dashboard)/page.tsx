import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/courses/CourseItem";
import Heading from "@/components/typography/Heading";

const DashboardPage = () => {
  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </CourseGrid>
    </div>
  );
};

export default DashboardPage;
