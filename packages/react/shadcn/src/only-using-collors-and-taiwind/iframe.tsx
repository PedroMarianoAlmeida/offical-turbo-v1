interface IframeProps {
  title?: string;
  embedUrl: string;
}

export const Iframe = ({
  embedUrl,
  title = "YouTube video player",
}: IframeProps) => (
  <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${embedUrl}`}
    title={title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
    className="border-4 border-ring"
  />
);
