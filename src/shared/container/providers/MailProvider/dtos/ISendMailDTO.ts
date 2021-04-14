import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  address: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
