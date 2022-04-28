# YT Searcher

Simple web application written in TypeScript using React + Redux, which lets for searching and watching YouTube videos using Google YouTube Api

This application uses _[Google YouTube Api](https://developers.google.com/youtube/v3)_ for fetching data from YouTube.

## Launching client

> **Important:** After cloning this repo you have to create .env where you will store your Google API Key. The file should be add in the main app folder. After that add a following line:
> `REACT_APP_API_KEY=[YOUR_API_KEY]`

- **npm start** - Runs the app in the development mode.<br>Open on [http://localhost:3000]
- **npm build** - Builds the app for production to the `build` folder.<br />It correctly bundles React in production mode and optimizes the build for the best performance.

## App UI

### Main screen (most trending)

![most popular](https://github.com/Aksmano/YT-Searcher/blob/main/src/img/most_popular.png)

It shows the most trending videos from YouTube. You can switch themes (right top cornern) and search videos by phrase (more advanced filters in future). After clicking the thumbnail you are redirected to the detailed video page.

### Video details

![video details](https://github.com/Aksmano/YT-Searcher/blob/main/src/img/video_details.png)

On this page we can watch video and see basic info about it (title, channel, views, etc.). We can also go back to the most trending videos (by clicking top left image) or search new videos.
