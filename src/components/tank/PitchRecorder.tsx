import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Video, Mic, Square, RotateCcw, Send, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface PitchRecorderProps {
  onSubmit: (transcript: string) => void;
  isSubmitting: boolean;
  maxDuration?: number;
  onBack?: () => void;
}

export function PitchRecorder({ onSubmit, isSubmitting, maxDuration = 90, onBack }: PitchRecorderProps) {
  const [mode, setMode] = useState<"select" | "record" | "review" | "text">("select");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [textPitch, setTextPitch] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [mediaStream]);

  // Warn before leaving if recording in progress or has unsaved recording
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isRecording || recordedBlob || textPitch.length > 20) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isRecording, recordedBlob, textPitch]);

  // Attach media stream to video element when both are available
  // This runs after mode changes to "record" and the video element mounts
  useEffect(() => {
    if (videoRef.current && mediaStream && mediaStream.getVideoTracks().length > 0) {
      videoRef.current.srcObject = mediaStream;
      // Ensure video plays (some browsers require explicit play())
      videoRef.current.play().catch(err => {
        console.warn("Video autoplay failed:", err);
      });
    }
  }, [mediaStream, mode]);

  const startCamera = useCallback(async (audioOnly: boolean) => {
    try {
      setError(null);
      const constraints = audioOnly 
        ? { audio: true, video: false }
        : { audio: true, video: { facingMode: "user", width: 640, height: 480 } };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setMediaStream(stream);
      setMode("record");
    } catch (err) {
      console.error("Failed to access media devices:", err);
      setError("Could not access camera/microphone. Please check permissions.");
    }
  }, []);

  const startRecording = useCallback(() => {
    if (!mediaStream) return;
    
    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(mediaStream, {
      mimeType: MediaRecorder.isTypeSupported('video/webm') ? 'video/webm' : 'audio/webm'
    });
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mediaRecorder.mimeType });
      setRecordedBlob(blob);
      setMode("review");
    };
    
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start(1000);
    setIsRecording(true);
    setRecordingTime(0);
    
    timerRef.current = window.setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= maxDuration - 1) {
          stopRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  }, [mediaStream, maxDuration]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    }
  }, [isRecording, mediaStream]);

  const resetRecording = useCallback(() => {
    setRecordedBlob(null);
    setRecordingTime(0);
    setMode("select");
    setMediaStream(null);
    setTextPitch("");
  }, []);

  const handleTextSubmit = () => {
    if (textPitch.trim().length >= 50) {
      onSubmit(textPitch);
    }
  };

  const handleVideoSubmit = () => {
    // For MVP, we'll simulate transcript - in production, use speech-to-text
    const simulatedTranscript = `[Video pitch recorded - ${recordingTime} seconds]
    
The founder presented their pitch with enthusiasm. They covered their problem statement, solution, and target market. The presentation showed good structure and delivery.`;
    
    onSubmit(simulatedTranscript);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Mode: Select recording type
  if (mode === "select") {
    return (
      <Card className="border-2 border-dashed">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Deliver Your Pitch</h3>
            <p className="text-muted-foreground">Choose how you want to pitch</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-32 flex flex-col gap-2"
              onClick={() => startCamera(false)}
            >
              <Video className="h-8 w-8" />
              <span className="font-medium">Video Pitch</span>
              <span className="text-xs text-muted-foreground">Record with camera</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-32 flex flex-col gap-2"
              onClick={() => startCamera(true)}
            >
              <Mic className="h-8 w-8" />
              <span className="font-medium">Audio Only</span>
              <span className="text-xs text-muted-foreground">Record voice</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-32 flex flex-col gap-2"
              onClick={() => setMode("text")}
            >
              <span className="text-2xl">✍️</span>
              <span className="font-medium">Type It Out</span>
              <span className="text-xs text-muted-foreground">Write your pitch</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Mode: Text input
  if (mode === "text") {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Write Your Pitch</h3>
            <p className="text-sm text-muted-foreground">
              Pretend you're speaking to the investor. Be clear and compelling!
            </p>
          </div>
          
          <Textarea
            value={textPitch}
            onChange={(e) => setTextPitch(e.target.value)}
            placeholder="Hi, I'm [name] and I'm building [startup name]...

The problem I'm solving is...

My solution is...

This matters because...

I'm asking for your feedback to..."
            className="min-h-[200px] mb-4"
          />
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {textPitch.length} characters 
              {textPitch.length < 50 && " (minimum 50)"}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={resetRecording}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleTextSubmit}
                disabled={textPitch.length < 50 || isSubmitting}
              >
                {isSubmitting ? (
                  <>Analyzing...</>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Pitch
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Mode: Recording
  if (mode === "record") {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="relative mb-4">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={cn(
                "w-full aspect-video bg-black rounded-lg",
                !mediaStream?.getVideoTracks().length && "hidden"
              )}
            />
            {!mediaStream?.getVideoTracks().length && (
              <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Mic className={cn(
                  "h-16 w-16",
                  isRecording && "text-red-500 animate-pulse"
                )} />
              </div>
            )}
            
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                REC
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{formatTime(recordingTime)}</span>
              <span>{formatTime(maxDuration)}</span>
            </div>
            <Progress value={(recordingTime / maxDuration) * 100} />
          </div>
          
          <div className="flex justify-center gap-4">
            {!isRecording ? (
              <Button size="lg" onClick={startRecording} className="gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                Start Recording
              </Button>
            ) : (
              <Button size="lg" variant="destructive" onClick={stopRecording} className="gap-2">
                <Square className="h-4 w-4 fill-current" />
                Stop Recording
              </Button>
            )}
            
            <Button variant="outline" onClick={resetRecording}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Mode: Review
  if (mode === "review" && recordedBlob) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Review Your Pitch</h3>
            {recordedBlob.type.includes('video') ? (
              <video
                src={URL.createObjectURL(recordedBlob)}
                controls
                className="w-full aspect-video bg-black rounded-lg"
              />
            ) : (
              <audio
                src={URL.createObjectURL(recordedBlob)}
                controls
                className="w-full"
              />
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Duration: {formatTime(recordingTime)}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" onClick={resetRecording}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Re-record
              </Button>
              <Button onClick={handleVideoSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Analyzing...</>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Pitch
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
