import { BlogCard, BlogHeader, FeaturedBlogCard } from "@/components/blog-card";
import { PageBuilder } from "@/components/pagebuilder";
import { sanityFetch } from "@/lib/sanity/live";
import { queryBlogIndexPageData } from "@/lib/sanity/query";
import { getMetaData } from "@/lib/seo";

async function fetchBlogPosts() {
  return await sanityFetch({
    query: queryBlogIndexPageData,
  });
}

export async function generateMetadata() {
  const { data } = await fetchBlogPosts();
  if (!data) return getMetaData({});
  return getMetaData(data);
}

export default async function BlogIndexPage() {
  const { data } = await fetchBlogPosts();
  if (!data) return null;
  const { featuredBlog, blogs, title, description, pageBuilder, _id, _type } =
    data ?? {};

  return (
    <main className="">
      <div className="container my-16 mx-auto px-4 md:px-6">
        <div className="">
          <BlogHeader title={title} description={description} />
          <div className="mx-auto mt-8 sm:mt-12 md:mt-16 space-y-12 lg:space-y-20">
            {featuredBlog && (
              <div className="w-full">
                <FeaturedBlogCard blog={featuredBlog} />
              </div>
            )}
            <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
              {blogs.map((blog, index) => (
                <BlogCard key={`${blog?._id}-${index}`} blog={blog} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <PageBuilder pageBuilder={pageBuilder ?? []} id={_id} type={_type} />
    </main>
  );
}
