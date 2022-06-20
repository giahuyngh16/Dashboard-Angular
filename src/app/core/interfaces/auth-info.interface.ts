import { IProfile } from './profile.interface';

export interface IOAuthInfo {
  access_token: string;
  expires_at: number;
  id_token: string;
  profile: IProfile;
  scope: string;
  session_state: string;
  state: any;
  token_type: string;
}
