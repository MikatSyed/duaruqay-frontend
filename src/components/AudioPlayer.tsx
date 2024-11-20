import React, { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
  audioSrc: string | null;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const extractAudioId = (src: string | null): string | null => {
    if (src) {
      const segments = src.split("/");
      const idSegment = segments[segments.length - 1];
      const id = idSegment.split(".")[0];
      return id;
    }
    return null;
  };

  let audioId: any = extractAudioId(audioSrc);
  let parsedAudioId = parseInt(audioId);

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.load();
      setIsPlaying(false);
    }
  }, [audioSrc]);

  useEffect(() => {
    if (audioRef.current) {
      const audioElement = audioRef.current;

      const updateTime = () => {
        if (audioElement && audioElement.duration) {
          setCurrentTime(audioElement.currentTime);
          setDuration(audioElement.duration);
        }
      };

      audioElement.addEventListener("timeupdate", updateTime);

      audioElement.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(audioElement.duration);
      });

      return () => {
        audioElement.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [audioRef.current]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => console.error("Audio playback error:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const isValidAudio = audioSrc && audioSrc.startsWith("http");

  return (
    <div className="flex items-center space-x-4">
      {isValidAudio && audioId ? (
        <>
          <button
            onClick={handlePlayPause}
            className="text-white rounded-md"
            title={isPlaying ? "Pause" : "Play"}
          >
            <img
              src={isPlaying ? "/assets/icon/pause.svg" : "/assets/icon/audiobtn.svg"}
              alt={isPlaying ? "Pause" : "Play"}
              className="h-11 w-11"
            />
          </button>

          <audio
            ref={audioRef}
            src={`https://api.duaruqyah.com/duaaudiofinal/${parsedAudioId}.mp3`}
            onEnded={() => {
              setIsPlaying(false);
              setCurrentTime(duration);
            }}
            onError={(e) => {
              console.error("Audio load error:", e.currentTarget.error);
            }}
          >
            Your browser does not support the audio element.
          </audio>

          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              className="w-full"
              onChange={handleSeekChange}
            />
            {isPlaying && (
              <span className="text-gray-600 text-[14px]">
                00:{Math.floor(duration - currentTime).toString().padStart(2, "0")}
              </span>
            )}
          </div>
        </>
      ) : (
        <p className="text-red-500">Invalid audio source</p>
      )}
    </div>
  );
};

export default AudioPlayer;
