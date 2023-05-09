interface IProps {
  key: string;
  data?: string | number | object | any[];
  action: "get" | "set" | "remove";
}

export const UseLocalStorage = ({ key, data, action }: IProps): any => {
  switch (action) {
    case "set":
      return localStorage.setItem(key, JSON.stringify(data));

    case "get":
      return localStorage.getItem(key);
  }
};
