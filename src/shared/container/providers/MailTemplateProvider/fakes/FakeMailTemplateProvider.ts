import IMailTemplateProvider from '../models/IModelTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
    async parse(): Promise<string> {
        return 'Mail content';
    }
}

export default FakeMailTemplateProvider;
