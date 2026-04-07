import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Plus, Pencil, Trash2, Video, LogOut, X, Save, Calendar, Heart, Loader2 } from "lucide-react";
import { useVideos, Video as VideoType } from "@/contexts/VideoContext";
import { useSchedule, ScheduleEvent } from "@/contexts/ScheduleContext";
import { useProjects, Project } from "@/contexts/ProjectContext";
import { supabase } from "@/lib/supabase";

type Tab = "videos" | "cultos" | "projetos";

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "videos", label: "Vídeos", icon: <Video size={16} /> },
  { key: "cultos", label: "Cultos", icon: <Calendar size={16} /> },
  { key: "projetos", label: "Projetos", icon: <Heart size={16} /> },
];

const dayOptions = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("videos");

  const { videos, addVideo, updateVideo, removeVideo } = useVideos();
  const { events: scheduleEvents, addEvent, removeEvent } = useSchedule();
  const { projects, addProject, removeProject } = useProjects();

  // Video form
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoType | null>(null);
  const [videoForm, setVideoForm] = useState({ title: "", description: "", url: "" });
  const [videoSaving, setVideoSaving] = useState(false);

  // Schedule form
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({ day: "Domingo", time: "", title: "", location: "Sede Mundial" });
  const [scheduleSaving, setScheduleSaving] = useState(false);

  // Project form
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectForm, setProjectForm] = useState({ title: "", description: "", impact: "" });
  const [projectSaving, setProjectSaving] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setError("");
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    setLoginLoading(false);
    if (authError) {
      setError("Credenciais inválidas. Verifique seu e-mail e senha.");
    } else {
      setAuthenticated(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthenticated(false);
    setEmail("");
    setPass("");
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.title || !videoForm.url) return;
    setVideoSaving(true);
    if (editingVideo) {
      await updateVideo(editingVideo.id, videoForm);
    } else {
      await addVideo(videoForm);
    }
    setVideoSaving(false);
    setVideoForm({ title: "", description: "", url: "" });
    setShowVideoForm(false);
    setEditingVideo(null);
  };

  const handleSaveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleForm.title || !scheduleForm.time) return;
    setScheduleSaving(true);
    await addEvent(scheduleForm);
    setScheduleSaving(false);
    setScheduleForm({ day: "Domingo", time: "", title: "", location: "Sede Mundial" });
    setShowScheduleForm(false);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) return;
    setProjectSaving(true);
    await addProject(projectForm);
    setProjectSaving(false);
    setProjectForm({ title: "", description: "", impact: "" });
    setShowProjectForm(false);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-purple flex items-center justify-center">
              <LogIn size={24} className="text-primary-foreground" />
            </div>
            <h1 className="font-heading text-2xl font-bold">Painel Admin</h1>
            <p className="text-sm text-muted-foreground mt-1">Acesso restrito</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
              className="px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-foreground"
            />
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Senha"
              required
              className="px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-foreground"
            />
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loginLoading}
              className="bg-gradient-purple text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loginLoading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
              {loginLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-2xl font-bold text-gradient-gold">Painel Admin</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
            <LogOut size={18} /> Sair
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === t.key
                  ? "bg-gradient-purple text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* VÍDEOS */}
        {activeTab === "videos" && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => { setShowVideoForm(true); setEditingVideo(null); setVideoForm({ title: "", description: "", url: "" }); }} className="flex items-center gap-2 bg-gradient-purple text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90">
                <Plus size={18} /> Novo Vídeo
              </button>
            </div>
            {showVideoForm && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-semibold">{editingVideo ? "Editar Vídeo" : "Adicionar Vídeo"}</h2>
                  <button onClick={() => { setShowVideoForm(false); setEditingVideo(null); }} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
                </div>
                <form onSubmit={handleSaveVideo} className="flex flex-col gap-4">
                  <input type="text" value={videoForm.title} onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })} placeholder="Título do vídeo" required className="px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-foreground" />
                  <input type="url" value={videoForm.url} onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })} placeholder="Link do YouTube" required className="px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-foreground" />
                  <textarea value={videoForm.description} onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })} placeholder="Descrição" rows={3} className="px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-foreground resize-none" />
                  <button type="submit" disabled={videoSaving} className="flex items-center justify-center gap-2 bg-gradient-gold text-foreground py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-60">
                    {videoSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    {editingVideo ? "Salvar Alterações" : "Adicionar Vídeo"}
                  </button>
                </form>
              </motion.div>
            )}
            <div className="flex flex-col gap-4">
              {videos.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground"><Video size={48} className="mx-auto mb-4 opacity-50" /><p>Nenhum vídeo cadastrado.</p></div>
              ) : (
                videos.map((v) => (
                  <div key={v.id} className="glass rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{v.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{v.url}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => { setEditingVideo(v); setVideoForm({ title: v.title, description: v.description, url: v.url }); setShowVideoForm(true); }} className="p-2 rounded-lg bg-muted hover:bg-primary/20 text-foreground transition-colors"><Pencil size={16} /></button>
                      <button onClick={() => removeVideo(v.id)} className="p-2 rounded-lg bg-muted hover:bg-destructive/20 text-destructive transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* CULTOS / AGENDA */}
        {activeTab === "cultos" && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => { setShowScheduleForm(true); setScheduleForm({ day: "Domingo", time: "", title: "", location: "Sede Mundial" }); }} className="flex items-center gap-2 bg-gradient-purple text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90">
                <Plus size={18} /> Novo Culto
              </button>
            </div>
            {showScheduleForm && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-semibold">Adicionar Culto</h2>
                  <button onClick={() => setShowScheduleForm(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
                </div>
                <form onSubmit={handleSaveSchedule} className="flex flex-col gap-4">
                  <select value={scheduleForm.day} onChange={(e) => setScheduleForm({ ...scheduleForm, day: e.target.value })} className="px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-foreground">
                    {dayOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <input type="time" value={scheduleForm.time} onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })} required className="px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-foreground" />
                  <input type="text" value={scheduleForm.title} onChange={(e) => setScheduleForm({ ...scheduleForm, title: e.target.value })} placeholder="Nome do culto/evento" required className="px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-foreground" />
                  <input type="text" value={scheduleForm.location} onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })} placeholder="Local" className="px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-foreground" />
                  <button type="submit" disabled={scheduleSaving} className="flex items-center justify-center gap-2 bg-gradient-gold text-foreground py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-60">
                    {scheduleSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    Adicionar Culto
                  </button>
                </form>
              </motion.div>
            )}
            <div className="flex flex-col gap-3">
              {scheduleEvents.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground"><Calendar size={48} className="mx-auto mb-4 opacity-50" /><p>Nenhum culto cadastrado.</p></div>
              ) : (
                scheduleEvents.map((ev) => (
                  <div key={ev.id} className="glass rounded-xl p-5 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{ev.title}</h3>
                      <p className="text-sm text-muted-foreground">{ev.day} • {ev.time} • {ev.location}</p>
                    </div>
                    <button onClick={() => removeEvent(ev.id)} className="p-2 rounded-lg bg-muted hover:bg-destructive/20 text-destructive transition-colors shrink-0"><Trash2 size={16} /></button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* PROJETOS */}
        {activeTab === "projetos" && (
          <div>
            <div className="flex justify-end mb-4">
              <button onClick={() => { setShowProjectForm(true); setProjectForm({ title: "", description: "", impact: "" }); }} className="flex items-center gap-2 bg-gradient-purple text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90">
                <Plus size={18} /> Novo Projeto
              </button>
            </div>
            {showProjectForm && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading font-semibold">Adicionar Projeto</h2>
                  <button onClick={() => setShowProjectForm(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
                </div>
                <form onSubmit={handleSaveProject} className="flex flex-col gap-4">
                  <input type="text" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} placeholder="Nome do projeto" required className="px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-foreground" />
                  <textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} placeholder="Descrição do projeto" rows={3} required className="px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-foreground resize-none" />
                  <input type="text" value={projectForm.impact} onChange={(e) => setProjectForm({ ...projectForm, impact: e.target.value })} placeholder="Impacto (ex: +500 famílias atendidas)" className="px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-foreground" />
                  <button type="submit" disabled={projectSaving} className="flex items-center justify-center gap-2 bg-gradient-gold text-foreground py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-60">
                    {projectSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    Adicionar Projeto
                  </button>
                </form>
              </motion.div>
            )}
            <div className="flex flex-col gap-3">
              {projects.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground"><Heart size={48} className="mx-auto mb-4 opacity-50" /><p>Nenhum projeto cadastrado.</p></div>
              ) : (
                projects.map((p) => (
                  <div key={p.id} className="glass rounded-xl p-5 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{p.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{p.description}</p>
                      {p.impact && <span className="inline-block mt-1 bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs font-semibold">{p.impact}</span>}
                    </div>
                    <button onClick={() => removeProject(p.id)} className="p-2 rounded-lg bg-muted hover:bg-destructive/20 text-destructive transition-colors shrink-0"><Trash2 size={16} /></button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
