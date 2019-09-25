export interface KbAuthUser {
  id: number;
  mail: string;
  password: string;
  idTenant: number;
  idEmployee: number;
  idCompany: number;
  token: string;
  isMailVerified: boolean;
  roleList: number[];
  thumbnailPath: string;
  name: string;
  surname: string;
}
