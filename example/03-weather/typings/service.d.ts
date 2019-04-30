import 'daruk';
import weather from '../services/weather';

declare module 'daruk' {
  interface Service {
    weather: weather;
  }
}
