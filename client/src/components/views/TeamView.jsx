import React from 'react';
import { Mail, Github, ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function TeamView({ teamMembers }) {
  const getBadgeVariant = (id) => {
    if (id === 'aditya') return 'indigo';
    if (id === 'mayur') return 'emerald';
    if (id === 'manish') return 'purple';
    return 'neutral';
  };

  const getGradient = (id) => {
    if (id === 'aditya') return 'from-indigo-600 to-blue-500';
    if (id === 'mayur') return 'from-emerald-600 to-teal-500';
    if (id === 'manish') return 'from-purple-600 to-indigo-600';
    return 'from-slate-700 to-slate-900';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 animate-fade-up">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="indigo" dot>Engineering Founders & Leadership</Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
          Direct Founder Engineering
        </h2>
        <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
          No intermediaries or outsourcing. You partner directly with the architects who design your cloud infrastructure, native apps, and backend services.
        </p>
      </div>

      {/* Founders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member) => {
          const badgeVariant = getBadgeVariant(member.id);
          const gradient = getGradient(member.id);
          const initials = member.name
            ? member.name
                .split(' ')
                .map((n) => n[0])
                .join('')
            : 'SS';

          return (
            <Card
              key={member.id}
              hover
              padding="p-8"
              className="flex flex-col justify-between space-y-6 relative overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${gradient} flex items-center justify-center text-white font-extrabold text-xl shadow-md shrink-0 font-heading`}>
                      {initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight font-heading">
                          {member.name}
                        </h3>
                        <ShieldCheck className="w-4 h-4 text-indigo-600" title="Verified Founder" />
                      </div>
                      <Badge variant={badgeVariant} size="sm" className="mt-1">
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Domain Focus: {member.specialty}</span>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {member.bio}
                </p>

                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-bold uppercase text-slate-500 tracking-wider font-mono">
                    Core Technical Stack:
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

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`mailto:${member.email}`}
                  className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 font-semibold transition-colors"
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
