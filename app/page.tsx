import { connectToDatabase } from "@/libs/mongoose";

export default async function Home() {
  const connect = await connectToDatabase();
  return <div>Mian</div>;
}
