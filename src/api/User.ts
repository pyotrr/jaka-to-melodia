import { makeAPIRequest, RequestResult } from "./index";

export type ResponseUser = {
  id: string;
  name: string;
  images: Array<{ url: string }>;
};

type GetUserProfileResponse = RequestResult & { user: ResponseUser };

interface IUser {
  getUserProfile({ token }: { token: string }): Promise<GetUserProfileResponse>;
}

const Users: IUser = {
  async getUserProfile({ token }): Promise<GetUserProfileResponse> {
    const response = await makeAPIRequest({
      path: "/me",
      accessToken: token,
      method: "GET",
    });
    return {
      success: Boolean(response.id),
      user: {
        id: response.id,
        name: response.display_name,
        images: response.images,
      },
    };
  },
};

export default Users;
