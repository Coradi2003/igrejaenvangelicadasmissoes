import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

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
  loading: boolean;
  addVideo: (video: Omit<Video, "id" | "createdAt">) => Promise<void>;
  updateVideo: (id: string, video: Partial<Video>) => Promise<void>;
  removeVideo: (id: string) => Promise<void>;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const useVideos = () => {
  const ctx = useContext(VideoContext);
  if (!ctx) throw new Error("useVideos must be used within VideoProvider");
  return ctx;
};

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setVideos(
        data.map((v) => ({
          id: v.id,
          title: v.title,
          description: v.description ?? "",
          url: v.url,
          thumbnail: v.thumbnail ?? undefined,
          createdAt: v.created_at,
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const addVideo = async (video: Omit<Video, "id" | "createdAt">) => {
    const { error } = await supabase.from("videos").insert([
      {
        title: video.title,
        description: video.description,
        url: video.url,
        thumbnail: video.thumbnail ?? null,
      },
    ]);
    if (!error) await fetchVideos();
  };

  const updateVideo = async (id: string, data: Partial<Video>) => {
    const payload: Record<string, unknown> = {};
    if (data.title !== undefined) payload.title = data.title;
    if (data.description !== undefined) payload.description = data.description;
    if (data.url !== undefined) payload.url = data.url;
    if (data.thumbnail !== undefined) payload.thumbnail = data.thumbnail;

    const { error } = await supabase.from("videos").update(payload).eq("id", id);
    if (!error) await fetchVideos();
  };

  const removeVideo = async (id: string) => {
    const { error } = await supabase.from("videos").delete().eq("id", id);
    if (!error) await fetchVideos();
  };

  return (
    <VideoContext.Provider value={{ videos, loading, addVideo, updateVideo, removeVideo }}>
      {children}
    </VideoContext.Provider>
  );
};
