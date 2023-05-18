import "./Layout.scss";

export type IProps = React.PropsWithChildren;

export const Layout: React.FC<IProps> = ({ children }) => {
  return <div className="layout__app">{children}</div>;
};
