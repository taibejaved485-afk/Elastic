import React, { Suspense, lazy } from "react";

const Lottie = lazy(() => import("lottie-react"));

interface LottieAnimationProps {
  animationData?: any;
  animationUrl?: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  onHover?: boolean;
}

export default function LottieAnimation({ 
  animationData, 
  animationUrl, 
  loop = true, 
  autoplay = true, 
  className = "w-full h-full",
  onHover = false
}: LottieAnimationProps) {
  const lottieRef = React.useRef<any>(null);
  const [data, setData] = React.useState<any>(animationData);

  React.useEffect(() => {
    if (animationUrl && !animationData) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      fetch(animationUrl, { signal: controller.signal })
        .then(res => {
          if (!res.ok) {
            if (res.status === 403) throw new Error("403 Forbidden: CORS or Permission issue");
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Oops, we haven't got JSON!");
          }
          return res.json();
        })
        .then(json => {
          setData(json);
          clearTimeout(timeoutId);
        })
        .catch(err => {
          console.warn(`Lottie failed to load [${animationUrl}]:`, err.message);
          setData(null);
          clearTimeout(timeoutId);
        });

      return () => {
        controller.abort();
        clearTimeout(timeoutId);
      };
    }
  }, [animationUrl, animationData]);

  if (!data) return <div className={className} />;

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => onHover && lottieRef.current?.play()}
      onMouseLeave={() => onHover && lottieRef.current?.stop()}
    >
      <Suspense fallback={<div className={className} />}>
        <Lottie
          lottieRef={lottieRef}
          animationData={data}
          loop={loop}
          autoplay={onHover ? false : autoplay}
          style={{ width: "100%", height: "100%" }}
        />
      </Suspense>
    </div>
  );
}
