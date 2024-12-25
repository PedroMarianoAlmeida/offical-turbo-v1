interface IframeProps {
  title?: string;
  embedUrl: string;
}

export const Iframe = ({
  embedUrl,
  title = "YouTube video player",
}: IframeProps) => (
  <iframe
    src={`https://www.youtube.com/embed/${embedUrl}`}
    title={title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
    className="border-4 border-ring aspect-[16/9] w-full max-w-5xl"
  />
);
