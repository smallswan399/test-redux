import { ReduxTable } from './app.state';


export interface ActionData {
  type: string;
  payload: any;
}


export function getActionData(list: any, type: string): ActionData {
  return {
    type: type,
    payload: new ReduxTable<string>({
      ids: Object.keys(list),
      list: list
    })
  };
}
