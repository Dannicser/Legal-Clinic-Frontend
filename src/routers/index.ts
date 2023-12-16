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
import { VisitEdit } from "../components/Appointment/Visit/VisitEdit/VisitEdit";
import { AppointmentHistory } from "../components/Appointment/AppointmentHistory/AppointmentHistory";
import { AppointmentCalendar } from "../components/Appointment/AppointmentCalendar/AppointmentCalendar";
import { FAQ } from "../components/FAQ/FAQ";
import { NotificationList } from "../components/Notification/NotificationList/NotificationList";
import { Settings } from "../components/Settings/Settings";
import { Support } from "../components/Support/Support";
import { ResetPassword } from "../components/Auth/ResetPassword/ResetPassword";

export interface iRouter {
  path: string;
  component: React.ComponentType;
}

export enum PublicRoutesNames {
  INTRO = "/intro",
  AUTH = "/",
  REGISTRATION = "/registration",
  RECOVERY = "/recovery",
  RESET = "/recovery/:id",
}

export enum PrivetRoutesNames {
  HOME = "/",
  MENU = "/menu",
  CONVERSATION = "/conversation",
  APPOINTMENT = "/appointment",
  APPOINTMENT_EDIT = "/appointment/edit",
  APPOINTMENT_HISTOTY = "/history",
  APPOINTMENT_CALENDAR = "/appointment/calendar",
  MAP = "/map",
  PROFILE = "/profile",
  EDIT = "/profile/edit",
  FULLPOST = "/post/:id",
  FAQ = "/faq",
  NOTIFICATIONS = "/notifications",
  SETTINGS = "/settings",
  SUPPORT = "/support",
}

export const publicRoutes: iRouter[] = [
  { path: PublicRoutesNames.INTRO, component: Introduction },
  { path: PublicRoutesNames.AUTH, component: Auth },
  { path: PublicRoutesNames.REGISTRATION, component: Register },
  { path: PublicRoutesNames.RECOVERY, component: PasswordRecovery },
  { path: PublicRoutesNames.RESET, component: ResetPassword },
];

export const privetRoutes: iRouter[] = [
  { path: PrivetRoutesNames.HOME, component: HomePage },
  { path: PrivetRoutesNames.APPOINTMENT, component: AppointmentPage },
  { path: PrivetRoutesNames.APPOINTMENT_EDIT, component: VisitEdit },
  { path: PrivetRoutesNames.APPOINTMENT_HISTOTY, component: AppointmentHistory },
  { path: PrivetRoutesNames.APPOINTMENT_CALENDAR, component: AppointmentCalendar },

  { path: PrivetRoutesNames.MAP, component: MapPage },
  { path: PrivetRoutesNames.PROFILE, component: ProfilePage },

  { path: PrivetRoutesNames.MENU, component: Menu },
  { path: PrivetRoutesNames.CONVERSATION, component: Conversation },
  { path: PrivetRoutesNames.EDIT, component: EditProfile },
  { path: PrivetRoutesNames.FULLPOST, component: FullPost },

  { path: PrivetRoutesNames.FAQ, component: FAQ },
  { path: PrivetRoutesNames.NOTIFICATIONS, component: NotificationList },

  { path: PrivetRoutesNames.SETTINGS, component: Settings },

  { path: PrivetRoutesNames.SUPPORT, component: Support },
];
