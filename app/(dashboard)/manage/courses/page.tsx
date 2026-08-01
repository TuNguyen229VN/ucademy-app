import CourseManage from "@/components/courses/CourseManage"
import { getAllCourse } from "@/lib/actions/course.actions"

const CoursesPage = async () => {
  const courses=await getAllCourse();
  return (
    <>
    <CourseManage courses={courses?JSON.parse(JSON.stringify(courses)): []}/>
    </>
  )
}

export default CoursesPage