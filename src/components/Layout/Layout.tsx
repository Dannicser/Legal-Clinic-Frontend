import "./Layout.scss";

interface IExternalParams {
  paddingTop?: number;
  paddingBottom?: number;
  paddingRight?: number;
  paddingLeft?: number;
}

interface IInternalParams {
  paddingTop?: number;
  paddingBottom?: number;
  paddingRight?: number;
  paddingLeft?: number;
}

interface IPropsLayout {
  children: React.ReactNode;
  external?: IExternalParams;
  internal?: IInternalParams;
}

export const Layout: React.FC<IPropsLayout> = ({ children, external = {}, internal = {} }) => {
  return (
    <div style={external} className="layout__container">
      <div style={internal} className="layout__app">
        {children}
      </div>
    </div>
  );
};
