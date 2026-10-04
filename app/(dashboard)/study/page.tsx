import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/courses/CourseItem";
import Heading from "@/components/typography/Heading";
import { getUserCourses } from "@/lib/actions/user.actions";

const StudyPage = async () => {
  const courses = await getUserCourses();
  return (
    <>
      <Heading>Khu vực học tập</Heading>
      <CourseGrid>
        {courses &&
          courses.length > 0 &&
          courses?.map((item) => (
            <CourseItem
              key={item.slug}
              data={item}
              cta="Tiếp tục học"
              url="/"
            ></CourseItem>
          ))}
      </CourseGrid>
    </>
  );
};

export default StudyPage;
