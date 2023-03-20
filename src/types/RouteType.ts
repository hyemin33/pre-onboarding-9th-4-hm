export interface ISidebar {
  label: string;
  icon?: React.ReactNode;
}
export interface IRoute {
  path: string;
  sidebar?: ISidebar;
}
