import handlebars from 'handlebars';
import fs from 'fs';
import IParseMailTemplateDto from '../dtos/IParseMailTemplateDto';
import IMailTemplateProvider from '../models/IModelTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
    public async parse({
        file,
        variables,
    }: IParseMailTemplateDto): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });
        const parseTemplate = handlebars.compile(templateFileContent);
        return parseTemplate(variables);
    }
}
export default HandlebarsMailTemplateProvider;
