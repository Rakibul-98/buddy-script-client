export interface Post {
  id: string;
  authorId: string;
  content: string;
  imageUrl: string | null;
  visibility: "PUBLIC" | "PRIVATE";
  createdAt: string;
  updatedAt: string;
  author: {
    firstName: string;
    lastName: string;
    email: string;
  };
  _count: {
    comments: number;
    likes: number;
  };
}

export interface PostResponse {
  success: boolean;
  message: string;
  data: {
    data: Post[];
    nextCursor: string | null;
  };
}
