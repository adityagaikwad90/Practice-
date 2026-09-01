import React from 'react';
import { Mail, Github } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function TeamView({ teamMembers }) {
  const getBadgeVariant = (id) => {
    if (id === 'aditya') return 'indigo';
    if (id === 'mayur') return 'emerald';
    if (id === 'manish') return 'purple';
    return 'neutral';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12 animate-fade-up">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="indigo">Engineering Leadership</Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">Meet Our Founders</h2>
        <p className="text-slate-600 text-xs sm:text-base">
          Domain leads driving Cloud Infrastructure, Native Mobile Engineering, and Scalable Backend Systems.
        </p>
      </div>

      {/* Founders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member) => {
          const badgeVariant = getBadgeVariant(member.id);
          const initials = member.name
            ? member.name
                .split(' ')
                .map((n) => n[0])
                .join('')
            : 'SS';

          return (
            <Card key={member.id} hover padding="p-8" className="flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-extrabold text-xl shadow-xs shrink-0 font-heading">
                    {initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight font-heading">{member.name}</h3>
                    <Badge variant={badgeVariant} size="sm" className="mt-1">
                      {member.role}
                    </Badge>
                    <p className="text-[11px] text-slate-500 font-mono mt-1">{member.specialty}</p>
                  </div>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{member.bio}</p>

                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-semibold uppercase text-slate-500 tracking-wider font-mono">
                    Technical Expertise:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map((skill, i) => (
                      <span key={i} className="skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`mailto:${member.email}`}
                  className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 font-medium transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{member.email}</span>
                </a>
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    aria-label={`${member.name} GitHub profile`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
