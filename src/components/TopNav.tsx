"use client";

import { Github, Linkedin, Mail, FileText } from "lucide-react";

type LinkItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export default function TopNav() {
  const links: LinkItem[] = [
    {
      label: "Resume",
      href: "/Jayadityan_Sethuraman_Resume.pdf",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jayset/",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      label: "GitHub",
      href: "https://github.com/JishnuSethuraman",
      icon: <Github className="h-5 w-5" />,
    },
    {
      label: "Email",
      href: "mailto:jayadityan99@gmail.com",
      icon: <Mail className="h-5 w-5" />,
    },
  ];

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="pointer-events-auto w-full max-w-6xl">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          {/* Left: your name / mark */}
          <a
            href="#"
            className="text-sm font-medium tracking-tight text-white/90 hover:text-white transition"
          >
            ML/AI Software Engineer Portfolio
          </a>

          {/* Right: icon links */}
          <div className="flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={l.label}
                title={l.label}
                className="group rounded-xl p-2 text-white/70 hover:text-white transition hover:bg-white/5"
              >
                <span className="block transition-transform group-hover:scale-105">
                  {l.icon}
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
