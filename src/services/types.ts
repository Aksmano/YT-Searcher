import { Dictionary } from "@reduxjs/toolkit";

export type videoListResponse = {
  kind: "youtube#videoListResponse";
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: pageInfo;
  items: video[];
};

export type video = {
  kind: "youtube#video";
  etag: string;
  id: string;
  snippet: snippet;
  contentDetails: contentDetails;
  status: status;
  statistics: statistics;
  player: player;
  topicDetails: topicDetails;
  recordingDetails: recordingDetails;
  liveStreamingDetails: liveStreamingDetails;
  localizations: Dictionary<localization>;
  fileDetails: fileDetails;
  processingDetails: processingDetails;
  suggestions: suggestions;
};

export type searchListResponse = {
  kind: "youtube#searchListResponse";
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: pageInfo;
  items: searchResult[];
};

export type searchResult = {
  kind: "youtube#searchResult";
  etag: string;
  id: idSearchResult;
  snippet: snippet;
};

type idSearchResult = {
  kind: string;
  videoId: string;
  channelId: string;
  playlistId: string;
};

type pageInfo = {
  totalResults: number;
  resultsPerPage: number;
};

type snippet = {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Dictionary<thumbnail>;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  defaultLanguage: string;
  localized: localization;
  defaultAudioLanguage: string;
};

type thumbnail = {
  url: string;
  width: number;
  height: number;
};

type localization = {
  title: string;
  description: string;
};

type status = {
  uploadStatus: string;
  failureReason: string;
  rejectionReason: string;
  privacyStatus: string;
  publishAt: Date;
  license: string;
  embeddable: boolean;
  publicStatsViewable: boolean;
  madeForKids: boolean;
  selfDeclaredMadeForKids: boolean;
};

type contentDetails = {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  regionRestriction: regionRestriction;
  contentRating: contentRating;
  projection: string;
  hasCustomThumbnail: boolean;
};

type regionRestriction = {
  allowed: string[];
  blocked: string[];
};

type statistics = {
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  favoriteCount: number;
  commentCount: number;
};

type player = {
  embedHtml: string;
  embedHeight: number;
  embedWidth: number;
};

type topicDetails = {
  topicIds: string[];
  relevantTopicIds: string[];
  topicCategories: string[];
};

type recordingDetails = {
  recordingDate: Date;
};

type liveStreamingDetails = {
  actualStartTime: Date;
  actualEndTime: Date;
  scheduledStartTime: Date;
  scheduledEndTime: Date;
  concurrentViewers: number;
  activeLiveChatId: string;
};

type fileDetails = {
  fileName: string;
  fileSize: number;
  fileType: string;
  container: string;
  videoStreams: videoStream[];
  audioStreams: audioStream[];
  durationMs: number;
  bitrateBps: number;
  creationTime: string;
};

type videoStream = {
  widthPixels: number;
  heightPixels: number;
  frameRateFps: number;
  aspectRatio: number;
  codec: string;
  bitrateBps: number;
  rotation: string;
  vendor: string;
};

type audioStream = {
  channelCount: number;
  codec: string;
  bitrateBps: number;
  vendor: string;
};

type processingDetails = {
  processingStatus: string;
  processingProgress: processingProgress;
  processingFailureReason: string;
  fileDetailsAvailability: string;
  processingIssuesAvailability: string;
  tagSuggestionsAvailability: string;
  editorSuggestionsAvailability: string;
  thumbnailsAvailability: string;
};

type processingProgress = {
  partsTotal: number;
  partsProcessed: number;
  timeLeftMs: number;
};

type suggestions = {
  processingErrors: string[];
  processingWarnings: string[];
  processingHints: string[];
  tagSuggestions: tagSuggestion[];
  editorSuggestions: string[];
};

type tagSuggestion = {
  tag: string;
  categoryRestricts: string[];
};

type contentRating = {
  acbRating: string;
  agcomRating: string;
  anatelRating: string;
  bbfcRating: string;
  bfvcRating: string;
  bmukkRating: string;
  catvRating: string;
  catvfrRating: string;
  cbfcRating: string;
  cccRating: string;
  cceRating: string;
  chfilmRating: string;
  chvrsRating: string;
  cicfRating: string;
  cnaRating: string;
  cncRating: string;
  csaRating: string;
  cscfRating: string;
  czfilmRating: string;
  djctqRating: string;
  djctqRatingReasons: string[];
  ecbmctRating: string;
  eefilmRating: string;
  egfilmRating: string;
  eirinRating: string;
  fcbmRating: string;
  fcoRating: string;
  fmocRating: string;
  fpbRating: string;
  fpbRatingReasons: string[];
  fskRating: string;
  grfilmRating: string;
  icaaRating: string;
  ifcoRating: string;
  ilfilmRating: string;
  incaaRating: string;
  kfcbRating: string;
  kijkwijzerRating: string;
  kmrbRating: string;
  lsfRating: string;
  mccaaRating: string;
  mccypRating: string;
  mcstRating: string;
  mdaRating: string;
  medietilsynetRating: string;
  mekuRating: string;
  mibacRating: string;
  mocRating: string;
  moctwRating: string;
  mpaaRating: string;
  mpaatRating: string;
  mtrcbRating: string;
  nbcRating: string;
  nbcplRating: string;
  nfrcRating: string;
  nfvcbRating: string;
  nkclvRating: string;
  oflcRating: string;
  pefilmRating: string;
  rcnofRating: string;
  resorteviolenciaRating: string;
  rtcRating: string;
  rteRating: string;
  russiaRating: string;
  skfilmRating: string;
  smaisRating: string;
  smsaRating: string;
  tvpgRating: string;
  ytRating: string;
};
