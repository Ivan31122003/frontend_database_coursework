import Noty from 'noty';
import 'noty/lib/noty.css';

export const createNotify = (type, text) => {
  new Noty({
    text: text,
    type: type,
    layout: 'topLeft',
    timeout: 3000,
  }).show();
};
