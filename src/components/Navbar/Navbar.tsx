import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/yt.png";
import { useAppDispatch } from "../../app/hooks";
import { SearchBar } from "../SearchBar/SearchBar";
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

  return (
    <nav className={styles.navbar}>
      <div
        className={styles.title}
        onClick={() => {
          // dispatch(setOff());
          // dispatch(setVideoPageToken(""));
          // dispatch(togglePage());
          // dispatch(setUpdate(false));
          // dispatch(setFechtedInfo([]))
          dispatch(setPrevKind(""));
          dispatch(setVideoQuery(initialMostPopular));
          dispatch(setMOCurrentPage(0));
          dispatch(toggleLoad());
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
