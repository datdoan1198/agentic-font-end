import {useSelector} from "react-redux";

export default function Handle() {
  const authUser = useSelector((state) => state.auth.authAdmin);

  return { authUser }
}
