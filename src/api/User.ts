import { makeAPIRequest, RequestResult } from "./index";

export type ResponseUser = {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  country: string;
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
    console.log(response);
    return {
      success: Boolean(response.id),
      user: {
        id: response.id,
        name: response.display_name,
        images: response.images,
        country: response.country,
      },
    };
  },
};

export default Users;
