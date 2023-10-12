import { StateView } from 'reaux-dom';
import { State as HomeState } from 'src/modules/home/type';
import { State as AboutState } from 'src/modules/about/type';
import { State as Main } from 'src/modules/main/type';

export interface AllState extends StateView {
  main: Main;
  home: HomeState;
  about: AboutState;
}
