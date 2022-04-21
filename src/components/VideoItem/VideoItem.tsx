import { video } from "../../services/types";
import styles from "./VideoItem.module.css";

interface VideoItemProps {
  video: video;
}

export const VideoItem = ({ video }: VideoItemProps) => {
  return (
    <div>
      <img
        src={video.snippet.thumbnails["medium"]!.url}
        className={styles.thumbnail}
        alt=""
      />
    </div>
  );
};
