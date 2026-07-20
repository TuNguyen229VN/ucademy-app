import Image from "next/image";
import Link from "next/link";

const CourseItem = () => {
  return (
    <div className="bg-white border-gray-200 p-5 rounded-lg">
      <Link href={"#"} className="block h-50">
        <Image
          src={
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="w-full h-full object-cover rounded"
          alt="course item"
          width={300}
          height={200}
          sizes="@media (min-width: 640px) 300px, 100vw"
          priority
        />
      </Link>
    </div>
  );
};

export default CourseItem;
