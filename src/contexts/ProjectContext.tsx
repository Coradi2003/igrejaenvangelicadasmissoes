import React, { createContext, useContext, useState, useEffect } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  impact: string;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, "id">) => void;
  removeProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectProvider");
  return ctx;
};

const STORAGE_KEY = "church_projects";

const defaultProjects: Project[] = [
  { id: "1", title: "Cesta Solidária", description: "Distribuição mensal de cestas básicas para famílias em vulnerabilidade social na região de Maringá e comunidades vizinhas.", impact: "+500 famílias atendidas" },
  { id: "2", title: "Escola Bíblica Comunitária", description: "Aulas gratuitas de alfabetização e estudo bíblico para adultos e crianças das comunidades locais.", impact: "+200 alunos" },
  { id: "3", title: "Missões Nacionais", description: "Envio de missionários para regiões carentes do Brasil, levando esperança e assistência.", impact: "12 estados alcançados" },
  { id: "4", title: "Acolhimento Social", description: "Programas de acolhimento e reintegração para pessoas em situação de rua e dependência.", impact: "+100 vidas transformadas" },
  { id: "5", title: "Encontro de Jovens", description: "Programa semanal para jovens com atividades culturais, esportivas e espirituais.", impact: "+80 jovens participantes" },
  { id: "6", title: "Missões Internacionais", description: "Projetos missionários em países da América Latina e África, expandindo a obra de Deus.", impact: "3 países" },
];

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultProjects;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const addProject = (project: Omit<Project, "id">) => {
    setProjects((prev) => [...prev, { ...project, id: crypto.randomUUID() }]);
  };

  const removeProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, removeProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
