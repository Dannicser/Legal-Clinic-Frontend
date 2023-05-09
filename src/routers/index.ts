import { Auth } from "../components/Auth/Authorization/Auth";
import { PasswordRecovery } from "../components/Auth/PasswordRecovery/PasswordRecovery";
import { Register } from "../components/Auth/Register/Register";
import { Introduction } from "../components/Introduction/Introduction";
import { Home } from "../pages/Home";

export interface iRouter {
  path: string;
  component: React.ComponentType;
}

export enum PublicRoutesNames {
  INTRO = "/intro",
  AUTH = "/",
  REGISTRATION = "/registration",
  RECOVERY = "/recovery",
}

export enum PrivetRoutesNames {
  HOME = "/",
}

export const publicRoutes: iRouter[] = [
  { path: PublicRoutesNames.INTRO, component: Introduction },
  { path: PublicRoutesNames.AUTH, component: Auth },
  { path: PublicRoutesNames.REGISTRATION, component: Register },
  { path: PublicRoutesNames.RECOVERY, component: PasswordRecovery },
];

export const privetRoutes: iRouter[] = [{ path: PrivetRoutesNames.HOME, component: Home }];
