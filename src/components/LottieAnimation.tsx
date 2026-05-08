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
      fetch(animationUrl)
        .then(res => res.json())
        .then(json => setData(json))
        .catch(err => console.error("Error loading lottie:", err));
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
