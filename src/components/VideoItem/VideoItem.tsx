import { snippet, video } from "../../services/types";
import { Link } from "react-router-dom";
import styles from "./VideoItem.module.css";

interface VideoItemProps {
  snippet: snippet;
}

export const VideoItem = ({ snippet }: VideoItemProps) => {
  const formatDate = (): string => {
    const date = snippet.publishedAt.split("T", 2);
    return `${date[0]}, ${date[1].substring(0, 5)}`;
  };

  const formatDescription = (): string => {
    const splittedDesc = snippet.description.replace("\n", "<br>").split(" ");
    let result = "";
    let index = 0;
    let letterCounter;
    for (let i = 0; i < 4; i++) {}

    return splittedDesc.join(" ");
  };

  return (
    <div className={styles.item}>
      <Link to="/someVideo">
        <img
          src={snippet.thumbnails["medium"]!.url}
          className={styles.thumbnail}
          width={snippet.thumbnails["medium"]!.width}
          height={snippet.thumbnails["medium"]!.height}
          alt=""
        />
      </Link>
      <div className={styles.description}>
        <Link to="/someVideo">
          <div className={styles.title}>{snippet.title}</div>
        </Link>
        <div className={styles.channel}>
          <a href={`https://www.youtube.com/channel/${snippet.channelId}`}>
            {snippet.channelTitle}
          </a>
        </div>
        {/* <div>{formatDescription()}</div> */}
        <div className={styles.publisedAt}>Published at: {formatDate()}</div>
      </div>
    </div>
  );
};
