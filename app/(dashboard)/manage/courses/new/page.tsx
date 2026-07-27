import CourseAddNew from "@/components/courses/CourseAddNew";
import Heading from "@/components/typography/Heading";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";

const NewCoursesPage = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  const mongoUser = await getUserInfo({ userId });
  if (!mongoUser) return null;
  return (
    <>
      <Heading>Tạo khóa học mới</Heading>
      <CourseAddNew user={JSON.parse(JSON.stringify(mongoUser))} />
    </>
  );
};

export default NewCoursesPage;
