import { BsHouse } from "react-icons/bs";
import { LuUserCircle2 } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function MenuList() {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="footer__grid">
        <button type="button" onClick={() => navigate("/")}>
          <BsHouse />
          Home
        </button>
        <button type="button" onClick={() => navigate("/profile")}>
          <LuUserCircle2 />
          Profile
        </button>
        <button type="button" onClick={() => navigate("/")}>
          <MdLogout />
          Logout
        </button>
      </div>
    </div>
  );
}
