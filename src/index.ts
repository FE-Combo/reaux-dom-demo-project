import 'normalize.css';
import { View } from 'src/modules/main';
import { start } from 'reaux-dom';

start({ Component: View, container: document.getElementById('framework-app-root') as HTMLDivElement });
