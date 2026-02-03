"use client";

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-primary-dark">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                {children}
                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}