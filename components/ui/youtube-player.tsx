"use dom";

export interface YoutubePlayerProps {
  source?: string;
  dom?: import("react-native-webview").WebViewProps;
}

export default function YoutubePlayer({ source, dom }: YoutubePlayerProps) {
  return (
    <iframe
      src={source}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="aspect-video w-full rounded-md"
    />
  );
}
