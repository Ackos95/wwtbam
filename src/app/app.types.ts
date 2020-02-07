import { IGameActions, IGameState } from './game/game.types';
import { IQuestionsActions, IQuestionsState } from './questions/questions.types';


export type IAppActions = IGameActions | IQuestionsActions;

export interface IAppState {
  game: IGameState;
  questions: IQuestionsState;
}
