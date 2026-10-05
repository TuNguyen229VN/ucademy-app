import Heading from "@/components/typography/Heading";
import { getUserCourses } from "@/lib/actions/user.actions";
import StudyCourses from "./StudyCourses";

const StudyPage = async () => {
  const courses = await getUserCourses();
  return (
    <>
      <Heading>Khu vực học tập</Heading>
       <StudyCourses
        courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
      ></StudyCourses>
    </>
  );
};

export default StudyPage;
