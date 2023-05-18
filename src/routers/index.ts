import { Menu } from "../components/Menu/Menu";
import { Auth } from "../components/Auth/Authorization/Auth";
import { PasswordRecovery } from "../components/Auth/PasswordRecovery/PasswordRecovery";
import { Register } from "../components/Auth/Register/Register";
import { Introduction } from "../components/Introduction/Introduction";
import { Home } from "../pages/Home";
import { Conversation } from "../components/Conversation/Conversation";
import { Map } from "../components/Map/Map";
import { Profile } from "../components/Profile/Profile";
import { Appointment } from "../components/Appointment/Appointment";

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
  MENU = "/menu",
  CONVERSATION = "/conversation",
  APPOINTMENT = "/appointment",
  MAP = "/map",
  PROFILE = "/profile",
}

export const publicRoutes: iRouter[] = [
  { path: PublicRoutesNames.INTRO, component: Introduction },
  { path: PublicRoutesNames.AUTH, component: Auth },
  { path: PublicRoutesNames.REGISTRATION, component: Register },
  { path: PublicRoutesNames.RECOVERY, component: PasswordRecovery },
];

export const privetRoutes: iRouter[] = [
  { path: PrivetRoutesNames.HOME, component: Home },
  { path: PrivetRoutesNames.MENU, component: Menu },
  { path: PrivetRoutesNames.CONVERSATION, component: Conversation },
  { path: PrivetRoutesNames.APPOINTMENT, component: Appointment },
  { path: PrivetRoutesNames.MAP, component: Map },
  { path: PrivetRoutesNames.PROFILE, component: Profile },
];
