interface RenderTree {
    id: string;
    name: string;
    children?: RenderTree[];
    type: string;
  }
  export default RenderTree