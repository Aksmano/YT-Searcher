import styles from "./Filters.module.css";

interface FiltersProps {
  filterMode: string;
}

export const Filters = ({ filterMode }: FiltersProps) => {
  // ZROBIC NA WZOR POKEMONOW

  const chooseFilterMode = (): string => {
    return filterMode === "Hide" ? styles.hide : "";
  };

  return (
    <div className={`${styles.navFilters} ${chooseFilterMode()}`}>
      <div className={styles.filters}>
        <form>
          <label htmlFor="id">Name or ID</label>
          <input type="text" name="id" className={styles.input} />
          <label htmlFor="type">Type</label>
          <select name="type" id="type" className={styles.input}>
            <option value="" defaultChecked>
              All
            </option>
            <option value="normal">Normal</option>
            <option value="fighting">Fighting</option>
            <option value="flying">Flying</option>
            <option value="poison">Poison</option>
            <option value="ground">Ground</option>
            <option value="rock">Rock</option>
            <option value="bug">Bug</option>
            <option value="ghost">Ghost</option>
            <option value="steel">Steel</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="electric">Electric</option>
            <option value="psychic">Psychic</option>
            <option value="ice">Ice</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="fairy">Fairy</option>
            <option value="unknown">Unknown</option>
            <option value="shadow">Shadow</option>
          </select>
          <button style={{ margin: "0 2rem 0 0" }}>Reset</button>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};
