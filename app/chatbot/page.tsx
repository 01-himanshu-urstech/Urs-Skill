// 'use client';

// import { useState, useMemo } from 'react';
// import { toast } from 'react-hot-toast';
// import { Bot, Plus, Edit2, Trash2, RefreshCw, Search, Terminal, ExternalLink, CreditCard } from 'lucide-react';
// import {
//   useGetChatbotKnowledgeQuery,
//   useTrainChatbotMutation,
//   useDeleteChatbotKnowledgeMutation,
//   useTestChatbotAskMutation
// } from '../../redux/service/adminApi';
// import PermissionGuardian from "../../components/auth/PermissionGuardian";


// export default function ChatbotPage() {
//   const { data: kbResponse, isLoading: kbLoading } = useGetChatbotKnowledgeQuery(undefined);
//   const [trainChatbot, { isLoading: isTraining }] = useTrainChatbotMutation();
//   const [deleteKnowledge] = useDeleteChatbotKnowledgeMutation();
//   const [testAsk, { isLoading: testLoading }] = useTestChatbotAskMutation();

//   const [searchQuery, setSearchQuery] = useState('');
//   const [formData, setFormData] = useState({ topic: '', content: '', keywords: '', category: 'general' });
//   const [editMode, setEditMode] = useState(false);
//   const [testQuestion, setTestQuestion] = useState('');
//   const [testAnswer, setTestAnswer] = useState('');
//   const [testAction, setTestAction] = useState<any>(null);

//   const filteredKnowledge = useMemo(() => {
//     return (kbResponse?.data || []).filter((kb: any) =>
//       kb.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       kb.content.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [kbResponse, searchQuery]);

//   //   Redirection & Auth Logic
//   const handleProtectedRedirect = (path: string) => {
//     if (!path) return;

//     const token = localStorage.getItem('token') || document.cookie.includes('auth_token');
//     const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || 'http://localhost:3000';
//     const fullTargetUrl = `${baseUrl}${path}`;

//     if (!token) {
//       toast.error('Login required to proceed');
//       // Redirect to login with the specific path as a parameter
//       const loginUrl = `${baseUrl}/login?redirect=${encodeURIComponent(fullTargetUrl)}`;
//       window.location.href = loginUrl;
//     } else {
//       // User is logged in, send directly to the internal tool/checkout
//       window.location.href = fullTargetUrl;
//     }
//   };

//   const handleTestChatbot = async () => {
//     if (!testQuestion.trim()) return toast.error('Enter a question');
//     try {
//       setTestAction(null);
//       setTestAnswer('');
//       const response = await testAsk({ question: testQuestion }).unwrap();
//       setTestAnswer(response.answer);
//       if (response.action) setTestAction(response.action);
//     } catch (error) {
//       toast.error('Response Failed');
//     }
//   };

//   return (
//     <PermissionGuardian permissionId="Chatbot">
//       <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-10 text-black">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

//           {/* LEFT: Intelligence Management Form */}
//           <div className="lg:col-span-7 space-y-8">
//             <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-slate-100">
//               <h2 className="text-xl   mb-6 flex items-center gap-2 uppercase tracking-tighter">
//                 <Plus className="text-indigo-600" size={24} /> Intelligence Base
//               </h2>
//               <form onSubmit={async (e) => {
//                 e.preventDefault();
//                 await trainChatbot({ ...formData, keywords: formData.keywords.split(',') }).unwrap();
//                 setFormData({ topic: '', content: '', keywords: '', category: 'general' });
//                 toast.success('Bot Trained!');
//               }} className="space-y-5">
//                 <input type="text" className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold border-none" placeholder="Topic (e.g. full-stack)" value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })} required />
//                 <textarea className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium border-none" rows={4} placeholder="What should the bot answer?" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required />
//                 <button type="submit" disabled={isTraining} className="w-full bg-indigo-600 text-white py-4 rounded-2xl   uppercase text-xs shadow-lg transition-all active:scale-95">
//                   {isTraining ? <RefreshCw className="animate-spin mx-auto" /> : 'Train UrsBot'}
//                 </button>
//               </form>
//             </div>

//             <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
//               <div className="p-6 border-b bg-slate-50/50   text-xs uppercase tracking-widest text-slate-400">Trained Units</div>
//               <div className="divide-y divide-slate-50">
//                 {filteredKnowledge.map((kb: any) => (
//                   <div key={kb._id} className="p-5 flex justify-between items-center">
//                     <span className="font-bold text-sm uppercase text-slate-700">{kb.topic}</span>
//                     <button onClick={() => deleteKnowledge(kb._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"><Trash2 size={16} /></button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* RIGHT: Terminal Simulator */}
//           <div className="lg:col-span-5">
//             <div className="bg-slate-900 rounded-[2.5rem] p-8 sticky top-10 shadow-2xl text-white min-h-[600px] border border-slate-800 flex flex-col">
//               <div className="flex items-center gap-3 mb-8">
//                 <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20"><Bot size={28} /></div>
//                 <h3 className="  text-lg uppercase tracking-tight">UrsBot Terminal</h3>
//               </div>

//               <div className="space-y-6 flex-1">
//                 <textarea className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-4 focus:border-indigo-500 outline-none text-sm text-white" rows={4} placeholder="Ask about course links..." value={testQuestion} onChange={(e) => setTestQuestion(e.target.value)} />
//                 <button onClick={handleTestChatbot} disabled={testLoading} className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl   uppercase text-xs shadow-xl transition-all">
//                   {testLoading ? <RefreshCw className="animate-spin mx-auto" size={18} /> : 'Process Logic'}
//                 </button>

//                 {testAnswer && (
//                   <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
//                     <div className="bg-slate-800 rounded-2xl p-5 text-sm border-l-4 border-indigo-500 text-slate-200 font-medium leading-relaxed">{testAnswer}</div>

//                     {/*   ACTIONS SECTION */}
//                     {testAction && (
//                       <div className="flex flex-col gap-3 pt-2">
//                         <p className="text-[10px]   uppercase text-indigo-400 tracking-widest px-1">Available Actions:</p>
//                         <div className="flex flex-wrap gap-2">
//                           <button
//                             onClick={() => handleProtectedRedirect(testAction.apply)}
//                             className="flex-1 min-w-[140px] bg-emerald-500 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest transition-all shadow-lg hover:bg-emerald-400"
//                           >
//                             <ExternalLink size={16} /> Apply
//                           </button>

//                           {/* PAY BUTTON */}
//                           <button
//                             onClick={() => handleProtectedRedirect(testAction.pay)}
//                             className="flex-1 min-w-[140px] bg-indigo-600 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest transition-all shadow-lg hover:bg-indigo-500"
//                           >
//                             <CreditCard size={16} /> Pay
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </PermissionGuardian>
//   );
// }

'use client';

import { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  Bot, Plus, Trash2, RefreshCw,
  ExternalLink, CreditCard
} from 'lucide-react';
import {
  useGetChatbotKnowledgeQuery,
  useTrainChatbotMutation,
  useDeleteChatbotKnowledgeMutation,
  useTestChatbotAskMutation
} from '../../redux/service/adminApi';
import PermissionGuardian from "../../components/auth/PermissionGuardian";

// Define TypeScript interface for better type safety
interface ChatbotAction {
  apply?: string;
  pay?: string;
}

export default function ChatbotPage() {
  // Hydration Fix: Ensure component is mounted before rendering browser-specific logic
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Data Fetching Hooks ---
  const { data: kbResponse, isLoading: kbLoading } = useGetChatbotKnowledgeQuery(undefined);
  const [trainChatbot, { isLoading: isTraining }] = useTrainChatbotMutation();
  const [deleteKnowledge] = useDeleteChatbotKnowledgeMutation();
  const [testAsk, { isLoading: testLoading }] = useTestChatbotAskMutation();

  // --- Local State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    topic: '',
    content: '',
    keywords: '',
    category: 'general'
  });
  const [testQuestion, setTestQuestion] = useState('');
  const [testAnswer, setTestAnswer] = useState('');
  const [testAction, setTestAction] = useState<ChatbotAction | null>(null);

  // --- Memoized Knowledge Filter ---
  const filteredKnowledge = useMemo(() => {
    return (kbResponse?.data || []).filter((kb: any) =>
      kb.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kb.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [kbResponse, searchQuery]);

  /**
   * Unifies Redirection & Auth Logic
   * Fixes the "Invalid URL" error by ensuring a slash exists
   */
  const handleProtectedRedirect = (path: string) => {
    if (!path || typeof window === 'undefined') return;

    // Browser-only logic safely inside the event handler
    const token = localStorage.getItem('token') || document.cookie.includes('auth_token');
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || 'http://localhost:3000';

    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const fullTargetUrl = `${baseUrl}${cleanPath}`;

    if (!token) {
      toast.error('Login required to proceed');
      const loginUrl = `${baseUrl}/login?redirect=${encodeURIComponent(fullTargetUrl)}`;
      window.location.href = loginUrl;
    } else {
      window.location.href = fullTargetUrl;
    }
  };

  /**
   * Handles Bot Training
   */
  const handleTrainingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await trainChatbot({
        ...formData,
        keywords: formData.keywords.split(',').map(k => k.trim())
      }).unwrap();

      setFormData({ topic: '', content: '', keywords: '', category: 'general' });
      toast.success('Bot Intelligence Updated!');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Training Failed');
    }
  };

  /**
   * Handles Real-time Bot Testing
   */
  const handleTestChatbot = async () => {
    if (!testQuestion.trim()) return toast.error('Enter a question');
    try {
      setTestAction(null);
      setTestAnswer('');
      const response = await testAsk({ question: testQuestion }).unwrap();
      setTestAnswer(response.answer);
      if (response.action) setTestAction(response.action);
    } catch (error) {
      toast.error('Processing Failed');
    }
  };

  // Prevent hydration mismatch by returning null or a skeleton until mounted
  if (!mounted) return null;

  return (
    <PermissionGuardian permissionId="Chatbot">
      <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-10 text-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT: Intelligence Management Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-slate-100">
              <h2 className="text-xl mb-6 flex items-center gap-2 uppercase tracking-tighter font-bold">
                <Plus className="text-indigo-600" size={24} /> Intelligence Base
              </h2>

              <form onSubmit={handleTrainingSubmit} className="space-y-5">
                <input
                  type="text"
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold border-none"
                  placeholder="Topic (e.g. full-stack)"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  required
                />
                <textarea
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium border-none"
                  rows={4}
                  placeholder="What should the bot answer?"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                />
                <button
                  type="submit"
                  disabled={isTraining}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl uppercase font-bold text-xs shadow-lg transition-all active:scale-95 disabled:opacity-50"
                >
                  {isTraining ? <RefreshCw className="animate-spin mx-auto" /> : 'Train UrsBot'}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
              <div className="p-6 border-b bg-slate-50/50 text-xs uppercase tracking-widest text-slate-400 font-bold">
                Trained Knowledge Units
              </div>
              <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto no-scrollbar">
                {kbLoading ? (
                  <div className="p-10 text-center text-slate-400">Loading units...</div>
                ) : filteredKnowledge.length > 0 ? (
                  filteredKnowledge.map((kb: any) => (
                    <div key={kb._id} className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors">
                      <span className="font-bold text-sm uppercase text-slate-700">{kb.topic}</span>
                      <button
                        onClick={() => deleteKnowledge(kb._id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center text-slate-400 italic">No intelligence units found.</div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Terminal Simulator */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 sticky top-10 shadow-2xl text-white min-h-[600px] border border-slate-800 flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Bot size={28} />
                </div>
                <h3 className="text-lg uppercase tracking-tight font-bold">UrsBot Terminal</h3>
              </div>

              <div className="space-y-6 flex-1">
                <textarea
                  className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-4 focus:border-indigo-500 outline-none text-sm text-white font-mono"
                  rows={4}
                  placeholder="Ask a test question (e.g. 'How to join internship?')..."
                  value={testQuestion}
                  onChange={(e) => setTestQuestion(e.target.value)}
                />
                <button
                  onClick={handleTestChatbot}
                  disabled={testLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl uppercase font-bold text-xs shadow-xl transition-all active:scale-95"
                >
                  {testLoading ? <RefreshCw className="animate-spin mx-auto" size={18} /> : 'Submit'}
                </button>

                {testAnswer && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-slate-800 rounded-2xl p-5 text-sm border-l-4 border-indigo-500 text-slate-200 font-medium leading-relaxed">
                      {testAnswer}
                    </div>

                    {testAction && (
                      <div className="flex flex-col gap-3 pt-2">
                        <p className="text-[10px] uppercase text-indigo-400 tracking-widest px-1 font-bold">
                          System Execution:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {testAction.apply && (
                            <button
                              onClick={() => handleProtectedRedirect(testAction.apply!)}
                              className="flex-1 min-w-[140px] bg-emerald-500 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-[11px] uppercase font-bold tracking-widest transition-all shadow-lg hover:bg-emerald-400"
                            >
                              <ExternalLink size={16} /> Apply
                            </button>
                          )}

                          {testAction.pay && (
                            <button
                              onClick={() => handleProtectedRedirect(testAction.pay!)}
                              className="flex-1 min-w-[140px] bg-indigo-600 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 text-[11px] uppercase font-bold tracking-widest transition-all shadow-lg hover:bg-indigo-500"
                            >
                              <CreditCard size={16} /> Pay
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </PermissionGuardian>
  );
}