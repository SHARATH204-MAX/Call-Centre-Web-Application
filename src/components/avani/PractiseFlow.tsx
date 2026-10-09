import { useState } from "react";
import { avaniPractiseSteps } from "../../data/avani";
import type { AvaniPractiseStep } from "../../types";
import Button from "../ui/Button";
import { Play, Mic, CheckCircle2, RefreshCw, ArrowLeft, Volume2, Award } from "lucide-react";
import { formatDurationDigital } from "../../utils/dateUtils";

export default function PractiseFlow() {
  const [selectedStepId, setSelectedStepId] = useState<string>("STEP_01");
  const [practiseState, setPractiseState] = useState<"picker" | "exercise" | "recording" | "feedback">("picker");
  const [timer, setTimer] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<any>(null);

  const step = avaniPractiseSteps.find((s) => s.id === selectedStepId) || avaniPractiseSteps[0];

  const handleStartRecording = () => {
    setPractiseState("recording");
    setTimer(0);
    const id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);
  };

  const handleStopAndFeedback = () => {
    if (intervalId) clearInterval(intervalId);
    setPractiseState("feedback");
  };

  return (
    <div className="space-y-4 text-xs text-gray-800 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex items-center justify-between border-b pb-3">
        <div>
          <h3 className="text-sm font-extrabold text-gray-900">Your Net Practise — Role-play Rehearsal</h3>
          <p className="text-xs text-gray-500">Pick a step, see how it's done, record your rendition & get instant feedback</p>
        </div>

        {practiseState !== "picker" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (intervalId) clearInterval(intervalId);
              setPractiseState("picker");
            }}
          >
            <ArrowLeft size={14} /> All steps
          </Button>
        )}
      </div>

      {/* 1. Step Picker View */}
      {practiseState === "picker" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {avaniPractiseSteps.map((s) => (
            <div
              key={s.id}
              onClick={() => {
                setSelectedStepId(s.id);
                setPractiseState("exercise");
              }}
              className="p-4 rounded-xl border border-gray-200 bg-white shadow-2xs hover:border-[#3b1254] hover:shadow-xs transition-all cursor-pointer space-y-2 group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 bg-purple-50 px-2 py-0.5 rounded">
                Step Exercise
              </span>
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#3b1254] transition-colors">{s.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-2">{s.instructions}</p>
            </div>
          ))}
        </div>
      )}

      {/* 2. Active Exercise & Recording View */}
      {(practiseState === "exercise" || practiseState === "recording") && (
        <div className="rounded-xl border border-purple-200 bg-white p-5 shadow-2xs space-y-4">
          <div className="border-b pb-3">
            <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">Exercise Goal:</span>
            <h3 className="text-base font-extrabold text-gray-900 mt-0.5">{step.title}</h3>
            <p className="text-xs text-gray-600 mt-1">{step.instructions}</p>
          </div>

          {/* Model Example Script Box */}
          <div className="rounded-xl bg-purple-50 p-4 border border-purple-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-xs text-[#3b1254]">
              <span className="flex items-center gap-1">
                <Volume2 size={15} /> Watch / Listen to Model Example ({step.modelExampleDuration})
              </span>
            </div>
            <p className="text-xs text-purple-950 font-medium leading-relaxed italic bg-white p-3 rounded-lg border border-purple-100">
              "{step.scriptText}"
            </p>
          </div>

          {/* Recording Action Box */}
          <div className="rounded-xl bg-gray-50 p-4 border border-gray-200 text-center space-y-3">
            <span className="text-xs font-bold text-gray-700 block">Record Your Rendition</span>
            <div className="text-2xl font-mono font-extrabold text-gray-900">
              {formatDurationDigital(timer)}
            </div>

            {practiseState === "recording" ? (
              <Button
                variant="danger"
                size="md"
                onClick={handleStopAndFeedback}
                className="font-bold shadow-md bg-red-600 hover:bg-red-700"
              >
                Stop & Get Feedback
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={handleStartRecording}
                className="font-bold shadow-md bg-[#3b1254] hover:bg-purple-900"
              >
                <Mic size={16} /> Record Rendition
              </Button>
            )}
          </div>
        </div>
      )}

      {/* 3. Feedback Results View */}
      {practiseState === "feedback" && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 shadow-2xs space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
            <div>
              <span className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider">Avani AI Feedback</span>
              <h3 className="text-base font-extrabold text-emerald-950 mt-0.5">Rendition Passed (Score: 92%)</h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-200 text-emerald-900 font-bold">
              <Award size={22} />
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-emerald-900 block">What We Checked For:</span>
            <ul className="space-y-1 text-emerald-950 font-medium pl-4 list-disc">
              {step.checks.map((chk, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                  <span>{chk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-white p-3 border border-emerald-200 text-xs text-emerald-950 font-medium">
            <strong>Coach's Note:</strong> Excellent tone and pacing! Stated 100-night trial clearly within first 15 seconds.
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-emerald-200">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setPractiseState("exercise");
                setTimer(0);
              }}
            >
              <RefreshCw size={14} /> Practise Again
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setPractiseState("picker")}
              className="bg-[#1d9e75]"
            >
              Choose Another Step
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
