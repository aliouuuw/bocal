export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient - changes with theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0f1419_0%,#000000_100%)] dark:bg-[radial-gradient(ellipse_at_top,#0f1419_0%,#000000_100%)] light:bg-[radial-gradient(ellipse_at_top,#f0f9ff_0%,#ffffff_100%)]"></div>
      
      {/* Animated mesh gradient */}
      <div className="absolute inset-0 opacity-30 dark:opacity-30 light:opacity-20">
        <div className="gradient-mesh gradient-mesh-1"></div>
        <div className="gradient-mesh gradient-mesh-2"></div>
      </div>
      
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.015] light:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      ></div>
      
      {/* Top vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] light:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.6)_100%)]"></div>
      
      <style jsx>{`
        .gradient-mesh {
          position: absolute;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          filter: blur(140px);
          animation: float-slow 30s ease-in-out infinite;
        }
        
        .gradient-mesh-1 {
          background: radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%);
          top: -300px;
          left: -200px;
        }
        
        .gradient-mesh-2 {
          background: radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%);
          bottom: -300px;
          right: -200px;
          animation-delay: -15s;
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
