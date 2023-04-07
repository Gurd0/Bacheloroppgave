interface RenderTree {
    id: string;
    name: string;
    children?: RenderTree[];
    type: string;
    completed?: boolean;
  }
  export default RenderTree