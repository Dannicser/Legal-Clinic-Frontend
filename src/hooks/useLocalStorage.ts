interface IProps {
  key: string;
  data?: string | number | object | any[];
  action: "get" | "set" | "remove";
}

export const UseLocalStorage = ({ key, data, action }: IProps): any => {
  switch (action) {
    case "set":
      return localStorage.setItem(key, data + "");

    case "get":
      return localStorage.getItem(key);

    case "remove":
      return localStorage.removeItem(key);
  }
};
