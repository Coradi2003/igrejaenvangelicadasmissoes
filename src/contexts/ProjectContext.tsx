import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface Project {
  id: string;
  title: string;
  description: string;
  impact: string;
}

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  addProject: (project: Omit<Project, "id">) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectProvider");
  return ctx;
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) {
      setProjects(
        data.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          impact: p.impact ?? "",
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async (project: Omit<Project, "id">) => {
    const { error } = await supabase.from("projects").insert([
      {
        title: project.title,
        description: project.description,
        impact: project.impact ?? null,
      },
    ]);
    if (!error) await fetchProjects();
  };

  const removeProject = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) await fetchProjects();
  };

  return (
    <ProjectContext.Provider value={{ projects, loading, addProject, removeProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
