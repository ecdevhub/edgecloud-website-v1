import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getCategories, getAllTags } from "@/lib/blog";
import AdminShell from "@/components/AdminShell";
import PostEditor from "@/components/blog/PostEditor";

export default async function NewPostPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  const [categories, tags] = await Promise.all([getCategories(), getAllTags()]);
  return (
    <AdminShell user={user}>
      <PostEditor categories={categories as any} tags={tags} />
    </AdminShell>
  );
}
