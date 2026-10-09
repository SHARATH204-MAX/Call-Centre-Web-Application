import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { formatCurrency } from "../../utils/formatCurrency";
import { Printer, Download, CheckCircle2, TrendingUp, Award, Calendar, PhoneCall, Clock } from "lucide-react";

export default function ShiftReportModal() {
  const { activeModal, closeModal, employee, calls, leads } = useApp();

  if (activeModal !== "shift-report") return null;

  const totalCalls = calls.length;
  const completedCalls = calls.filter((c) => c.status !== "Missed");
  const totalValue = calls.reduce((acc, c) => acc + c.estimatedValue, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={activeModal === "shift-report"}
      onClose={closeModal}
      title="📄 Official Shift Performance Summary Report"
      subtitle="Audited operational metrics, deal values, and QA compliance summary"
      headerBg="bg-[#123c30]"
      maxWidth="max-w-2xl"
    >
      <div id="printable-shift-report" className="space-y-4 text-xs text-gray-800">
        {/* Executive Header Box */}
        <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Tele-caller</span>
              <h3 className="text-base font-extrabold text-gray-900">{employee.name} · {employee.role}</h3>
              <p className="text-[11px] text-gray-500">{employee.store} Flagship · Koramangala Region</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Shift Date</span>
              <span className="font-extrabold text-gray-900 text-xs">Today · Oct 09, 2026</span>
              <span className="inline-block mt-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5">
                Audit Status: Verified
              </span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
            <div className="rounded-lg bg-white p-2.5 border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Calls Handled</span>
              <span className="text-base font-extrabold text-gray-900">{totalCalls} calls</span>
            </div>
            <div className="rounded-lg bg-white p-2.5 border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Deal Pipeline</span>
              <span className="text-base font-extrabold text-[#1d9e75]">{formatCurrency(totalValue)}</span>
            </div>
            <div className="rounded-lg bg-white p-2.5 border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Composite OG Score™</span>
              <span className="text-base font-extrabold text-[#3b1254]">86 / 100</span>
            </div>
            <div className="rounded-lg bg-white p-2.5 border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">SOP Compliance</span>
              <span className="text-base font-extrabold text-emerald-700">94.2%</span>
            </div>
          </div>
        </div>

        {/* Audit Call Records Table */}
        <div className="space-y-1.5">
          <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider">Shift Call Audit Log</h4>
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white max-h-40 sm:max-h-48 overflow-y-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead className="bg-gray-100/80 text-gray-600 font-bold border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Product</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Value</th>
                  <th className="p-2">QA Score</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {calls.map((call) => (
                  <tr key={call.id} className="hover:bg-gray-50/50">
                    <td className="p-2 font-bold text-gray-900">{call.leadName}</td>
                    <td className="p-2 text-gray-600 truncate max-w-[120px]">{call.product}</td>
                    <td className="p-2 capitalize text-gray-500">{call.type}</td>
                    <td className="p-2 font-extrabold text-emerald-700">{formatCurrency(call.estimatedValue)}</td>
                    <td className="p-2 font-bold text-purple-900">{call.qaScore ?? 88}%</td>
                    <td className="p-2">
                      <span className="rounded bg-emerald-100 text-emerald-800 px-1.5 py-0.2 text-[9px] font-bold">
                        Logged
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Supervisor Signoff Note */}
        <div className="rounded-xl bg-purple-50 p-2.5 border border-purple-200 flex items-center justify-between text-[11px]">
          <div>
            <span className="font-extrabold text-purple-950 block">QA Supervisor Verification:</span>
            <p className="text-purple-900">Passed all 14 mandatory contact center compliance checks for this shift.</p>
          </div>
          <span className="font-mono text-purple-800 text-[10px] font-bold">SIG-OG-2026-9481</span>
        </div>

        {/* Print / Action Controls - Sticky at bottom */}
        <div className="sticky bottom-0 bg-white py-2.5 border-t border-gray-100 flex justify-between items-center -mx-5 px-5 -mb-5 shadow-xs">
          <Button variant="outline" size="sm" onClick={closeModal}>
            Close
          </Button>

          <div className="flex gap-2">
            <Button variant="primary" size="sm" onClick={handlePrint} className="bg-[#123c30] font-bold">
              <Printer size={14} /> Print / Save PDF
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
