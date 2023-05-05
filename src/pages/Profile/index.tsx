import Button from "@mui/material/Button";
import { useContext} from "react";
import { AuthContext } from "../../context/auth-context";
import { auth, signOutUser } from "../../firebase";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <div >
      {user && (
        <>
          <h1>Hello, {user.displayName}</h1>
          <Button onClick={(e: any) => signOutUser(e, auth)}>SIGN OUT</Button>
        </>
      )}
    </div>
  );
}
