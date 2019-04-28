import 'daruk';
import CommentsModel from '../services/CommentsModel';

declare module 'daruk' {
  interface Service {
    CommentsModel: CommentsModel;
  }
}
