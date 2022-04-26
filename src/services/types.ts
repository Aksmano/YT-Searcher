import { Dictionary } from "@reduxjs/toolkit";

export interface videoQueryState {
  // required
  part: string[];

  // filters (must be at least one active)
  chart: string; // acceptable states: mostPopular
  id: string[];
  myRating?: string; // OAuth only

  // optional
  h1?: string;
  maxHeight?: string;
  maxWidth?: string;
  onBehalfOfContentOwner?: string; // OAuth
  maxResults?: string; // 0-50 range
  pageToken?: string;
  regionCode?: string;
  videoCategoryId?: string;
}
export interface searchQueryState {
  // required, immutable
  part: string[];

  // filters (0 or 1 filters)
  forContentOwner?: boolean; // OAuth
  forDeveloper?: boolean; // OAuth
  forMine?: boolean; // OAuth
  relatedToVideoId?: string;

  // optional parameters
  channelId?: string;
  channelType?: string;
  eventType?: string;
  location?: string[2]; // latitude, longitude
  locationRadius?: string; // acceptable units - m, km, ft, mi, e.g. 10km
  maxResults?: string; // 0-50 range
  onBehalfOfContentOwner?: string; // OAuth
  order?: string;
  pageToken?: string;
  publishedAfter?: string; // RFC 3339 date-time format(YYYY-MM-DDTHH:MM:SSZ)
  publishedBefore?: string;
  q?: string; // can specify NOT (-, %20 in query) and OR (|, %7C in query) to search more precisely (TODO)
  regionCode?: string;
  relevanceLanguage?: string;
  safeSearch?: string; // acceptable values - moderate, strict, none
  topicId?: string;
  type?: string[]; // acceptable values - channel, playlist, video
  videoCaption?: string; // acceptable values - any, none, closedCaption
  videoCategoryId?: string;
  videoDefinition?: string;
  videoDimension?: string; // acceptable values - 2d, 3d, any
  videoDuration?: string; // acceptable values - short (<4min), medium (>4min and <20min), long(>20min), any
  videoEmbeddable?: string; // acceptable values - true, any
  videoLicense?: string; // acceptable values - youtube, creativeCommon, any
  videoSyndicated?: string; // can be viewed only outside yt, acceptable values - true, any
  videoType?: string; // acceptable values - episode, movie, any
}
export interface ListComponent {
  fetchedInfo: extendedSnippet[];
  currentPage: number;
  prevKind: string;
  toggler: boolean;
}
export interface extendedSnippet {
  snippet: snippet;
  id: string;
}

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

export type snippet = {
  publishedAt: string;
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
  publishedAt: string;
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
