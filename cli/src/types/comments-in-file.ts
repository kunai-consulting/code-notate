export type CommentsInFile = {
  filename: string;
  comments: {
    targetLine: string;
    comment: string[];
  }[];
};