import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../../img/yt.png";
import { useAppDispatch } from "../../app/hooks";
import {
  setMOCurrentPage,
  setPrevKind,
  setVideoQuery,
  toggleLoad,
} from "../ListMostPopular/ListMostPopularSlice";
import { videoQueryState } from "../../services/types";

interface NavbarProps {
  switchTheme: Function;
}

const Navbar = ({ switchTheme }: NavbarProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialMostPopular: videoQueryState = {
    part: ["snippet", "contentDetails", "statistics"],
    chart: "mostPopular",
    pageToken: "",
    id: [],
    maxResults: "50",
  };

  const handleClick = () => {
    dispatch(setPrevKind(""));
    dispatch(setVideoQuery(initialMostPopular));
    dispatch(setMOCurrentPage(0));
    dispatch(toggleLoad());
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.title} onClick={handleClick}>
        <img src={logo} alt="yt logo" />
        <div className={styles.divTitle}>YT Searcher</div>
      </div>
      <button
        className={styles.themeButton}
        onClick={() => {
          switchTheme();
        }}
      >
        Switch theme
      </button>
    </nav>
  );
};

export default Navbar;
