type PageProps = {
  searchParams: Promise<{
    slug?: string;
  }>;
};
const UpdateContentCoursePage = async ({ searchParams }: PageProps) => {
  const { slug } = await searchParams;
  if (!slug) return null;
  return <div></div>;
};

export default UpdateContentCoursePage;
