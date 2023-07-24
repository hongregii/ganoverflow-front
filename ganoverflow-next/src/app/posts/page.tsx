import Link from "next/link";
import { getAllChatPost } from "./api/chatposts";
import { parseDate, parseDateWithSeconds } from "@/utils/parseDate";
import { Pagination } from "./Pagination";

export default async function PostPage({
  searchParams,
}: {
  searchParams: { [page: string]: number };
}) {
  const currentPage = searchParams.page ?? 1;

  const allPosts = await getAllChatPost({ page: currentPage });

  // ! 페이징용 더미데이터
  const totalCount = allPosts.postCount;
  const totalPage = Math.ceil(totalCount / 10);

  const pagingButtons = Array.from({ length: totalPage + 2 }).map((e, idx) =>
    idx.toString()
  );
  pagingButtons[0] = "<";
  pagingButtons[pagingButtons.length - 1] = ">";

  return (
    <>
      <div className="post-chatpostName text-xl ">GanOverflow - POSTS</div>
      <div className="grid">
        <table className="w-3/5 h-[600px] place-self-center">
          <thead className="posts-tablehead border border-gray-300 border-x-0">
            <tr>
              <th className="p-2.5">번호</th>
              <th className="p-2.5">카테고리</th>
              <th className="p-2.5">제목</th>
              <th className="p-2.5">글쓴이</th>
              <th className="p-2.5">작성일</th>
              <th className="p-2.5">댓글</th>
              <th className="p-2.5">조회수</th>
              <th className="p-2.5">추천</th>
            </tr>
          </thead>
          <tbody>
            {allPosts.posts.length > 0 ? (
              allPosts.posts.map((post: any, id: number) => (
                <tr
                  className="border border-x-0 border-spacing-2 border-zinc-500 hover:bg-slate-800"
                  key={id}
                >
                  <td className="py-1">{post?.chatPostId}</td>
                  <td className="py-1">{post?.category ?? "카테고리"}</td>
                  <td className="py-1">
                    <Link href={`/posts/${post?.chatPostId}`}>
                      {post?.chatpostName}
                    </Link>
                  </td>
                  <td className="py-1">
                    {post?.userId?.nickname ?? "작성자 없음"}
                  </td>
                  <td className="py-1">
                    {parseDateWithSeconds(post?.createdAt)}
                  </td>
                  <td className="py-1">{post?.comments?.length ?? 0}</td>
                  <td className="py-1">{post?.viewCount}</td>
                  <td className="py-1">
                    {post?.stars.reduce(
                      (acc: number, curr: any) => acc + curr.value,
                      0
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination-wrapper">
        <Pagination currentPage={currentPage} totalPage={totalPage} />
      </div>
    </>
  );
}
