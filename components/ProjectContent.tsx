
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ViewType } from '../types';
import { 
  History, 
  Cpu, 
  Smartphone, 
  Layers,
  ShieldCheck,
  Zap,
  Database,
  Printer,
  Globe,
  Bot,
  Cloud,
  Brain,
  Activity,
  Waves,
  Eye
} from 'lucide-react';

interface ProjectContentProps {
  view: ViewType;
}

const ProjectContent: React.FC<ProjectContentProps> = ({ view }) => {
  const renderHistory = () => (
    <div className="max-w-4xl mx-auto p-12 font-serif animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-5xl font-bold text-white mb-12 border-b border-gray-800 pb-4">The Industrial Revolution History</h2>
      <div className="space-y-12">
        {[
          { num: "1st", period: "Late 18th Century", title: "Mechanization", desc: "Introduction of steam engines and coal. Transition from manual labor to machine-based manufacturing.", icon: <Zap className="w-6 h-6" /> },
          { num: "2nd", period: "Late 19th Century", title: "Mass Production", desc: "Introduction of electricity and assembly lines. Rise of telecommunication and mass manufacturing.", icon: <Zap className="w-6 h-6" /> },
          { num: "3rd", period: "Mid‑20th Century", title: "Digital Revolution", desc: "The rise of computers, electronics, and early automation. Transition to digital technology.", icon: <Cpu className="w-6 h-6" /> },
          { num: "4th", period: "21st Century", title: "Cyber-Physical Systems", desc: "Integration of IoT, AI, and smart automation. Merging of physical and digital spheres through real-time data.", icon: <Globe className="w-6 h-6" /> }
        ].map((ir, i) => (
          <div key={i} className="flex gap-8 group">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold shrink-0 group-hover:scale-110 transition-transform">
                {ir.num}
              </div>
              {i < 3 && <div className="w-0.5 h-full bg-gray-800 my-2" />}
            </div>
            <div className="pt-1">
              <span className="text-indigo-400 font-bold tracking-widest text-sm uppercase">{ir.period}</span>
              <h3 className="text-2xl font-bold text-white mb-2">{ir.title}</h3>
              <p className="text-gray-400 leading-relaxed text-lg">{ir.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderComponents = () => {
    const components = [
      { name: "Cybersecurity", desc: "Protects digital assets and data from cyber threats.", icon: <ShieldCheck /> },
      { name: "Internet of Things", desc: "Connects devices and sensors to share data in real time.", icon: <Zap /> },
      { name: "Big Data", desc: "Collects and analyzes massive datasets for insights.", icon: <Database /> },
      { name: "Augmented Reality", desc: "Enhances physical environments with digital overlays.", icon: <Smartphone /> },
      { name: "Additive Manufacturing", desc: "3D printing for customized, on‑demand production.", icon: <Printer /> },
      { name: "Simulation", desc: "Virtual models to test processes before implementation.", icon: <Layers /> },
      { name: "System Integration", desc: "Ensures seamless communication between systems.", icon: <History /> },
      { name: "Autonomous Robots", desc: "Self‑operating machines for minimal human input.", icon: <Bot /> },
      { name: "Cloud Computing", desc: "Provides scalable storage and power via the internet.", icon: <Cloud /> }
    ];

    return (
      <div className="max-w-6xl mx-auto p-12 animate-in fade-in duration-700">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">9 Pillars of IR 4.0</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Foundational components enabling the digitalization of every company part.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {components.map((c, i) => (
            <div key={i} className="bg-gray-900/40 border border-gray-800 p-8 rounded-2xl hover:border-indigo-500 transition-colors group">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                {c.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{c.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderARFocus = () => (
    <div className="max-w-4xl mx-auto p-12 font-serif animate-in zoom-in-95 duration-500">
      <div className="bg-indigo-600 rounded-3xl p-12 text-white mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <Smartphone className="w-48 h-48 rotate-12" />
        </div>
        <h2 className="text-5xl font-bold mb-4">Augmented Reality (AR)</h2>
        <p className="text-xl text-indigo-100 italic">"The Ultimate Visualization Tool for the 21st Century"</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-indigo-500 pl-4">Definition</h3>
          <p className="text-gray-400 leading-relaxed text-lg">
            AR technology overlays digital content directly into the user's field of view, bridging the gap between imagination and reality without losing connection to the physical world.
          </p>
          
          <h3 className="text-2xl font-bold text-white mt-8 mb-4 border-l-4 border-indigo-500 pl-4">Key Real Estate Benefits</h3>
          <ul className="space-y-3 text-gray-400 text-lg">
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" /> Reduced Decision Time: Instant visual validation.</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" /> Enhanced Engagement: Interactive "walkthroughs".</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" /> Zero Waste: No physical materials for prototypes.</li>
          </ul>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center"><Activity className="text-white" /></div>
            <h3 className="text-2xl font-bold text-white">Market Impact</h3>
          </div>
          <p className="text-gray-400 mb-6 italic text-sm">"Developers using AR report a 45% increase in lead conversion from remote buyers."</p>
          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[75%]" />
          </div>
          <span className="text-[10px] text-gray-500 mt-2 text-right uppercase tracking-widest">Adoption Rate Growth</span>
        </div>
      </div>
    </div>
  );

  const renderRealEstate = () => (
    <div className="max-w-4xl mx-auto p-12 animate-in fade-in duration-700">
      <h2 className="text-4xl font-bold text-white mb-12 text-center uppercase tracking-widest font-serif">Industry Diagnostics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 border border-gray-800 rounded-2xl bg-gray-900/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">Traditional Constraints</h3>
          <ul className="space-y-4">
            {['Costly Physical Show-Units', 'Static Marketing Material', 'Geographic Viewpoint Bias'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-red-400/80 text-sm">
                <X className="w-4 h-4" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-8 border border-indigo-500/30 rounded-2xl bg-indigo-500/5 shadow-2xl shadow-indigo-500/10">
          <h3 className="text-xl font-bold text-indigo-400 mb-6 flex items-center gap-2">IR 4.0 Transformation</h3>
          <ul className="space-y-4">
            {['Infinite Digital Variants', 'Global Accessibility 24/7', 'Biometric Performance Tracking'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-indigo-300 text-sm">
                <Check className="w-4 h-4" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderInvention = () => (
    <div className="max-w-5xl mx-auto p-12 animate-in slide-in-from-top-12 duration-1000">
      <div className="text-center mb-16">
        <span className="text-indigo-500 font-bold uppercase tracking-[0.3em] text-sm">World-First Innovation</span>
        <h2 className="text-6xl font-bold text-white mt-4 mb-6 leading-tight">The Neuro-Generative <br/>Spatial Atelier</h2>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto italic font-serif">"A property that doesn't just exist—it responds to your subconscious."</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: "Neural-Sync", 
            icon: <Brain className="w-10 h-10" />, 
            desc: "Wearable EEG sensors track the user's emotional peaks while viewing the AR layout. The AI auto-refines the design to match subconscious 'Comfort Zones'." 
          },
          { 
            title: "Haptic Air-Walls", 
            icon: <Waves className="w-10 h-10" />, 
            desc: "Uses IoT ultrasonic vortex arrays to create air pressure points in the empty warehouse, giving the AR-rendered walls a 'solid' physical feel." 
          },
          { 
            title: "Quantum Living-Twin", 
            icon: <Activity className="w-10 h-10" />, 
            desc: "Big Data predictive analytics simulates 50 years of weather, urban development, and light patterns on the property in 5 seconds." 
          }
        ].map((item, i) => (
          <div key={i} className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 p-8 rounded-[2rem] hover:border-indigo-500/50 transition-all group">
            <div className="text-indigo-400 mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-serif">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 p-12 bg-indigo-600 rounded-[3rem] text-center shadow-2xl shadow-indigo-600/30">
        <h4 className="text-white text-3xl font-bold mb-4 italic">Advancing from IR 4.0 to IR 5.0</h4>
        <p className="text-indigo-100 max-w-3xl mx-auto">NGSA represents the transition from machine automation to human-centric synergy, where technology adapts to the biological and psychological state of the user.</p>
      </div>
    </div>
  );

  const renderProposal = () => (
    <div className="max-w-5xl mx-auto p-12 animate-in fade-in duration-700 font-serif">
      <div className="flex justify-between items-end mb-12 border-b border-gray-800 pb-8">
        <div>
          <h2 className="text-4xl font-bold text-white uppercase tracking-tight">The Virtual Show Gallery</h2>
          <p className="text-indigo-400 font-bold">Project Implementation Framework</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-gray-500 block uppercase">Status</span>
          <span className="text-green-500 font-bold">READY FOR DEPLOYMENT</span>
        </div>
      </div>

      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="text-indigo-400 font-bold text-xs uppercase tracking-widest">01 / Physical Layer</div>
            <h4 className="text-xl font-bold text-white">The Canvas</h4>
            <p className="text-gray-400 text-sm">Repurposed 10,000 sq ft warehouse equipped with high-density IoT motion sensors and AR anchors.</p>
          </div>
          <div className="space-y-4">
            <div className="text-indigo-400 font-bold text-xs uppercase tracking-widest">02 / Digital Layer</div>
            <h4 className="text-xl font-bold text-white">The Brain</h4>
            <p className="text-gray-400 text-sm">Generative AI Engine hosted on a Distributed Cloud, processing 4K real-time AR streams and haptic feedback loops.</p>
          </div>
          <div className="space-y-4">
            <div className="text-indigo-400 font-bold text-xs uppercase tracking-widest">03 / Interaction Layer</div>
            <h4 className="text-xl font-bold text-white">The Experience</h4>
            <p className="text-gray-400 text-sm">Lightweight AR Visors with integrated EEG pads. Agents control the environment via voice-activated IoT interfaces.</p>
          </div>
        </div>

        <div className="bg-gray-900/50 p-12 rounded-3xl border border-gray-800">
          <h4 className="text-2xl font-bold text-white mb-8 text-center">Implementation Timeline</h4>
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-800 z-0" />
            {['Site Audit', 'System Sync', 'Live Pilot'].map((step, i) => (
              <div key={i} className="relative z-10 bg-black px-4 flex flex-col items-center">
                <div className="w-4 h-4 bg-indigo-600 rounded-full mb-2" />
                <span className="text-xs text-white font-bold">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const X = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
  const Check = ({ className }: { className?: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;

  switch (view) {
    case ViewType.HISTORY: return renderHistory();
    case ViewType.COMPONENTS: return renderComponents();
    case ViewType.AR_FOCUS: return renderARFocus();
    case ViewType.REAL_ESTATE: return renderRealEstate();
    case ViewType.INVENTION: return renderInvention();
    case ViewType.PROPOSAL: return renderProposal();
    default: return null;
  }
};

export default ProjectContent;
