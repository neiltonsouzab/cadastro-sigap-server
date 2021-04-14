export default interface ICreateUgRegistrationDTO {
  code: string;
  cnpj: string;
  name: string;
  fantasy_name: string;
  address: string;
  number: string;
  district: string;
  cep: string;
  complement?: string;
  email: string;
  phone: string;
  site: string;
  short_name: string;
  open_date: Date;
  legal_nature_code: string;
  obs?: string;
  type: string;
  expense_ordinator_cpf: string;
  expense_ordinator_name: string;
  expense_ordinator_email: string;
  user_id: number;
  ug_id: number;
  files: Array<{
    name: string;
    original_name: string;
    content_type: string;
    size: number;
    from: string;
  }>;
}
