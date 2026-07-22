import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/courses/CourseItem";
import Heading from "@/components/typography/Heading";
import createUser from "@/lib/actions/user.actions";

const DashboardPage = async () => {
  // const user = await createUser({
  //   clerkId: "clerk_123",
  //   email_address: "tunguyen2209@gmail.com",
  //   username: "tu",
  // });
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
