import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ─── Static AI knowledge base for demo responses ───────────────────────────
const AI_RESPONSES = {
  default: [
    "Based on your farm data, I'd recommend checking soil pH levels before the next irrigation cycle. Optimal range for most crops is 6.0–7.0.",
    "Great question! For integrated pest management, combining biological controls with targeted pesticide use minimizes resistance and protects beneficial insects.",
    "Your current weather forecast shows a risk of late blight conditions. I recommend applying a preventive copper-based fungicide to your tomato crops within the next 48 hours.",
    "For composting farm waste, a 30:1 carbon-to-nitrogen ratio gives you the richest fertilizer. Combine dry stalks with green plant material and turn every 3–4 days.",
    "Crop rotation every season is key to breaking pest cycles and restoring soil nutrients. For your farm, alternating legumes with nightshades would be ideal.",
  ],
  soil: [
    "Your soil moisture sensors show 42% — slightly below optimal. Increase irrigation by 15 minutes per zone today. Clay soils retain water longer, so reduce frequency rather than volume.",
    "Soil nutrient deficiency detected in Sector B. Nitrogen levels are low. Apply urea fertilizer at 50 kg/hectare. Best time is early morning before 9 AM.",
    "For improving soil organic matter, green manures like cowpea or sunn hemp work excellently. Incorporate before flowering stage for maximum nitrogen fixation.",
  ],
  pest: [
    "Early signs of whitefly infestation detected in your recent scan. Introduce Encarsia formosa (parasitic wasp) for biological control. This is safe for organic certification.",
    "Aphid populations can be managed with neem oil spray (2ml/L) applied every 7 days. Target the undersides of leaves where colonies cluster.",
    "For thrips management: reflective mulches disrupt their orientation, while sticky yellow traps help monitor population levels. Spinosad-based pesticides are highly effective.",
  ],
  weather: [
    "Tomorrow's forecast shows heavy rainfall (>40mm). Postpone any foliar spray applications and ensure drainage channels in low-lying fields are clear.",
    "High humidity (>85%) over the next 5 days creates ideal conditions for fungal diseases. Increase ventilation in your greenhouse zones and reduce irrigation.",
    "Frost risk tonight: temperatures dropping to 2°C. Cover your seedling beds with row covers and ensure heating is active in greenhouse sections C and D.",
  ],
  crop: [
    "Your tomato plants in Sector A-12 show 98% vitality. The current growth stage is mid-fruiting — reduce nitrogen and increase potassium for better fruit development.",
    "Basil in Sector B-04 needs water urgently. Wilting in the morning indicates severe moisture stress. Water immediately and check drip emitter function.",
    "Your Echeveria succulent shows signs of overwatering. Reduce irrigation to once every 10 days and ensure pot drainage is adequate.",
  ],
};

const QUICK_PROMPTS = [
  { label: 'Soil Health Check', icon: 'compost', category: 'soil' },
  { label: 'Pest Identification', icon: 'pest_control', category: 'pest' },
  { label: 'Weather Impact', icon: 'partly_cloudy_day', category: 'weather' },
  { label: 'Crop Growth Tips', icon: 'potted_plant', category: 'crop' },
  { label: 'Fertilizer Plan', icon: 'science', category: 'soil' },
  { label: 'Irrigation Schedule', icon: 'water_drop', category: 'soil' },
];

const SUGGESTED_QUESTIONS = [
  'Best crop rotation practices for my farm?',
  'How do I treat early blight on tomatoes?',
  'When should I harvest my current crops?',
  'Optimal fertilizer for clay soil?',
  'How to increase yield by 20%?',
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 px-4 md:px-6">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shrink-0">
        <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
      </div>
      <div className="bg-surface-container border border-outline-variant/30 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm">
        <div className="flex gap-1.5 items-center h-5">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex items-end gap-3 px-4 md:px-6 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      {isUser ? (
        <div className="w-9 h-9 rounded-full border-2 border-primary/30 overflow-hidden shrink-0 shadow-md">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF534OOD6MQtE1HdOyBiNkKycRZA0RzZNRRjIZ89YH-Wdh5XAWoyOIuPclMb87uWpT40cd-zm90r-BMMPHlVpidBTddGR9y5aRv5le0pxg0UXBypn_BjvOS5D2KC7OK1U-wL-2h_Dc0HhXpbCNyYkDg9UO4m54pZpfMt8M3V8RFv0PCfh3yRlCFCybiblJhU14fMYB7A7-mwE5PLmTRYzylceFwTAn-3mEuhlGJwSiaw6tRxEYFla544qe8o7EcCWd99T8daL5NQ"
            alt="You"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shrink-0">
          <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
        </div>
      )}

      {/* Bubble */}
      <div className={`max-w-[75%] md:max-w-[60%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
          isUser
            ? 'bg-gradient-to-br from-emerald-600 to-emerald-500 text-white rounded-br-sm'
            : 'bg-surface-container border border-outline-variant/30 text-on-surface rounded-bl-sm'
        }`}>
          {msg.text}
        </div>
        <span className="text-[10px] text-on-surface-variant px-1">{msg.time}</span>
      </div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AIChatContent() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'ai',
      text: "👋 Welcome back, Rohith! I'm AgroBrain, your AI farming assistant. Ask me anything about your crops, soil, weather, pests, or farm management. I have real-time access to your farm data!",
      time: 'Now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  const getAIResponse = (userText) => {
    const lower = userText.toLowerCase();
    if (lower.includes('soil') || lower.includes('nutrient') || lower.includes('fertiliz') || lower.includes('irrigation') || lower.includes('pH')) {
      const pool = AI_RESPONSES.soil;
      return pool[Math.floor(Math.random() * pool.length)];
    }
    if (lower.includes('pest') || lower.includes('bug') || lower.includes('insect') || lower.includes('aphid') || lower.includes('thrip') || lower.includes('whitefly')) {
      const pool = AI_RESPONSES.pest;
      return pool[Math.floor(Math.random() * pool.length)];
    }
    if (lower.includes('weather') || lower.includes('rain') || lower.includes('frost') || lower.includes('humid') || lower.includes('temperature')) {
      const pool = AI_RESPONSES.weather;
      return pool[Math.floor(Math.random() * pool.length)];
    }
    if (lower.includes('crop') || lower.includes('tomato') || lower.includes('basil') || lower.includes('plant') || lower.includes('harvest') || lower.includes('yield')) {
      const pool = AI_RESPONSES.crop;
      return pool[Math.floor(Math.random() * pool.length)];
    }
    const pool = AI_RESPONSES.default;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const sendMessage = (text) => {
    const msgText = (text || input).trim();
    if (!msgText) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const userMsg = { id: Date.now(), role: 'user', text: msgText, time: timeStr };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiText = getAIResponse(msgText);
      const aiMsg = { id: Date.now() + 1, role: 'ai', text: aiText, time: timeStr };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickPrompt = (prompt) => {
    setActiveCategory(prompt.category);
    sendMessage(prompt.label);
  };

  const handleSuggestion = (q) => {
    sendMessage(q);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="shrink-0 pt-16">
        <div className="relative bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500 overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-emerald-900/20 rounded-full blur-2xl translate-y-1/2 pointer-events-none" />

          <div className="relative z-10 px-4 md:px-8 py-5 flex items-center gap-4">
            {/* AI Avatar */}
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-white text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-300 border-2 border-emerald-700 animate-pulse" />
            </div>
            <div>
              <h1 className="text-white font-bold text-[22px] leading-tight tracking-tight">AgroBrain</h1>
              <p className="text-emerald-100 text-[13px] font-medium">Your AI Farming Intelligence · Always learning</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors">
                <span className="material-symbols-outlined text-[20px]">history</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors">
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>
          </div>

          {/* Status bar */}
          <div className="relative z-10 px-4 md:px-8 pb-4 flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-white text-[11px] font-medium">Farm data connected</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
              <span className="material-symbols-outlined text-emerald-200 text-[12px]">model_training</span>
              <span className="text-white text-[11px] font-medium">Gemini 2.0 Agri</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Topic Chips ───────────────────────────────────────────────── */}
      <div className="shrink-0 px-4 md:px-6 py-3 bg-surface/80 backdrop-blur-sm border-b border-outline-variant/20">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p.label}
              onClick={() => handleQuickPrompt(p)}
              className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-[12px] font-semibold border transition-all duration-300 ${
                activeCategory === p.category
                  ? 'bg-primary text-white border-primary shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                  : 'bg-surface-container border-outline-variant/40 text-on-surface hover:border-primary/60 hover:text-primary hover:bg-primary/5'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Messages Area ───────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4 bg-surface/50">

        {/* Suggested questions - show only when no user messages */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 md:px-6 pb-2"
          >
            <p className="text-[11px] text-on-surface-variant uppercase tracking-widest font-semibold mb-3 px-1">Suggested Questions</p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggestion(q)}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface text-sm text-left hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-200 group"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary shrink-0 group-hover:scale-110 transition-transform">lightbulb</span>
                  <span>{q}</span>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant ml-auto opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Message bubbles */}
        <AnimatePresence>
          {messages.map(msg => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* ── Disclaimer ─────────────────────────────────────────────────────── */}
      <div className="shrink-0 text-center py-1.5">
        <p className="text-[10px] text-on-surface-variant">AgroBrain learns from your farm data · Responses may vary · Always verify critical decisions</p>
      </div>

      {/* ── Input Bar ──────────────────────────────────────────────────────── */}
      <div className="shrink-0 px-3 md:px-6 pb-4 md:pb-6 pt-2 bg-surface border-t border-outline-variant/20">
        <div className="flex items-end gap-3">
          {/* Voice button */}
          <button className="w-11 h-11 rounded-full bg-surface-container border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/60 hover:bg-primary/5 transition-all shrink-0">
            <span className="material-symbols-outlined text-[22px]">mic</span>
          </button>

          {/* Input field */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask AgroBrain anything about your farm…"
              rows={1}
              className="w-full bg-surface-container border border-outline-variant/40 rounded-2xl px-5 py-3.5 pr-14 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all leading-relaxed max-h-32 overflow-y-auto"
              style={{ minHeight: '48px' }}
            />
            {/* Send button inside field */}
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              className={`absolute right-2 bottom-2 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                input.trim()
                  ? 'bg-primary text-white shadow-[0_2px_12px_rgba(16,185,129,0.4)] hover:scale-105'
                  : 'bg-surface-variant text-on-surface-variant/40 cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>

          {/* Camera / scan button */}
          <button className="w-11 h-11 rounded-full bg-surface-container border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/60 hover:bg-primary/5 transition-all shrink-0">
            <span className="material-symbols-outlined text-[22px]">photo_camera</span>
          </button>
        </div>
      </div>
    </div>
  );
}
