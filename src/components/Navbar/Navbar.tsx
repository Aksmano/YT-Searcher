import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/yt.png";
import { useAppDispatch } from "../../app/hooks";
import { setOff } from "../SearchBar/SearchBarSlice";
import { SearchBar } from "../SearchBar/SearchBar";
import { setUpdate, togglePage } from "../ListVideoItem/ListVideoItemSlice";
import { setVideoPageToken } from "../../services/queryParamsBuilders/videoQuerySlice";

interface NavbarProps {
  switchTheme: Function;
}

const Navbar = ({ switchTheme }: NavbarProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div
        className={styles.title}
        onClick={() => {
          dispatch(setOff());
          dispatch(setVideoPageToken(""));
          dispatch(togglePage());
          // dispatch(setUpdate(false));
          navigate("/");
          console.log("CLICKED LOGO");
        }}
      >
        {/* <Link to={"/"} key={0} className={styles.linkTitle}> */}
        <img src={logo} alt="yt logo" />
        <div className={styles.divTitle}>YT Searcher</div>
        {/* </Link> */}
      </div>
      <SearchBar />

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
