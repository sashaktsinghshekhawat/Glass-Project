See the below code - our goal is to create a new section on the website just below header. and import this code (a bento ui design) as a component and match it's styling to follow our @design.md

But make sure to not break the layout or make edits that could break the design - its a very complex UI layout design and needs to stay robust

Finally make sure to add some spacing and breathing room for it on the section - in code the height, width and position is a must and stay exact once you import it on our page.

Output: A final section with this Bento-UI inside and updated colors and theme according to our @design.md

Code
###

import React from 'react';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#B5ACA9] flex items-center justify-center p-8 font-sans overflow-hidden">
      
      {/* ======================================= */}
      {/* LAYER 1: BELOW (BENTO GRID DESIGN) */}
      {/* ======================================= */}
      <div className="relative z-10 w-[934px] flex gap-[24px]">
        
        {/* --- LEFT COLUMN: PROFILE CARD --- */}
        <div id="profile-card" className="w-[400px] h-[600px] mt-[48px] bg-[#252322] rounded-[36px] p-8 flex flex-col shadow-2xl flex-shrink-0">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop" 
                alt="Endy Rasmussen" 
                className="w-[52px] h-[52px] rounded-full object-cover border border-[#403C3A]"
              />
              <div>
                <h2 className="text-[#F4F4F4] font-semibold text-[19px] leading-tight tracking-tight">Endy Rasmussen</h2>
                <p className="text-[#8B8683] text-[13px] mt-0.5">ID QZW2398</p>
              </div>
            </div>
            <button className="w-10 h-10 bg-[#FE5A35] rounded-full flex items-center justify-center hover:bg-[#FF451A] transition-colors shadow-lg shadow-[#FE5A35]/20 flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
            </button>
          </div>

          <div className="w-full h-[1px] bg-[#363332] mb-7"></div>

          {/* Details Table */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex justify-between text-[13px]">
              <span className="text-[#8B8683]">Acq.date and time</span>
              <span className="text-[#E8E6E5] font-medium">9 Nov, 2024 08:25:40 AM</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[#8B8683]">Sex and age</span>
              <span className="text-[#E8E6E5] font-medium">Female, 56</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[#8B8683]">Exp.Index</span>
              <span className="text-[#E8E6E5] font-medium">294</span>
            </div>
          </div>

          {/* Add Scan Section */}
          <div className="bg-[#2E2C2B] rounded-[24px] p-4 mb-6">
            <h3 className="text-[#F4F4F4] font-semibold text-[15px] mb-3">Add scan</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-[52px] h-[52px] bg-[#1A1817] rounded-xl overflow-hidden flex-shrink-0 relative">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-60 mix-blend-screen"></div>
              </div>
              <p className="text-[#A49F9D] text-[12px] leading-[1.4]">
                Case 1 – normal<br/>clavicle AP 20°<br/>cephalic
              </p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[#8B8683] text-[12px]">Workspace</span>
              <div className="bg-[#1A1817] text-[#E8E6E5] text-[11px] font-medium px-3 py-1.5 rounded-full flex items-center gap-2 cursor-pointer border border-[#3A3735]">
                Johnson 08C6
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          {/* Documents Row */}
          <div className="flex gap-4 mt-auto">
            <div className="flex-1 bg-[#2E2C2B] rounded-[24px] p-4 flex flex-col items-center justify-end h-[100px] relative overflow-hidden group cursor-pointer border border-white/5">
               <div className="w-14 h-10 bg-white rounded-t-md absolute bottom-8 left-1/2 -translate-x-1/2 p-2 shadow-sm flex flex-col gap-1">
                 <div className="w-full h-[2px] bg-[#D0D0D0] rounded-full"></div>
                 <div className="w-3/4 h-[2px] bg-[#D0D0D0] rounded-full"></div>
                 <div className="w-1/2 h-[2px] bg-[#D0D0D0] rounded-full"></div>
               </div>
               <div className="w-full h-12 bg-gradient-to-t from-[#2E2C2B] via-[#2E2C2B]/80 to-transparent absolute bottom-0 z-10"></div>
               <span className="text-[#E8E6E5] text-[12px] font-semibold relative z-20 mt-auto">Report .pdf</span>
            </div>
            <div className="flex-1 bg-[#2E2C2B] rounded-[24px] p-4 flex flex-col items-center justify-end h-[100px] relative overflow-hidden group cursor-pointer border border-white/5">
               <div className="w-14 h-10 bg-white rounded-t-md absolute bottom-8 left-1/2 -translate-x-1/2 p-2 shadow-sm flex flex-col gap-1">
                 <div className="w-full h-[2px] bg-[#D0D0D0] rounded-full"></div>
                 <div className="w-full h-[2px] bg-[#D0D0D0] rounded-full"></div>
                 <div className="w-2/3 h-[2px] bg-[#D0D0D0] rounded-full"></div>
               </div>
               <div className="w-full h-12 bg-gradient-to-t from-[#2E2C2B] via-[#2E2C2B]/80 to-transparent absolute bottom-0 z-10"></div>
               <span className="text-[#E8E6E5] text-[12px] font-semibold relative z-20 mt-auto">Bill .pdf</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT AREA WRAPPER --- */}
        <div className="w-[510px] flex flex-col gap-[24px]">
          
          {/* Top Row */}
          <div className="flex gap-[24px]">
            
            {/* AILab Card */}
            <div id="ailab-card" className="w-[266px] h-[356px] mt-[48px] bg-[#252322] rounded-[36px] p-7 relative overflow-hidden shadow-2xl flex-shrink-0">
              <div className="flex justify-between items-start z-20 relative">
                <div className="flex items-center gap-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="5" cy="5" r="4" fill="#FFF"/>
                    <circle cx="19" cy="5" r="4" fill="#8B8683"/>
                    <circle cx="5" cy="19" r="4" fill="#8B8683"/>
                    <circle cx="19" cy="19" r="4" fill="#FFF"/>
                  </svg>
                  <span className="text-[#F4F4F4] font-semibold text-[17px] tracking-tight">AILab</span>
                </div>
                <span className="text-[#FE5A35] text-[11px] font-semibold">99.58 px</span>
              </div>
              
              {/* X-Ray Image Background */}
              <div className="absolute inset-0 top-12 flex items-center justify-center opacity-70 pointer-events-none">
                  <div className="w-[120%] h-[120%] bg-[url('https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-screen opacity-50 transform -rotate-12"></div>
              </div>
              
              {/* Overlay Graphic Overlay */}
              <svg className="absolute inset-0 w-full h-full z-10" pointerEvents="none">
                 <circle cx="55%" cy="50%" r="45" stroke="#FE5A35" strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity="0.8"/>
                 <line x1="55%" y1="50%" x2="40%" y2="90%" stroke="#FE5A35" strokeWidth="1.5" opacity="0.8"/>
                 <line x1="55%" y1="50%" x2="15%" y2="55%" stroke="#FE5A35" strokeWidth="1.5" opacity="0.8"/>
                 <circle cx="55%" cy="50%" r="3.5" fill="#FE5A35"/>
                 <circle cx="40%" cy="90%" r="3.5" fill="#FE5A35"/>
                 <circle cx="15%" cy="55%" r="3.5" fill="#FE5A35"/>
                 <path d="M 45% 75% A 40 40 0 0 1 35% 53%" fill="none" stroke="#FE5A35" strokeWidth="1.5" opacity="0.8"/>
              </svg>
            </div>

            {/* Controls & DICOM Stack */}
            <div className="w-[220px] flex flex-col gap-[24px] flex-shrink-0">
              
              {/* Controls Card */}
              <div id="controls-card" className="h-[160px] bg-[#252322] rounded-[32px] p-5 shadow-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8E6E5" strokeWidth="2.5" strokeLinejoin="round">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                      <path d="M12 2.69v17.31a8 8 0 0 0 8-8c0-2.12-.83-4.16-2.34-5.66z" fill="#E8E6E5" fillOpacity="0.3"/>
                    </svg>
                    <span className="text-[#F4F4F4] text-[13px] font-medium">Invert</span>
                  </div>
                  <div className="w-[36px] h-[20px] bg-[#FE5A35] rounded-full p-[2px] cursor-pointer flex justify-end">
                    <div className="w-[16px] h-[16px] bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8E6E5" strokeWidth="2.5" strokeLinejoin="round">
                      <path d="M4 4h16c-.5 5-4 7-8 8 4 1 7.5 3 8 8H4c.5-5 4-7 8-8-4-1-7.5-3-8-8z"/>
                    </svg>
                    <span className="text-[#F4F4F4] text-[13px] font-medium">Flip</span>
                  </div>
                  <div className="w-[36px] h-[20px] bg-[#3A3735] rounded-full p-[2px] cursor-pointer flex justify-start">
                    <div className="w-[16px] h-[16px] bg-[#8B8683] rounded-full shadow-sm"></div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-1 mt-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E8E6E5" strokeWidth="2.5">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span className="text-[#F4F4F4] text-[13px] font-medium">Area</span>
                </div>
                
                <div className="px-1 mt-1">
                  <div className="relative w-full h-[3px] bg-[#3A3735] rounded-full mb-2">
                    <div className="absolute top-0 left-0 h-full w-[65%] bg-[#FE5A35] rounded-full"></div>
                    <div className="absolute top-1/2 left-[65%] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full border-[3px] border-[#FE5A35] shadow-md"></div>
                  </div>
                  <div className="flex justify-between text-[#8B8683] text-[8px] uppercase font-bold tracking-widest mt-2">
                    <span>Low</span>
                    <span>Mod</span>
                    <span>High</span>
                  </div>
                </div>
              </div>

              {/* DICOM Card */}
              <div id="dicom-card" className="h-[220px] bg-[#FFFFFF] rounded-[32px] p-5 shadow-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="w-[32px] h-[32px] bg-[#FE5A35] rounded-[8px] flex items-center justify-center shadow-md shadow-[#FE5A35]/20 flex-shrink-0">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><rect width="16" height="16" x="4" y="4" rx="3"/><circle cx="12" cy="12" r="2"/></svg>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-[12px] font-bold text-[#252322] leading-tight">Dr. Johnson</p>
                      <p className="text-[#8B8683] text-[9px] font-medium">Radiologist</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&auto=format&fit=crop" className="w-[28px] h-[28px] rounded-full object-cover flex-shrink-0" alt="Dr."/>
                  </div>
                </div>
                
                <h3 className="font-bold text-[16px] text-[#252322] leading-[1.1] w-[90%] mt-2 mb-2">Added DICOM<br/>images</h3>
                
                <div className="flex gap-2 h-[64px]">
                  <div className="flex-1 bg-[#252322] rounded-[12px] overflow-hidden relative shadow-inner">
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-screen opacity-80"></div>
                  </div>
                  <div className="flex-1 bg-[#252322] rounded-[12px] overflow-hidden relative shadow-inner">
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559757175-9b22e1bafcb9?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-screen opacity-80"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Row: Chest Card */}
          <div id="chest-card" className="h-[220px] bg-[#252322] rounded-[36px] p-7 shadow-2xl flex justify-between relative overflow-hidden">
             <div className="flex flex-col justify-between max-w-[200px] relative z-10">
                <div>
                  <h3 className="text-[#F4F4F4] text-[18px] font-semibold tracking-tight">Chest</h3>
                  <p className="text-[#8B8683] text-[13px] mb-3 mt-1">ADAMRAS-002</p>
                  <p className="text-[#A49F9D] text-[12px] leading-relaxed pr-2">
                    No significant lung field abnormality detected. No blunting in CP angles is seen.
                  </p>
                </div>
                <p className="text-[#FE5A35] text-[12px] font-bold tracking-wider mt-4">W:256 L: 128</p>
             </div>
             
             <div className="w-[224px] h-full bg-[#1A1817] rounded-[24px] relative overflow-hidden flex items-center justify-center border border-white/5 flex-shrink-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559757175-9b22e1bafcb9?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-screen opacity-80"></div>
                
                {/* On-image Controls Overlay */}
                <div className="absolute top-3 right-3 w-[26px] h-[26px] rounded-full border border-[#FE5A35] flex items-center justify-center bg-black/20 backdrop-blur-sm">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FE5A35" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                
                <div className="absolute bottom-3 flex gap-4 opacity-50 bg-black/30 px-4 py-2 rounded-full backdrop-blur-md">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 12H3M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4"/></svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* ======================================= */}
      {/* LAYER 2: ABOVE (GLASS ON-TOP POPUP) */}
      {/* ======================================= */}
      <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
        
        {/* Glassmorphism Card */}
        <div id="popup-card" className="w-[464px] h-[260px] bg-gradient-to-br from-white/50 via-white/20 to-white/5 backdrop-blur-[48px] border-[1.5px] border-white/40 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] rounded-[40px] p-8 flex flex-row justify-between relative pointer-events-auto overflow-hidden">
           
           {/* Left Section (Text & Icon) */}
           <div className="flex flex-col justify-between w-[55%]">
             <h2 className="text-[#252322] text-[24px] font-semibold leading-[1.15] tracking-tight w-full">
               AI cuts ER wait:<br />1h10 saved on visits
             </h2>

             {/* Bottom Left Icon Group */}
             <div className="flex items-center gap-2">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="6" r="4" fill="#4B4847"/>
                  <circle cx="6" cy="16" r="4" fill="#4B4847"/>
                  <circle cx="18" cy="16" r="4" fill="#4B4847"/>
               </svg>
               <span className="text-[#4B4847] text-[12px] font-bold">X-ray analysis</span>
             </div>
           </div>

           {/* Right Section (Bar Chart) */}
           <div className="flex items-end gap-5 h-full pb-2 pr-2">
              {/* Bar 1 (With AI) */}
              <div className="flex flex-col items-center gap-2">
                 <span className="text-[#7D7977] text-[11px] font-bold tracking-wide">3h35</span>
                 <div className="w-[48px] h-[80px] border-[2px] border-dashed border-[#A59F9C] bg-white/40 rounded-[12px]"></div>
                 <span className="text-[#A09A98] text-[9px] uppercase font-bold tracking-widest mt-1">With AI</span>
              </div>
              
              {/* Bar 2 (Without AI) */}
              <div className="flex flex-col items-center gap-2">
                 <span className="text-[#252322] text-[11px] font-bold tracking-wide">4h45</span>
                 <div className="w-[48px] h-[130px] bg-[#FE5A35] rounded-[12px] shadow-[0_12px_24px_-6px_rgba(254,90,53,0.5)]"></div>
                 <span className="text-[#A09A98] text-[9px] uppercase font-bold tracking-widest mt-1">Without AI</span>
              </div>
           </div>

        </div>
      </div>
      
    </div>
  );
}