import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import logo from "../../img/yt.png";
import { useAppDispatch } from "../../app/hooks";
import { setOff } from "../SearchBar/SearchBarSlice";
import { SearchBar } from "../SearchBar/SearchBar";
import { togglePage } from "../ListVideoItem/ListVideoItemSlice";

interface NavbarProps {
  switchTheme: Function;
}

const Navbar = ({ switchTheme }: NavbarProps) => {
  const dispatch = useAppDispatch();
  return (
    <nav className={styles.navbar}>
      <div
        className={styles.title}
        onClick={() => {
          dispatch(setOff());
          dispatch(togglePage());
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
