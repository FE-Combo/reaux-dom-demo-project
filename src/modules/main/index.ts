import Main from './components/Main';
import cookieUitls from 'js-cookie';
import { Model, register } from 'reaux-dom';
import { State, Language } from './type';

const SUPPORT_LANGUAGE = ['zh', 'en'];

const initialState: State = {
  name: 'main',
  lang: 'zh'
};

class ActionHandler extends Model<State> {
  async onReady() {
    console.log('main onReady');
    const lang =
      cookieUitls.get('lang') || (this.analyzeAcceptLanguage(navigator.languages.join(',') || 'zh') as Language);
    this.setState({ lang });
  }

  async onLoad() {
    console.log('main onLoad');
  }

  private analyzeAcceptLanguage(acceptLanguageString: string): string {
    let result = 'en';
    const languageSpecies = SUPPORT_LANGUAGE;
    acceptLanguageString
      ?.split(',')
      ?.reverse()
      ?.forEach((_) => {
        languageSpecies.forEach((languageSpecie) => {
          _.includes(languageSpecie) && (result = languageSpecie);
        });
      });

    return result;
  }
}

export const { actions, View } = register(new ActionHandler('main', initialState), Main);
