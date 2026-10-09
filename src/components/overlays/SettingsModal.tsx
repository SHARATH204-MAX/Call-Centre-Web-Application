import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { User, Lock, Store, Shield, Globe, CheckCircle2 } from "lucide-react";

export default function SettingsModal() {
  const { activeModal, closeModal, employee, setEmployee } = useApp();
  const [savedMsg, setSavedMsg] = useState(false);

  const [formData, setFormData] = useState({
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
    linkedInUrl: employee.linkedInUrl ?? ""
  });

  if (activeModal !== "settings") return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEmployee((prev) => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      linkedInUrl: formData.linkedInUrl
    }));
    setSavedMsg(true);
    setTimeout(() => {
      setSavedMsg(false);
      closeModal();
    }, 1200);
  };

  return (
    <Modal
      isOpen={activeModal === "settings"}
      onClose={closeModal}
      title="Employee Settings & Profile"
      subtitle={`Employee ID: ${employee.employeeId} · Role: ${employee.role}`}
      headerBg="bg-[#123c30]"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSave} className="space-y-4 text-xs text-gray-800">
        {/* Profile Group */}
        <div className="space-y-2">
          <span className="font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <User size={14} className="text-[#1d9e75]" /> Employee Profile:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-gray-500 font-semibold block mb-1">Full Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-[#1d9e75] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gray-500 font-semibold block mb-1">Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-[#1d9e75] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Security & Store Base */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t">
          <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
            <span className="font-bold text-gray-800 block flex items-center gap-1">
              <Store size={13} className="text-emerald-700" /> Store Base:
            </span>
            <p className="text-gray-600 font-medium">{employee.store}</p>
            <p className="text-[10px] text-gray-400">Allocated: {employee.allocatedStores.join(", ")}</p>
          </div>

          <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
            <span className="font-bold text-gray-800 block flex items-center gap-1">
              <Shield size={13} className="text-purple-700" /> Designation:
            </span>
            <p className="text-gray-600 font-medium">M0 · Call Centre Staff</p>
            <p className="text-[10px] text-emerald-700 font-bold">Development Mode Active</p>
          </div>
        </div>

        {/* LinkedIn Integration */}
        <div className="pt-2 border-t space-y-1.5">
          <label className="font-bold text-gray-800 block flex items-center gap-1.5">
            <Globe size={14} className="text-blue-600" /> LinkedIn Profile URL:
          </label>
          <input
            type="text"
            value={formData.linkedInUrl}
            onChange={(e) => setFormData({ ...formData, linkedInUrl: e.target.value })}
            placeholder="https://linkedin.com/in/..."
            className="w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-[#1d9e75] focus:outline-none"
          />
        </div>

        {savedMsg ? (
          <div className="rounded-xl bg-emerald-100 p-2.5 text-center text-emerald-900 font-bold flex items-center justify-center gap-1.5">
            <CheckCircle2 size={16} /> Employee settings saved successfully!
          </div>
        ) : (
          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button type="button" variant="outline" size="sm" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="bg-[#1d9e75]">
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </Modal>
  );
}
