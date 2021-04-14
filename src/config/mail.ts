interface IMailConfig {
  driver: 'ethereal' | 'sefin';
  defaults: {
    from: {
      address: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      address: 'ticontabilidade@sefin.ro.gov.br',
      name: 'GETIC - Núcleo Contábil e Financeiro',
    },
  },
} as IMailConfig;
