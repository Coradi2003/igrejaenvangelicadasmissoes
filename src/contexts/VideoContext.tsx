import React, { createContext, useContext, useState, useEffect } from "react";

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  createdAt: string;
}

interface VideoContextType {
  videos: Video[];
  addVideo: (video: Omit<Video, "id" | "createdAt">) => void;
  updateVideo: (id: string, video: Partial<Video>) => void;
  removeVideo: (id: string) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const useVideos = () => {
  const ctx = useContext(VideoContext);
  if (!ctx) throw new Error("useVideos must be used within VideoProvider");
  return ctx;
};

const STORAGE_KEY = "church_videos";

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [
      {
        id: "1",
        title: "Culto de Domingo - A Fé que Move Montanhas",
        description: "Mensagem poderosa sobre fé e perseverança",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Estudo Bíblico - O Poder da Oração",
        description: "Aprenda sobre a importância da oração diária",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        createdAt: new Date().toISOString(),
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
  }, [videos]);

  const addVideo = (video: Omit<Video, "id" | "createdAt">) => {
    setVideos((prev) => [
      { ...video, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
      ...prev,
    ]);
  };

  const updateVideo = (id: string, data: Partial<Video>) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, ...data } : v)));
  };

  const removeVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <VideoContext.Provider value={{ videos, addVideo, updateVideo, removeVideo }}>
      {children}
    </VideoContext.Provider>
  );
};
