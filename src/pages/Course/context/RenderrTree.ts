interface RenderTree {
    id: string;
    name: string;
    children?: RenderTree[];
    page?: boolean;
  }
  export default RenderTree