import { useAppSelector } from "../../../../hooks/useAppSelector";

import { Accepted } from "../VisitStatus/Accepted";
import { Problem } from "../VisitStatus/Problem";
import { Provided } from "../VisitStatus/Provided";
import { Rejected } from "../VisitStatus/Rejected";
import { Confirmed } from "../VisitStatus/Confirmed";
import { VisitForm } from "../VisitForm/VisitForm";

import { Status } from "../../../../types/appointment";

export const VisitMain: React.FC = () => {
  const status = useAppSelector((state) => state.appointment.data.status);
  const message = useAppSelector((state) => state.appointment.message);

  const statusComponentMapper: Record<Status, any> = {
    none: <VisitForm />,
    accepted: <Accepted />,
    rejected: <Rejected message={message} />,
    confirmed: <Confirmed />,
    error: <Problem />,
    provided: <Provided />,
  };

  return <>{statusComponentMapper[status]}</>;
};
