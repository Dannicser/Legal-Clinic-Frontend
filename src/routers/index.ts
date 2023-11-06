import { Menu } from "../components/Menu/Menu";
import { Auth } from "../components/Auth/Authorization/Auth";
import { PasswordRecovery } from "../components/Auth/PasswordRecovery/PasswordRecovery";
import { Register } from "../components/Auth/Register/Register";
import { Introduction } from "../components/Introduction/Introduction";
import { HomePage } from "../pages/HomePage";
import { Conversation } from "../components/Conversation/Conversation";

import { EditProfile } from "../components/Profile/EditProfile/EditProfile";
import { FullPost } from "../components/Post/FullPost/FullPost";
import { AppointmentPage } from "../pages/AppointmentPage";
import { MapPage } from "../pages/MapPage";
import { ProfilePage } from "../pages/ProfilePage";
import { AdminPage } from "../pages/AdminPage";
import { VisitEdit } from "../components/Appointment/Visit/VisitEdit/VisitEdit";

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
  APPOINTMENT_EDIT = "/appointment/edit",
  MAP = "/map",
  PROFILE = "/profile",
  EDIT = "/profile/edit",
  FULLPOST = "/post/:id",
}

export enum AdminRoutesNames {
  HOME = "/admin",
}

export const publicRoutes: iRouter[] = [
  { path: PublicRoutesNames.INTRO, component: Introduction },
  { path: PublicRoutesNames.AUTH, component: Auth },
  { path: PublicRoutesNames.REGISTRATION, component: Register },
  { path: PublicRoutesNames.RECOVERY, component: PasswordRecovery },
];

export const privetRoutes: iRouter[] = [
  { path: PrivetRoutesNames.HOME, component: HomePage },
  { path: PrivetRoutesNames.APPOINTMENT, component: AppointmentPage },
  { path: PrivetRoutesNames.APPOINTMENT_EDIT, component: VisitEdit },

  { path: PrivetRoutesNames.MAP, component: MapPage },
  { path: PrivetRoutesNames.PROFILE, component: ProfilePage },

  { path: PrivetRoutesNames.MENU, component: Menu },
  { path: PrivetRoutesNames.CONVERSATION, component: Conversation },
  { path: PrivetRoutesNames.EDIT, component: EditProfile },
  { path: PrivetRoutesNames.FULLPOST, component: FullPost },
];

export const adminRoutes: iRouter[] = [{ path: AdminRoutesNames.HOME, component: AdminPage }];
