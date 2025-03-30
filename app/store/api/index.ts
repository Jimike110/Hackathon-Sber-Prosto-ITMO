// app/store/api/index.ts
import {getBaseUrl} from "@/app/utils/getBaseUrl";

export const BASE_URL = getBaseUrl()

export enum API_Endpoints {
  USERS_REGISTER = '/v1/users/register',
  USERS_LOGIN = '/v1/users/login',


}