import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import logo from "../../img/yt.png";

interface NavbarProps {
  switchTheme: Function;
}

const Navbar = ({ switchTheme }: NavbarProps) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.title}>
        <Link to={"/"} key={0} className={styles.linkTitle}>
          <img src={logo} alt="yt logo" />
          <div className={styles.divTitle}>YT Searcher</div>
        </Link>
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
