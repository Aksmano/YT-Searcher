import { decode } from "html-entities";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import queryBuilder from "../../services/queryParamsBuilders/queryBuilder";
import { videoListResponse, videoQueryState } from "../../services/types";
import { useGetListVideosResultQuery } from "../../services/youtube";
import Loader from "../Loader/Loader";
import styles from "./VideoDetails.module.css";

export const VideoDetails = () => {
  const params = useParams<{ id: string }>();

  const videoDetails: videoQueryState = {
    part: ["snippet", "contentDetails", "statistics", "player"],
    chart: "",
    id: [params.id!],
    maxResults: "1",
  };

  const videoInfo = useGetListVideosResultQuery(queryBuilder(videoDetails));

  const isVideoInfoLoaded = (): boolean => {
    return (
      videoInfo.data !== undefined &&
      videoInfo.isLoading === false &&
      videoInfo.isFetching === false
    );
  };

  const formatViews = (views: string): string => {
    let newViewsString = "";
    let start = views.length % 3;
    let index = 0;
    while (true) {
      if (index === start) {
        newViewsString += " ";
        break;
      } else {
        newViewsString += views[index];
        index++;
      }
    }

    for (let i = index; i < views.length; i += 3) {
      newViewsString += views.substring(i, i + 3) + " ";
      console.log(newViewsString);
    }

    return newViewsString;
  };

  const formatDate = (publishedAt: string): string => {
    const date = publishedAt.split("T", 2);
    return `${date[0]}, ${date[1].substring(0, 5)}`;
  };

  const formatStatistics = (): string => {
    return `${decode(
      formatViews(videoInfo.data!.items[0].statistics.viewCount.toString())
    )} views ${decode("&sdot;")} ${formatViews(
      videoInfo.data!.items[0].statistics.likeCount.toString()
    )} likes ${decode("&sdot;")} Published at: ${formatDate(
      videoInfo.data!.items[0].snippet.publishedAt
    )}`;
  };

  const formatTags = (): string => {
    return `Tags: ${
      videoInfo.data!.items[0].snippet.tags !== undefined
        ? videoInfo.data!.items[0].snippet.tags.join(", ")
        : "no tags"
    }`;
  };

  const formatTitle = (): string => {
    return decode(videoInfo.data?.items[0].snippet.title);
  };

  const formatDescription = (): string => {
    return decode(videoInfo.data?.items[0].snippet.description);
  };

  const formatChannel = (): string => {
    return `${videoInfo.data!.items[0].snippet.channelTitle}\n`;
  };

  const ytEmbedSource = (): string => {
    return `https://www.youtube.com/embed/${params.id!}`;
  };

  const ytChannelHref = (): string => {
    return `https://www.youtube.com/channel/${
      videoInfo.data!.items[0].snippet.channelId
    }`;
  };

  console.log(videoInfo.data?.items[0].snippet.description);

  return isVideoInfoLoaded() ? (
    <div className={styles.descriptionContainer}>
      <div className={styles.row}>
        <div className={styles.title}>{formatTitle()}</div>
        <div className={styles.videoDetails}>
          <div className={styles.iframeContainer}>
            <iframe
              allowFullScreen={true}
              title={params.id!}
              className={styles.responsiveIframe}
              src={ytEmbedSource()}
            />
            )
          </div>
        </div>
        <div className={`${styles.channel}`}>
          {`Channel: `}
          <b>
            <a href={ytChannelHref()}>{formatChannel()}</a>
          </b>
        </div>
      </div>

      <div className={`${styles.statistics} ${styles.row}`}>
        {formatStatistics()}
      </div>
      <div className={`${styles.tags} ${styles.row}`}>{formatTags()}</div>
      <div className={styles.row}>
        Desription:
        <div className={styles.longDesc}>
          <pre>{formatDescription()}</pre>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
