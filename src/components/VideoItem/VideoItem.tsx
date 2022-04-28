import { snippet } from "../../services/types";
import { Link } from "react-router-dom";
import styles from "./VideoItem.module.css";
import { decode } from "html-entities";

interface VideoItemProps {
  snippet: snippet;
  videoId: string;
}

export const VideoItem = ({ snippet, videoId }: VideoItemProps) => {
  const formatDate = (): string => {
    const date = snippet.publishedAt.split("T", 2);
    return `${date[0]}, ${date[1].substring(0, 5)}`;
  };

  const formatDescription = (): string => {
    return snippet.description.length > 170
      ? snippet.description.substring(0, 170) + "..."
      : snippet.description;
  };

  const formatTitle = (): string => {
    return snippet.title.length > 80
      ? snippet.title.substring(0, 80) + "..."
      : snippet.title;
  };

  return (
    <div className={styles.item}>
      <Link to={`/video/${videoId}`}>
        <img
          src={snippet.thumbnails["medium"]!.url}
          className={styles.thumbnail}
          width={snippet.thumbnails["medium"]!.width}
          height={snippet.thumbnails["medium"]!.height}
          alt=""
        />
      </Link>
      <div className={styles.description}>
        <Link to={`/video/${videoId}`}>
          <div className={styles.title}>{decode(formatTitle())}</div>
        </Link>
        <div className={styles.channel}>
          <a href={`https://www.youtube.com/channel/${snippet.channelId}`}>
            {snippet.channelTitle}
          </a>
        </div>
        <div className={styles.textDescription}>
          {decode(formatDescription())}
        </div>
        <div className={styles.publisedAt}>Published at: {formatDate()}</div>
      </div>
    </div>
  );
};
