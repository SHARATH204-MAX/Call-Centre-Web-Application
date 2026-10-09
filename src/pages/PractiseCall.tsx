import { useState } from "react";
import Button from "../components/ui/Button";
import { Mic, Play, CheckCircle2, Sparkles, Volume2, ShieldCheck, RefreshCw, Award } from "lucide-react";

export default function PractiseCall() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [activeScenario, setActiveScenario] = useState("walkout");

  const scenarios = [
    {
      id: "walkout",
      title: "Walk-out Recovery — Smart Ortho Mattress",
      customerName: "MK Mukunda",
      context: "Shopper walked out of store after testing Ortho GRID mattress due to price concern.",
      sopGoal: "Name shopper in first 10 seconds, state 100-night trial, and offer 0% EMI financing."
    },
    {
      id: "chair",
      title: "Ergonomic Lumbar Support Pitch — Smart Chair Pro",
      customerName: "Meera Sharma",
      context: "Customer WFH user inquiring about 2D lumbar armrest adjustments.",
      sopGoal: "Highlight 3-year warranty and send store demo invite."
    }
  ];

  const currentScenario = scenarios.find((s) => s.id === activeScenario) || scenarios[0];

  const handleStartPractise = () => {
    setIsRecording(true);
    setTranscript(["[Simulation Started] Tele-caller Arvind: Hello MK Mukunda! This is Arvind calling from The Sleep Company..."]);
    setScore(null);

    setTimeout(() => {
      setTranscript((prev) => [
        ...prev,
        "[Customer Bot]: Hi Arvind, yes I tried the Ortho GRID mattress at your Koramangala store earlier..."
      ]);
    }, 1500);

    setTimeout(() => {
      setTranscript((prev) => [
        ...prev,
        "[AI Pitch Coach]: Great job stating customer name in first 10s (+23.6pp conversion driver)!",
        "[Tele-caller Arvind]: I wanted to share that we offer a 100-night risk-free trial and 0% HDFC EMI..."
      ]);
      setIsRecording(false);
      setScore(94);
    }, 3500);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-xl bg-gradient-to-r from-[#123c30] to-[#3b1254] p-5 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-emerald-300 backdrop-blur-xs border border-white/20">
              <Mic size={26} />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight">AI Tele-caller Pitch Practise & Call Coach</h2>
              <p className="text-xs text-emerald-100/90 mt-1 max-w-xl">
                Practise retail walk-out scripts with AvaniBot AI customer simulator before placing real calls.
              </p>
            </div>
          </div>

          {score && (
            <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 backdrop-blur-xs border border-white/20">
              <Award size={22} className="text-amber-300" />
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-200 block">Practice QA Score</span>
                <span className="text-xl font-extrabold text-white">{score}%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scenario Selector & Practice Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Scenario Selection */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Select Practice Scenario</h3>

          {scenarios.map((scen) => (
            <div
              key={scen.id}
              onClick={() => {
                setActiveScenario(scen.id);
                setTranscript([]);
                setScore(null);
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                activeScenario === scen.id
                  ? "border-[#1d9e75] bg-emerald-50/70 shadow-xs ring-2 ring-[#1d9e75]/20"
                  : "border-[#e5e0d5] bg-white hover:bg-gray-50"
              }`}
            >
              <span className="text-xs font-bold text-gray-900 block">{scen.title}</span>
              <p className="text-xs text-gray-500 mt-1">{scen.context}</p>
            </div>
          ))}
        </div>

        {/* Live Practice Room */}
        <div className="lg:col-span-2 rounded-xl border border-[#e5e0d5] bg-white p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b pb-3 mb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Target Customer: {currentScenario.customerName}
                </span>
                <h3 className="text-sm font-bold text-gray-900 mt-1">{currentScenario.title}</h3>
              </div>
              <Button
                variant={isRecording ? "danger" : "primary"}
                size="md"
                onClick={handleStartPractise}
                disabled={isRecording}
                className="font-bold shadow-md"
              >
                {isRecording ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" /> Recording Tele-caller Script...
                  </>
                ) : (
                  <>
                    <Play size={16} /> Start Call Simulation
                  </>
                )}
              </Button>
            </div>

            <div className="rounded-xl bg-amber-50 p-3 border border-amber-200 text-xs text-amber-950 space-y-1">
              <span className="font-bold block">SOP Objective to Hit:</span>
              <p>{currentScenario.sopGoal}</p>
            </div>
          </div>

          {/* Transcript Log Box */}
          <div className="rounded-xl bg-gray-900 p-4 text-emerald-300 font-mono text-xs min-h-[160px] space-y-2 overflow-y-auto">
            {transcript.length === 0 ? (
              <span className="text-gray-500 italic">
                Click "Start Call Simulation" to speak or test simulated dialogue...
              </span>
            ) : (
              transcript.map((line, idx) => (
                <div
                  key={idx}
                  className={line.includes("AI Pitch Coach") ? "text-amber-300 font-bold" : "text-white"}
                >
                  {line}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
