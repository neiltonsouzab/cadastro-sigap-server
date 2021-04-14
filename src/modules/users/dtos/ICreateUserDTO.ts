export default interface ICreateUserDTO {
  cpf: string;
  name: string;
  nickname: string;
  email: string;
  type: string;
  ugs: Array<{
    id: number;
  }>;
}
