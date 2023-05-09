import { Navigate, useLocation } from "react-router-dom";


export default function ErrorPage() {
    const location = useLocation();
    console.log(location.state);
  
    return (
      <div >
       <h2>Error: {location.state}</h2>
      </div>
    );
  }
