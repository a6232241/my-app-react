export interface PostDataDTO {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface LoginStateDTO {
  success: boolean;
  message: string;
}