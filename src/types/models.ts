import type { PostDataDTO, LoginStateDTO } from "./api";

export type PostData = PostDataDTO & {
  error: null | string;
};

export type LoginState = LoginStateDTO;