import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Linkedin, Download, Medal, Rocket, Diamond, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import base44Logo from "@/assets/base44-logo.svg";
interface CertificateGeneratorProps {
  studentName: string;
  certificationName: string;
  certificateNumber: string;
  completedAt: string;
}

// Certificate level configuration with premium colors
const getCertificateLevel = (certName: string) => {
  const name = certName.toLowerCase();
  if (name.includes("launcher")) {
    return {
      level: 3,
      levelName: "AI LAUNCHER",
      displayName: "AI Launcher Certificate",
      color: "from-emerald-400 via-teal-300 to-emerald-500",
      borderColor: "border-emerald-400/50",
      bgGradient: "from-emerald-950/50 via-background to-emerald-950/30",
      accentColor: "text-emerald-400",
      badgeBg: "bg-emerald-500/20",
      icon: Diamond,
      primaryHex: "#10b981",
      secondaryHex: "#2dd4bf",
      skills: ["Live Pitch Delivery", "Investor Communication", "Demo Day Presentation", "Startup Launch"],
      subtitle: "Ready to Launch"
    };
  } else if (name.includes("builder")) {
    return {
      level: 2,
      levelName: "AI BUILDER",
      displayName: "AI Builder Certificate",
      color: "from-amber-400 via-yellow-300 to-amber-500",
      borderColor: "border-amber-400/50",
      bgGradient: "from-amber-950/50 via-background to-amber-950/30",
      accentColor: "text-amber-400",
      badgeBg: "bg-amber-500/20",
      icon: Rocket,
      primaryHex: "#f59e0b",
      secondaryHex: "#fcd34d",
      skills: ["AI Product Development", "MVP Creation", "User Testing", "Market Validation"],
      subtitle: "Full Curriculum Complete"
    };
  } else {
    return {
      level: 1,
      levelName: "AI FOUNDATIONS",
      displayName: "AI Foundations Certificate",
      color: "from-blue-400 via-cyan-300 to-blue-500",
      borderColor: "border-blue-400/50",
      bgGradient: "from-blue-950/50 via-background to-blue-950/30",
      accentColor: "text-blue-400",
      badgeBg: "bg-blue-500/20",
      icon: Medal,
      primaryHex: "#3b82f6",
      secondaryHex: "#22d3ee",
      skills: ["AI Prompt Engineering", "BASE Framework", "Problem Framing", "App Building with Base44"],
      subtitle: "Base44-Certified Credential",
      hasBase44Partnership: true
    };
  }
};

export function CertificateGenerator({
  studentName,
  certificationName,
  certificateNumber,
  completedAt,
}: CertificateGeneratorProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const formattedDate = new Date(completedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const levelConfig = getCertificateLevel(certificationName);
  const LevelIcon = levelConfig.icon;

  const verifyUrl = `https://nextbillionlab.com/verify/${certificateNumber}`;

  const handleLinkedInShare = () => {
    const base44Text = levelConfig.level === 1 ? " × Base44 Verified" : "";
    const text = `🚀 I'm now NEXT_ CERTIFIED${base44Text} — Level ${levelConfig.level}: ${levelConfig.levelName}\n\nNobody knows what's coming next.\nSearch was reimagined. Conversation was reimagined. Building was reimagined.\nThe next breakthrough will surprise us too.\n\nBut I'm ready to BUILD it.\n\nCredential: ${certificateNumber}\nVerify: ${verifyUrl}\n\n#NEXTCertified #Base44Verified #BuildingWhatsNext #Level${levelConfig.level}`;
    
    const url = encodeURIComponent(verifyUrl);
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${encodeURIComponent(text)}`;
    window.open(linkedInUrl, "_blank");
    toast.success("Opening LinkedIn to share your certificate!");
  };


  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);
    
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        toast.error("Please allow popups to download your certificate");
        setIsDownloading(false);
        return;
      }

      const primaryColor = levelConfig.primaryHex;
      const secondaryColor = levelConfig.secondaryHex;
      
      // Generate QR code as data URL
      const qrCanvas = document.createElement('canvas');
      const qrSize = 80;
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>NEXT_ Certificate - ${studentName}</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
              
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              @page {
                size: A4 landscape;
                margin: 0;
              }
              
              body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                background: #0a0f1c;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              
              .certificate {
                background: linear-gradient(180deg, #0d1117 0%, #161b22 50%, #0d1117 100%);
                width: 100%;
                max-width: 900px;
                aspect-ratio: 1.414;
                position: relative;
                overflow: hidden;
                border-radius: 16px;
              }
              
              /* Ornate double border */
              .certificate::before {
                content: '';
                position: absolute;
                inset: 8px;
                border: 2px solid ${primaryColor}40;
                border-radius: 12px;
                pointer-events: none;
              }
              
              .certificate::after {
                content: '';
                position: absolute;
                inset: 16px;
                border: 1px solid ${primaryColor}25;
                border-radius: 8px;
                pointer-events: none;
              }
              
              /* Corner ornaments */
              .corner {
                position: absolute;
                width: 60px;
                height: 60px;
                border: 2px solid ${primaryColor}60;
              }
              .corner-tl { top: 24px; left: 24px; border-right: none; border-bottom: none; border-top-left-radius: 12px; }
              .corner-tr { top: 24px; right: 24px; border-left: none; border-bottom: none; border-top-right-radius: 12px; }
              .corner-bl { bottom: 24px; left: 24px; border-right: none; border-top: none; border-bottom-left-radius: 12px; }
              .corner-br { bottom: 24px; right: 24px; border-left: none; border-top: none; border-bottom-right-radius: 12px; }
              
              /* Watermark */
              .watermark {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 180px;
                font-weight: 900;
                color: rgba(255,255,255,0.015);
                white-space: nowrap;
                pointer-events: none;
                letter-spacing: -0.02em;
              }
              
              .content {
                position: relative;
                z-index: 1;
                padding: 48px 64px;
                height: 100%;
                display: flex;
                flex-direction: column;
              }
              
              .header {
                text-align: center;
                margin-bottom: 24px;
              }
              
              .logo {
                font-size: 28px;
                font-weight: 900;
                letter-spacing: 0.05em;
                color: white;
                margin-bottom: 4px;
              }
              
              .logo-sub {
                font-size: 9px;
                letter-spacing: 0.3em;
                color: rgba(255,255,255,0.4);
                text-transform: uppercase;
                font-weight: 500;
              }
              
              .level-badge {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                background: ${primaryColor}15;
                border: 1px solid ${primaryColor}50;
                border-radius: 100px;
                padding: 6px 20px;
                margin-top: 16px;
              }
              
              .level-badge span {
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 0.15em;
                color: ${primaryColor};
              }
              
              .main {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
              }
              
              .icon-circle {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                box-shadow: 0 0 40px ${primaryColor}40;
              }
              
              .icon-circle svg {
                width: 40px;
                height: 40px;
                color: white;
              }
              
              .cert-type {
                font-size: 11px;
                letter-spacing: 0.25em;
                color: ${primaryColor};
                font-weight: 700;
                text-transform: uppercase;
                margin-bottom: 8px;
              }
              
              .cert-title {
                font-size: 36px;
                font-weight: 800;
                background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 4px;
                letter-spacing: -0.02em;
              }
              
              .cert-subtitle {
                font-size: 13px;
                color: rgba(255,255,255,0.4);
                margin-bottom: 20px;
              }
              
              .divider {
                width: 120px;
                height: 2px;
                background: linear-gradient(90deg, transparent, ${primaryColor}, transparent);
                margin: 0 auto 20px;
              }
              
              .awarded-to {
                font-size: 11px;
                letter-spacing: 0.15em;
                color: rgba(255,255,255,0.4);
                text-transform: uppercase;
                margin-bottom: 8px;
              }
              
              .student-name {
                font-size: 32px;
                font-weight: 700;
                color: white;
                margin-bottom: 16px;
                letter-spacing: -0.01em;
              }
              
              .description {
                font-size: 13px;
                line-height: 1.7;
                color: rgba(255,255,255,0.6);
                max-width: 480px;
                margin: 0 auto 24px;
              }
              
              .skills-box {
                background: rgba(255,255,255,0.03);
                border: 1px solid rgba(255,255,255,0.08);
                border-radius: 10px;
                padding: 16px 24px;
                display: inline-block;
              }
              
              .skills-title {
                font-size: 9px;
                letter-spacing: 0.2em;
                color: rgba(255,255,255,0.4);
                text-transform: uppercase;
                margin-bottom: 10px;
              }
              
              .skills-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 6px 24px;
                text-align: left;
              }
              
              .skill-item {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 12px;
                color: rgba(255,255,255,0.7);
              }
              
              .skill-check {
                color: ${primaryColor};
                font-size: 12px;
              }
              
              .footer {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                padding-top: 16px;
                border-top: 1px solid rgba(255,255,255,0.06);
                margin-top: auto;
              }
              
              .footer-left {
                text-align: left;
              }
              
              .signature-line {
                width: 140px;
                height: 1px;
                background: rgba(255,255,255,0.2);
                margin-bottom: 6px;
              }
              
              .signature-text {
                font-size: 10px;
                color: rgba(255,255,255,0.4);
              }
              
              .footer-center {
                text-align: center;
              }
              
              .issue-date {
                font-size: 11px;
                color: rgba(255,255,255,0.5);
                margin-bottom: 6px;
              }
              
              .cert-number {
                font-family: 'SF Mono', 'Monaco', monospace;
                font-size: 12px;
                font-weight: 600;
                color: ${primaryColor};
                background: ${primaryColor}15;
                padding: 4px 12px;
                border-radius: 4px;
                letter-spacing: 0.05em;
              }
              
              .footer-right {
                text-align: center;
              }
              
              .qr-code {
                width: 64px;
                height: 64px;
                background: white;
                border-radius: 6px;
                padding: 4px;
                margin-bottom: 4px;
              }
              
              .qr-label {
                font-size: 8px;
                color: rgba(255,255,255,0.4);
              }
              
              @media print {
                body {
                  background: white;
                  padding: 0;
                }
                .certificate {
                  border-radius: 0;
                  max-width: none;
                  width: 100%;
                  height: 100vh;
                }
              }
            </style>
          </head>
          <body>
            <div class="certificate">
              <div class="corner corner-tl"></div>
              <div class="corner corner-tr"></div>
              <div class="corner corner-bl"></div>
              <div class="corner corner-br"></div>
              <div class="watermark">NEXT_</div>
              
              <div class="content">
                <div class="header">
                  <div class="logo">NEXT_</div>
                  <div class="logo-sub">Billion Lab</div>
                  <div class="level-badge">
                    <span>LEVEL ${levelConfig.level} OF 3</span>
                  </div>
                </div>
                
                <div class="main">
                  <div class="icon-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      ${levelConfig.level === 3 
                        ? '<path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>'
                        : levelConfig.level === 2
                          ? '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>'
                          : '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>'
                      }
                    </svg>
                  </div>
                  
                  <div class="cert-type">NEXT_ CERTIFIED</div>
                  <div class="cert-title">${levelConfig.levelName}</div>
                  <div class="cert-subtitle">${levelConfig.subtitle}</div>
                  
                  <div class="divider"></div>
                  
                  <div class="awarded-to">Awarded To</div>
                  <div class="student-name">${studentName}</div>
                  
                  <p class="description">
                    For demonstrating mastery in building with AI tools, creating solutions for real problems, 
                    and preparing to shape the future of technology.
                  </p>
                  
                  <div class="skills-box">
                    <div class="skills-title">Skills Mastered</div>
                    <div class="skills-grid">
                      ${levelConfig.skills.map(skill => `
                        <div class="skill-item">
                          <span class="skill-check">✓</span>
                          <span>${skill}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>
                
                <div class="footer">
                  <div class="footer-left">
                    <div class="signature-line"></div>
                    <div class="signature-text">NEXT_ Billion Lab</div>
                  </div>
                  
                  <div class="footer-center">
                    <div class="issue-date">Issued on ${formattedDate}</div>
                    <div class="cert-number">${certificateNumber}</div>
                  </div>
                  
                  <div class="footer-right">
                    <div class="qr-code">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${encodeURIComponent(verifyUrl)}" alt="QR Code" style="width: 100%; height: 100%;" />
                    </div>
                    <div class="qr-label">Scan to verify</div>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `);
      
      printWindow.document.close();
      
      setTimeout(() => {
        printWindow.print();
        setIsDownloading(false);
      }, 800);
      
      toast.success("Opening print dialog to save as PDF");
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Failed to generate PDF");
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Certificate Preview - Matches PDF exactly */}
      <Card 
        ref={certificateRef}
        className={`relative overflow-hidden border-2 ${levelConfig.borderColor} bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117]`}
      >
        {/* Ornate double border effect */}
        <div className="absolute inset-2 border border-current opacity-10 rounded-lg pointer-events-none" style={{ borderColor: levelConfig.primaryHex }} />
        <div className="absolute inset-4 border border-current opacity-5 rounded-md pointer-events-none" style={{ borderColor: levelConfig.primaryHex }} />
        
        {/* Corner ornaments */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 rounded-tl-lg pointer-events-none" style={{ borderColor: `${levelConfig.primaryHex}60` }} />
        <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 rounded-tr-lg pointer-events-none" style={{ borderColor: `${levelConfig.primaryHex}60` }} />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 rounded-bl-lg pointer-events-none" style={{ borderColor: `${levelConfig.primaryHex}60` }} />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 rounded-br-lg pointer-events-none" style={{ borderColor: `${levelConfig.primaryHex}60` }} />
        
        {/* NEXT_ Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[140px] md:text-[180px] font-black text-white/[0.015] tracking-tight">NEXT_</span>
        </div>
        
        <CardContent className="relative p-6 md:p-10 text-center">
          {/* Header */}
          <div className="mb-6">
            <p className="text-2xl md:text-3xl font-black tracking-wider text-white">NEXT_</p>
            <p className="text-[9px] tracking-[0.3em] text-white/40 uppercase font-medium">Billion Lab</p>
          </div>
          
          {/* Level Badge */}
          <div 
            className="inline-flex items-center gap-2 rounded-full px-5 py-1.5 mb-6"
            style={{ 
              backgroundColor: `${levelConfig.primaryHex}15`, 
              border: `1px solid ${levelConfig.primaryHex}50` 
            }}
          >
            <span 
              className="text-[11px] font-bold tracking-[0.15em]"
              style={{ color: levelConfig.primaryHex }}
            >
              LEVEL {levelConfig.level} OF 3
            </span>
          </div>
          
          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div 
              className={`h-20 w-20 rounded-full bg-gradient-to-br ${levelConfig.color} flex items-center justify-center`}
              style={{ boxShadow: `0 0 40px ${levelConfig.primaryHex}40` }}
            >
              <LevelIcon className="h-10 w-10 text-white" />
            </div>
          </div>

          <p 
            className="text-[11px] uppercase tracking-[0.25em] mb-2 font-bold"
            style={{ color: levelConfig.primaryHex }}
          >
            NEXT_ CERTIFIED
          </p>
          <h1 
            className={`text-3xl md:text-4xl font-extrabold mb-1 bg-gradient-to-r ${levelConfig.color} bg-clip-text text-transparent`}
            style={{ letterSpacing: '-0.02em' }}
          >
            {levelConfig.levelName}
          </h1>
          <p className="text-sm text-white/40 mb-5">{levelConfig.subtitle}</p>

          {/* Divider */}
          <div 
            className="w-32 h-0.5 mx-auto mb-5"
            style={{ background: `linear-gradient(90deg, transparent, ${levelConfig.primaryHex}, transparent)` }}
          />

          <p className="text-[11px] uppercase tracking-[0.15em] text-white/40 mb-2">Awarded To</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white" style={{ letterSpacing: '-0.01em' }}>
            {studentName}
          </h2>

          <p className="text-sm text-white/60 leading-relaxed max-w-md mx-auto mb-6">
            For demonstrating mastery in building with AI tools, creating solutions for real problems, 
            and preparing to shape the future of technology.
          </p>

          {/* Skills Mastered Section */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 mb-6 max-w-sm mx-auto">
            <p className="text-[9px] tracking-[0.2em] text-white/40 uppercase mb-3">Skills Mastered</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-left">
              {levelConfig.skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs">
                  <Check className="h-3 w-3 flex-shrink-0" style={{ color: levelConfig.primaryHex }} />
                  <span className="text-white/70">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Base44 Partnership - Level 1 only */}
          {(levelConfig as any).hasBase44Partnership && (
            <div className="flex items-center justify-center gap-3 mb-6">
              <p className="text-[9px] tracking-[0.15em] text-white/40 uppercase">In Partnership With</p>
              <img src={base44Logo} alt="Base44" className="h-6 opacity-70" />
            </div>
          )}

          {/* Footer with signature, date, and QR */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-white/[0.06]">
            {/* Signature */}
            <div className="text-center md:text-left">
              <div className="w-32 h-px bg-white/20 mb-1.5 mx-auto md:mx-0" />
              <p className="text-[10px] text-white/40">NEXT_ Billion Lab</p>
            </div>
            
            {/* Date & Certificate Number */}
            <div className="text-center">
              <p className="text-[11px] text-white/50 mb-1.5">Issued on {formattedDate}</p>
              <p 
                className="font-mono text-xs font-semibold px-3 py-1 rounded"
                style={{ 
                  color: levelConfig.primaryHex, 
                  backgroundColor: `${levelConfig.primaryHex}15`,
                  letterSpacing: '0.05em'
                }}
              >
                {certificateNumber}
              </p>
            </div>
            
            {/* QR Code */}
            <div className="text-center">
              <div className="bg-white rounded-lg p-1.5 mb-1 inline-block">
                <QRCodeSVG value={verifyUrl} size={56} level="M" />
              </div>
              <p className="text-[8px] text-white/40">Scan to verify</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Share Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button 
          onClick={handleLinkedInShare}
          className="bg-[#0077B5] hover:bg-[#006699] text-white"
        >
          <Linkedin className="h-4 w-4 mr-2" />
          Add to LinkedIn
        </Button>

        <Button variant="outline" onClick={handleDownloadPDF} disabled={isDownloading}>
          {isDownloading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          {isDownloading ? "Generating..." : "Download PDF"}
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Share your NEXT_ CERTIFIED Level {levelConfig.level} credential and inspire others to build the future!
      </p>
    </div>
  );
}
