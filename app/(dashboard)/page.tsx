import CourseItem from "@/components/courses/CourseItem";
import Heading from "@/components/typography/Heading";

const DashboardPage = () => {
  return (
    <div>
      <Heading>Khám phá</Heading>
      <div className="grid grid-cols-3 gap-8 mt-8">
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </div>
    </div>
  );
};

export default DashboardPage;
