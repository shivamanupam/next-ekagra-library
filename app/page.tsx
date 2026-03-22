import { connectDB } from "@/lib/db";

export default async function Home() {
  await connectDB();
  return (
    <>
      <h2>MongoDB connected</h2>
    </>
  );
}
