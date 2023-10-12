import Main from './component/Main';
import { register, Model, connect } from 'reaux-dom';
import { State } from './type';
import { AllState } from 'src/utils/state';
import { ObserverInstanceCallback } from 'react-intersection-observer';

const initialState: State = {
  name: 'about',
  big: 10n
};

class ActionHandler extends Model<State, AllState> {
  async onReady() {
    console.info('about onReady');
  }

  onShow(entry: Parameters<ObserverInstanceCallback>[1]) {
    console.log('about onShow', entry);
  }

  onHide(entry: Parameters<ObserverInstanceCallback>[1]) {
    console.log('about onHide', entry);
  }

  onUpdate(...args): void {
    console.log('about onUpdate', args);
  }

  onUnload(): void {
    console.log('about onUnload');
  }

  async goHome() {
    this.router.push('/home');
  }
}

const { actions, View } = connect((state: AllState) => ({ name: state.about.name }))(
  register(new ActionHandler('about', initialState), Main)
);

export { actions, View };
