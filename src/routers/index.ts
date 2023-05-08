import { Auth } from "../components/Auth/Authorization/Auth";
import { PasswordRecovery } from "../components/Auth/PasswordRecovery/PasswordRecovery";
import { Register } from "../components/Auth/Register/Register";
import { Introduction } from "../components/Introduction/Introduction";

export interface iRouter {
  path: string;
  component: React.ComponentType;
}

export enum RoutesNames {
  INTRO = "/intro",
  AUTH = "/",
  REGISTRATION = "/registration",
  RECOVERY = "/recovery",
}

export const publicRoutes: iRouter[] = [
  { path: RoutesNames.INTRO, component: Introduction },
  { path: RoutesNames.AUTH, component: Auth },
  { path: RoutesNames.REGISTRATION, component: Register },
  { path: RoutesNames.RECOVERY, component: PasswordRecovery },
];
