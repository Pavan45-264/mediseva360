import React, { useState, useEffect } from 'react';
import {
  Mic, MicOff, Volume2, Globe, Sparkles, MessageSquare,
  CheckCircle2, AlertTriangle, ShieldAlert, ArrowRight, CornerDownLeft
} from 'lucide-react';

export default function VoiceAssistantView({
  products = [],
  onSpeakText
}) {
  const [selectedLanguage, setSelectedLanguage] = useState('te-IN'); // 'te-IN' or 'en-IN'
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'assistant',
      text: 'నమస్కారం! నేను ఎక్స్‌పైరీ గార్డ్ వాయిస్ అసిస్టెంట్. మీరు తెలుగులో లేదా ఇంగ్లీషులో నన్ను అడగవచ్చు. (Hello! I am your ExpiryGuard voice assistant. You can speak to me in Telugu or English.)'
    }
  ]);

  // Preset quick voice queries
  const presetQueries = [
    {
      lang: 'te-IN',
      text: 'Repu expire ayye items cheppu',
      label: '🗣️ రేపు ఎక్స్‌పైర్ అయ్యే వస్తువులు చెప్పు (Items expiring tomorrow)'
    },
    {
      lang: 'te-IN',
      text: 'Expired products chupinchu',
      label: '🗣️ ఎక్స్‌పైర్ అయిన వస్తువులు చూపించు (Show expired items)'
    },
    {
      lang: 'te-IN',
      text: 'Medicines unnaya?',
      label: '🗣️ మెడిసిన్స్ పరిస్థితి ఎలా ఉంది? (Are medicines expiring?)'
    },
    {
      lang: 'en-IN',
      text: 'What items are expiring soon?',
      label: '🗣️ What items are expiring soon in my fridge?'
    },
    {
      lang: 'en-IN',
      text: 'How much money did we waste this month?',
      label: '🗣️ How much money is at risk of being wasted?'
    }
  ];

  // Answer engine
  const processQuery = (queryText, lang) => {
    const q = queryText.toLowerCase();
    let reply = '';
    let speechReply = '';

    const expiringSoon = products.filter(p => p.status === 'expiring_soon');
    const expired = products.filter(p => p.status === 'expired');
    const medicines = products.filter(p => p.category === 'medicines');
    const wastedCost = expired.reduce((acc, p) => acc + (p.price || 0), 0);

    if (q.includes('repu') || q.includes('tomorrow')) {
      const tomorrowItems = products.filter(p => p.daysRemaining === 1);
      if (tomorrowItems.length > 0) {
        const names = tomorrowItems.map(p => p.name).join(', ');
        reply = `రేపు ఎక్స్‌పైర్ అయ్యే వస్తువులు: ${names}. దయచేసి ఈరోజు రాత్రి లేదా రేపు ఉదయం ఉపయోగించండి.`;
        speechReply = reply;
      } else {
        reply = `రేపు ఏ వస్తువు కూడా ఎక్స్‌పైర్ కావడం లేదు. మీ ఫ్రిజ్ సురక్షితంగా ఉంది! (No items are expiring tomorrow.)`;
        speechReply = reply;
      }
    } else if (q.includes('expired') || q.includes('chupinchu')) {
      if (expired.length > 0) {
        const names = expired.map(p => p.name).join(', ');
        reply = `ఇప్పటికే ఎక్స్‌పైర్ అయిన వస్తువులు: ${names}. వీటిని దయచేసి తినకండి లేదా వాడకండి. సురక్షితంగా పడేయండి.`;
        speechReply = reply;
      } else {
        reply = `మీ ఇంట్లో ఏ వస్తువు కూడా ఎక్స్‌పైర్ కాలేదు. అన్నీ బాగున్నాయి!`;
        speechReply = reply;
      }
    } else if (q.includes('medicine') || q.includes('మందులు')) {
      const expiredMeds = medicines.filter(m => m.status === 'expired');
      if (expiredMeds.length > 0) {
        reply = `హెచ్చరిక: మీ మెడిసిన్ బాక్స్‌లో ${expiredMeds[0].name} ఎక్స్‌పైర్ అయ్యింది. దీనిని ఎట్టి పరిస్థితుల్లోనూ వేసుకోకండి!`;
        speechReply = reply;
      } else {
        reply = `మీ మెడిసిన్ బాక్స్ లోని మందులన్నీ సురక్షితంగా ఉన్నాయి.`;
        speechReply = reply;
      }
    } else if (q.includes('money') || q.includes('waste')) {
      reply = `మీరు సేవ్ చేసిన మొత్తం ₹${products.filter(p => p.status === 'safe').reduce((a, b) => a + (b.price || 0), 0)}. వేస్ట్ అయ్యే ప్రమాదంలో ఉన్న మొత్తం ₹${wastedCost}.`;
      speechReply = reply;
    } else {
      reply = `ప్రస్తుతం ${expiringSoon.length} వస్తువులు త్వరలో ఎక్స్‌పైర్ కానున్నాయి: ${expiringSoon.slice(0, 3).map(p => p.name).join(', ')}.`;
      speechReply = reply;
    }

    setChatMessages(prev => [
      ...prev,
      { sender: 'user', text: queryText },
      { sender: 'assistant', text: reply }
    ]);

    // Speak reply
    onSpeakText(speechReply, lang || selectedLanguage);
  };

  // Browser Speech Recognition Start
  const handleToggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not natively supported in this browser. Please click any of the preset speech buttons below!");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = selectedLanguage;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        setTranscript(spokenText);
        setIsListening(false);
        processQuery(spokenText, selectedLanguage);
      };

      recognition.onerror = (event) => {
        console.warn('Speech error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Recognition start error:', err);
      setIsListening(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-[1400px] mx-auto pb-16">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-400/30 mb-2">
            <Mic className="w-3.5 h-3.5" />
            <span>BILINGUAL SPEECH RECOGNITION (తెలుగు & ENGLISH)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Voice Assistant (తెలుగు / English)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Senior-friendly speech interface. Speak or tap questions in Telugu or English to hear spoken audio answers.
          </p>
        </div>

        {/* Language Picker */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => setSelectedLanguage('te-IN')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedLanguage === 'te-IN'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            తెలుగు (Telugu)
          </button>
          <button
            onClick={() => setSelectedLanguage('en-IN')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedLanguage === 'en-IN'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            English (India)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Large Interactive Mic Station */}
        <div className="lg:col-span-5 bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col items-center text-center justify-between space-y-6">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              VOICE ACTIVATION STATION
            </span>
            <h3 className="text-xl font-black text-white">
              Tap Microphone & Speak
            </h3>
            <p className="text-xs text-slate-400 max-w-xs">
              Supports Telugu queries and Indian English speech recognition with instant voice readout.
            </p>
          </div>

          {/* Big Pulsing Mic Button */}
          <div className="relative my-4">
            {isListening && (
              <span className="absolute -inset-4 rounded-full bg-emerald-400/30 animate-ping pointer-events-none"></span>
            )}
            <button
              onClick={handleToggleListening}
              className={`relative w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all shadow-2xl border-4 ${
                isListening
                  ? 'bg-red-600 border-red-400 text-white shadow-red-600/50 animate-pulse'
                  : 'bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 border-emerald-300/40 text-slate-950 shadow-emerald-500/30 hover:scale-105'
              }`}
            >
              {isListening ? <MicOff className="w-10 h-10 text-white" /> : <Mic className="w-10 h-10 text-slate-950 stroke-[2.5]" />}
              <span className="text-[11px] font-black uppercase mt-1 tracking-wider">
                {isListening ? 'Listening...' : 'Tap to Speak'}
              </span>
            </button>
          </div>

          {/* Preset 1-Click Telugu & English Speech Buttons */}
          <div className="w-full space-y-2 text-left pt-4 border-t border-slate-800">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Tap Sample Question (Click to Ask):
            </span>
            {presetQueries.map((pq, i) => (
              <button
                key={i}
                onClick={() => processQuery(pq.text, pq.lang)}
                className="w-full p-3 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 text-xs font-semibold text-slate-200 text-left transition-colors flex items-center justify-between"
              >
                <span>{pq.label}</span>
                <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Live Conversation Transcript */}
        <div className="lg:col-span-7 bg-slate-900/80 p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between h-[600px]">
          <div>
            <div className="border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                Live Conversation Stream
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800">
                Voice Output: Active
              </span>
            </div>

            {/* Chat Bubble Stream */}
            <div className="space-y-3.5 overflow-y-auto max-h-[460px] pr-2">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-tr-xs shadow-lg font-medium'
                        : 'bg-slate-950 text-emerald-200 rounded-tl-xs border border-slate-800 shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Text Fallback Input */}
          <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Or type here (e.g. repu expire ayyevi cheppu)..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && transcript.trim()) {
                  processQuery(transcript, selectedLanguage);
                  setTranscript('');
                }
              }}
              className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => {
                if (transcript.trim()) {
                  processQuery(transcript, selectedLanguage);
                  setTranscript('');
                }
              }}
              className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black"
            >
              Ask
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
