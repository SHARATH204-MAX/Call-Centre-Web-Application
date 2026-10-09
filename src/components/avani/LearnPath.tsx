import { avaniLearnModules } from "../../data/avani";
import { BookOpen, CheckCircle2, Clock, Sparkles } from "lucide-react";

export default function LearnPath() {
  const completedCount = avaniLearnModules.filter((m) => m.status === "done").length;
  const totalCount = avaniLearnModules.length;

  return (
    <div className="space-y-4 text-xs text-gray-800 animate-in fade-in duration-200">
      {/* Overview Banner */}
      <div className="rounded-xl bg-gradient-to-r from-[#3b1254] to-[#123c30] p-4 text-white shadow-md flex items-center justify-between">
        <div>
          <h3 className="text-sm font-extrabold">Avani — Your Assigned Learning Path</h3>
          <p className="text-xs text-purple-100/90 mt-0.5">
            4 modules assigned this week (2 core modules + 2 personalized based on store floor conversations)
          </p>
        </div>

        <div className="rounded-xl bg-white/15 px-3 py-1.5 backdrop-blur-xs border border-white/20 text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-200 block">Overall Progress</span>
          <span className="text-sm font-extrabold text-white">{completedCount} / {totalCount} Done</span>
        </div>
      </div>

      {/* Modules Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {avaniLearnModules.map((module) => {
          const isDone = module.status === "done";
          const isInProgress = module.status === "in-progress";

          return (
            <div
              key={module.id}
              className={`p-4 rounded-xl border transition-all shadow-2xs space-y-2 ${
                isDone
                  ? "bg-emerald-50/50 border-emerald-200"
                  : isInProgress
                  ? "bg-white border-purple-200"
                  : "bg-gray-50 border-gray-200 opacity-80"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 text-xs">{module.title}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                    isDone
                      ? "bg-emerald-100 text-emerald-900"
                      : isInProgress
                      ? "bg-purple-100 text-[#3b1254]"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {isDone ? "Done" : isInProgress ? `${module.progressPercent}%` : "Not Started"}
                </span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed font-medium">{module.description}</p>

              {/* Progress Bar */}
              <div className="mt-2">
                <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isDone ? "bg-emerald-600" : "bg-[#3b1254]"}`}
                    style={{ width: `${module.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
