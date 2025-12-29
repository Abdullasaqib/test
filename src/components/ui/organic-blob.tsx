interface OrganicBlobProps {
  color: string;
  size?: number;
  className?: string;
  animationDelay?: number;
}

export const OrganicBlob = ({ 
  color, 
  size = 400, 
  className = "", 
  animationDelay = 0 
}: OrganicBlobProps) => {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-15 animate-morph ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        animationDelay: `${animationDelay}s`,
      }}
    />
  );
};
