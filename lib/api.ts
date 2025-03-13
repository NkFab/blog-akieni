export async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
}

export async function fetchPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
}

export async function fetchComments(postId: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return res.json();
}
