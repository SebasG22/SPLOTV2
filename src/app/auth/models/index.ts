export interface UserEmail {
  email: string;
  password: string;
}

export interface UserInformation {
  name: string;
  identification?: string;
  email: string;
  picture_url?: string;
  picture_base64 ?: string;
}
