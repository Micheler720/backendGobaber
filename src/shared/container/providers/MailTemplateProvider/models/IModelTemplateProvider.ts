import IParseMailTemplateDto from '../dtos/IParseMailTemplateDto';

interface IMailTemplateProvider {
    parse(data: IParseMailTemplateDto): Promise<string>;
}

export default IMailTemplateProvider;
