/* ---------------------------------------------------------
   PDF Solutions — tool registry + app logic
--------------------------------------------------------- */

const ICONS = {
  page: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 2h9l4 4v16H6V2Z"/><path d="M15 2v4h4"/></svg>`,
  merge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3h6l3 3v6H6V3Z"/><path d="M9 12h9v9H9z"/></svg>`,
  split: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12h16M4 12l4-4M4 12l4 4M20 12l-4-4M20 12l-4 4"/></svg>`,
  rotate: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12a8 8 0 1 1 3 6.3"/><path d="M4 18v-5h5"/></svg>`,
  organize: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/></svg>`,
  hash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 9h14M5 15h14M9 3 7 21M17 3l-2 18"/></svg>`,
  crop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 2v16h16M18 22V6H2"/></svg>`,
  convert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 7h13M17 7l-4-4M17 7l-4 4M20 17H7M7 17l4 4M7 17l4-4"/></svg>`,
  image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="1.5"/><circle cx="9" cy="10" r="2"/><path d="M3 17l5-5 4 4 3-3 6 6"/></svg>`,
  compress: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 4v4H5M15 4v4h4M9 20v-4H5M15 20v-4h4"/></svg>`,
  repair: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 7l3 3-9 9-4 1 1-4 9-9Z"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20l4-1 11-11-3-3L5 16l-1 4Z"/></svg>`,
  sign: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 17c3-1 4-4 6-4s2 3 4 3 3-4 6-2M4 21h16"/></svg>`,
  watermark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 2h9l4 4v16H6V2Z"/><path d="M9 15l6-6M9 9l6 6" opacity=".6"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/></svg>`,
  unlock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/></svg>`,
  redact: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="8" width="18" height="8" rx="1"/><path d="M6 8v8M11 8v8M16 8v8" opacity=".5"/></svg>`,
  ocr: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 7V4h3M20 7V4h-3M4 17v3h3M20 17v3h-3"/><path d="M8 12h8" /></svg>`,
  compare: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 3v18M16 3v18"/><path d="M4 8h4M4 16h4M16 8h4M16 16h4"/></svg>`,
  ai: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/><circle cx="12" cy="12" r="3"/></svg>`,
  translate: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 5h9M7 3v2M4 8c1 3 3 5 6 6M10 8c-1 2.5-4 5.5-8 7"/><path d="M14 21l4-9 4 9M15.3 18h5.4"/></svg>`,
  workflow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="5" cy="6" r="2.2"/><circle cx="19" cy="6" r="2.2"/><circle cx="12" cy="18" r="2.2"/><path d="M6.8 7.6 10.5 16M17.2 7.6 13.5 16"/></svg>`
};

// type: "ready" tools have real client-side implementations. "soon" tools show an honest placeholder.
const TOOLS = [
  // ORGANIZE
  {id:"merge", cat:"organize", name:"Merge PDF", desc:"Kayi PDF files ko jodkar ek file banayein.", icon:"merge", type:"ready"},
  {id:"split", cat:"organize", name:"Split PDF", desc:"Ek PDF ke pages ko alag-alag files mein todein.", icon:"split", type:"ready"},
  {id:"rotate", cat:"organize", name:"Rotate PDF", desc:"Pages ko horizontal ya vertical ghumayein.", icon:"rotate", type:"ready"},
  {id:"organize", cat:"organize", name:"Organize PDF", desc:"Pages hataayein ya unka order badlein.", icon:"organize", type:"ready"},
  {id:"page-numbers", cat:"organize", name:"Page Numbers", desc:"Har page par number dalein, position choose karein.", icon:"hash", type:"ready"},
  {id:"crop", cat:"organize", name:"Crop PDF", desc:"PDF ke margins kaatein ya khaas hissa select karein.", icon:"crop", type:"ready"},

  // CONVERT
  {id:"pdf-to-word", cat:"convert", name:"PDF to Word", desc:"PDF ko editable Word document banayein.", icon:"convert", type:"soon"},
  {id:"pdf-to-ppt", cat:"convert", name:"PDF to PowerPoint", desc:"PDF se slideshow banayein.", icon:"convert", type:"soon"},
  {id:"pdf-to-excel", cat:"convert", name:"PDF to Excel", desc:"PDF ka data spreadsheet mein nikaalein.", icon:"convert", type:"soon"},
  {id:"word-to-pdf", cat:"convert", name:"Word to PDF", desc:"Word file ko PDF mein badlein.", icon:"convert", type:"soon"},
  {id:"ppt-to-pdf", cat:"convert", name:"PowerPoint to PDF", desc:"PPT file ko PDF banayein.", icon:"convert", type:"soon"},
  {id:"excel-to-pdf", cat:"convert", name:"Excel to PDF", desc:"Excel sheet ko PDF mein badlein.", icon:"convert", type:"soon"},
  {id:"pdf-to-jpg", cat:"convert", name:"PDF to JPG", desc:"Har page ko image mein badlein.", icon:"image", type:"ready"},
  {id:"jpg-to-pdf", cat:"convert", name:"JPG to PDF", desc:"Photos ko ek PDF file mein badlein.", icon:"image", type:"ready"},
  {id:"html-to-pdf", cat:"convert", name:"HTML to PDF", desc:"Kisi website link ko PDF banayein.", icon:"convert", type:"soon"},
  {id:"pdf-to-pdfa", cat:"convert", name:"PDF to PDF/A", desc:"Archive-ready standard format mein badlein.", icon:"convert", type:"soon"},
  {id:"scan-to-pdf", cat:"convert", name:"Scan to PDF", desc:"Mobile se scan karke seedha PDF banayein.", icon:"convert", type:"soon"},

  // OPTIMIZE
  {id:"compress", cat:"optimize", name:"Compress PDF", desc:"File ka size chhota karein.", icon:"compress", type:"ready"},
  {id:"repair", cat:"optimize", name:"Repair PDF", desc:"Kharaab ya corrupt PDF ko theek karein.", icon:"repair", type:"soon"},

  // EDIT
  {id:"edit", cat:"edit", name:"Edit PDF", desc:"Text likhein, image lagayein ya draw karein.", icon:"edit", type:"soon"},
  {id:"sign", cat:"edit", name:"Sign PDF", desc:"Digital signature karein ya mangwayein.", icon:"sign", type:"soon"},
  {id:"watermark", cat:"edit", name:"Watermark", desc:"Apna naam ya logo stamp lagayein.", icon:"watermark", type:"ready"},

  // SECURITY
  {id:"unlock", cat:"security", name:"Unlock PDF", desc:"Password-protected PDF ka lock hatayein.", icon:"unlock", type:"soon"},
  {id:"protect", cat:"security", name:"Protect PDF", desc:"PDF par password lagayein.", icon:"lock", type:"soon"},
  {id:"redact", cat:"security", name:"Redact PDF", desc:"Sensitive jaankari hamesha ke liye mitayein.", icon:"redact", type:"soon"},

  // INTELLIGENCE
  {id:"ocr", cat:"intelligence", name:"OCR PDF", desc:"Scanned PDF ko searchable banayein.", icon:"ocr", type:"soon"},
  {id:"compare", cat:"intelligence", name:"Compare PDF", desc:"Do PDF files ka antar check karein.", icon:"compare", type:"soon"},
  {id:"ai-summarizer", cat:"intelligence", name:"AI Summarizer", desc:"Badi PDF ka nichod nikaalein.", icon:"ai", type:"soon"},
  {id:"translate", cat:"intelligence", name:"Translate PDF", desc:"Formatting waisi rakhein, bhasha badlein.", icon:"translate", type:"soon"},

  // WORKFLOWS
  {id:"create-workflow", cat:"workflows", name:"Create a Workflow", desc:"Apne pasandida tools ko jodkar auto-process banayein.", icon:"workflow", type:"soon"},
];

const CATEGORIES = [
  {id:"organize", title:"Organize PDF", desc:"PDF ko vyavasthit karne ke liye."},
  {id:"convert", title:"Convert PDF", desc:"Format badalne ke liye."},
  {id:"optimize", title:"Optimize PDF", desc:"File behtar banane ke liye."},
  {id:"edit", title:"Edit PDF", desc:"Badlav karne ke liye."},
  {id:"security", title:"PDF Security", desc:"Suraksha ke liye."},
  {id:"intelligence", title:"PDF Intelligence", desc:"AI aur advance tools."},
  {id:"workflows", title:"Workflows", desc:"Kaam ko aasaan banane ke liye."},
];

/* ---------------- Render tool grid ---------------- */
function renderCategories(){
  const root = document.getElementById("categories");
  root.innerHTML = CATEGORIES.map(cat=>{
    const tools = TOOLS.filter(t=>t.cat===cat.id);
    const cards = tools.map((t,idx)=>`
      <div class="card reveal ${t.type==='soon'?'soon':''}" data-name="${t.name.toLowerCase()}" data-id="${t.id}" style="animation-delay:${Math.min(idx*40,240)}ms">
        <div class="fold-corner"></div>
        <div class="icon">${ICONS[t.icon]}</div>
        <h4>${t.name}</h4>
        <p>${t.desc}</p>
        <span class="${t.type==='ready'?'tag-ready':'tag-soon'}">${t.type==='ready'?'Ready · browser mein chalta hai':'Coming soon'}</span>
      </div>
    `).join("");
    return `
      <section class="category" id="${cat.id}">
        <div class="category-inner">
          <div class="cat-head"><h2>${cat.title}</h2><span class="count">${tools.length} tools</span></div>
          <p class="cat-desc">${cat.desc}</p>
          <div class="grid">${cards}</div>
        </div>
      </section>
    `;
  }).join("");

  root.querySelectorAll(".card").forEach(card=>{
    card.addEventListener("click", ()=> openModal(card.dataset.id));
  });
}
renderCategories();

/* ---------------- Search filter ---------------- */
document.getElementById("searchInput").addEventListener("input", e=>{
  const q = e.target.value.trim().toLowerCase();
  document.querySelectorAll(".card").forEach(card=>{
    const match = card.dataset.name.includes(q);
    card.classList.toggle("hidden", q.length>0 && !match);
  });
  document.querySelectorAll(".category").forEach(sec=>{
    const anyVisible = [...sec.querySelectorAll(".card")].some(c=>!c.classList.contains("hidden"));
    sec.style.display = anyVisible ? "" : "none";
  });
});

/* ---------------- Modal system ---------------- */
const overlay = document.getElementById("overlay");
const modalBody = document.getElementById("modalBody");

function openModal(id){
  const tool = TOOLS.find(t=>t.id===id);
  if(!tool) return;
  modalBody.innerHTML = buildModalContent(tool);
  overlay.classList.add("open");
  wireModal(tool);
}
function closeModal(){
  overlay.classList.remove("open");
  modalBody.innerHTML = "";
}
overlay.addEventListener("click", e=>{ if(e.target===overlay) closeModal(); });
document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeModal(); });

function buildModalContent(tool){
  const closeBtn = `<button class="close" onclick="closeModal()">✕</button>`;
  const head = `${closeBtn}<div class="modal-eyebrow">${tool.type==='ready' ? 'Client-side tool' : 'Jald aa raha hai'}</div><h3>${tool.name}</h3><p class="desc">${tool.desc}</p>`;

  if(tool.type==="soon"){
    return `${head}
      <div class="soon-box">
        <b>${tool.name}</b> ke liye AI ya server-side processing chahiye (jaise format conversion engine ya OCR/translation API), isliye ye tool abhi seedha browser mein possible nahi hai.
        <br><br>Hum jaldi hi backend integration ke saath ye feature add karenge. Tab tak "Organize" aur "Convert" section ke ready tools try karein — vo abhi seedha yahin kaam karte hain.
      </div>`;
  }

  // Ready tools — build specific UI per id
  const dropZone = (accept, multiple, label) => `
    <div class="drop" id="dropZone">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v12M7 8l5-5 5 5"/><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/></svg>
      <p>${label}</p>
      <input type="file" id="fileInput" accept="${accept}" ${multiple?'multiple':''}>
    </div>
    <ul class="file-list" id="fileList"></ul>`;

  switch(tool.id){
    case "merge":
      return `${head}${dropZone(".pdf",true,"Do ya zyada PDF files yahan drop karein ya click karke chunein")}
        <div class="action-row"><button class="btn btn-primary" id="runBtn">Merge karke download karein</button></div>
        <div class="status" id="status"></div>`;

    case "split":
      return `${head}${dropZone(".pdf",false,"Ek PDF file chunein jise split karna hai")}
        <div class="action-row"><button class="btn btn-primary" id="runBtn">Har page alag karke download karein (ZIP)</button></div>
        <div class="status" id="status"></div>`;

    case "rotate":
      return `${head}${dropZone(".pdf",false,"Rotate karne ke liye PDF file chunein")}
        <div class="field"><label>Angle</label>
          <select id="angleSelect"><option value="90">90° (clockwise)</option><option value="180">180°</option><option value="270">270°</option></select>
        </div>
        <div class="action-row"><button class="btn btn-primary" id="runBtn">Rotate karke download karein</button></div>
        <div class="status" id="status"></div>`;

    case "organize":
      return `${head}${dropZone(".pdf",false,"Organize karne ke liye PDF file chunein")}
        <div class="thumbs" id="thumbs"></div>
        <div class="action-row"><button class="btn btn-primary" id="runBtn" style="display:none">Save karke download karein</button></div>
        <div class="status" id="status"></div>`;

    case "page-numbers":
      return `${head}${dropZone(".pdf",false,"PDF file chunein")}
        <div class="field row">
          <div><label>Position</label>
            <select id="posSelect"><option value="bottom-center">Bottom Center</option><option value="bottom-right">Bottom Right</option><option value="bottom-left">Bottom Left</option></select>
          </div>
          <div><label>Start number</label><input type="number" id="startNum" value="1" min="1"></div>
        </div>
        <div class="action-row"><button class="btn btn-primary" id="runBtn">Page numbers dalke download karein</button></div>
        <div class="status" id="status"></div>`;

    case "crop":
      return `${head}${dropZone(".pdf",false,"Crop karne ke liye PDF file chunein")}
        <div class="field"><label>Margin kaatein (points, ~72 = 1 inch)</label>
          <input type="number" id="marginInput" value="36" min="0"></div>
        <div class="action-row"><button class="btn btn-primary" id="runBtn">Crop karke download karein</button></div>
        <div class="status" id="status"></div>`;

    case "pdf-to-jpg":
      return `${head}${dropZone(".pdf",false,"PDF file chunein")}
        <div class="action-row"><button class="btn btn-primary" id="runBtn">JPG images download karein (ZIP)</button></div>
        <div class="status" id="status"></div>`;

    case "jpg-to-pdf":
      return `${head}${dropZone("image/jpeg,image/png",true,"Ek ya zyada images chunein (JPG/PNG)")}
        <div class="action-row"><button class="btn btn-primary" id="runBtn">PDF banake download karein</button></div>
        <div class="status" id="status"></div>`;

    case "compress":
      return `${head}${dropZone(".pdf",false,"Compress karne ke liye PDF file chunein")}
        <div class="soon-box" style="margin-bottom:16px;">Ye tool PDF ka structure optimize karta hai (unused data hataakar). Bahut bade image-heavy PDFs par size kam hoga, lekin ye Adobe jaise deep image-recompression jitna aggressive nahi hai.</div>
        <div class="action-row"><button class="btn btn-primary" id="runBtn">Compress karke download karein</button></div>
        <div class="status" id="status"></div>`;

    case "watermark":
      return `${head}${dropZone(".pdf",false,"Watermark lagane ke liye PDF file chunein")}
        <div class="field"><label>Watermark text</label><input type="text" id="wmText" value="CONFIDENTIAL"></div>
        <div class="field row">
          <div><label>Opacity (0.1–1)</label><input type="number" id="wmOpacity" value="0.25" step="0.05" min="0.05" max="1"></div>
          <div><label>Font size</label><input type="number" id="wmSize" value="48" min="10"></div>
        </div>
        <div class="action-row"><button class="btn btn-primary" id="runBtn">Watermark lagake download karein</button></div>
        <div class="status" id="status"></div>`;

    default:
      return `${head}<div class="soon-box">Ye tool jald hi add hoga.</div>`;
  }
}

/* ---------------- Shared helpers ---------------- */
function setStatus(msg, kind){
  const el = document.getElementById("status");
  if(!el) return;
  el.textContent = msg;
  el.className = "status" + (kind ? " "+kind : "");
}
function downloadBlob(blob, filename){
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(url), 4000);
}
function fileToArrayBuffer(file){
  return new Promise((res,rej)=>{
    const r = new FileReader();
    r.onload = ()=>res(r.result);
    r.onerror = rej;
    r.readAsArrayBuffer(file);
  });
}
function renderFileList(files){
  const ul = document.getElementById("fileList");
  if(!ul) return;
  ul.innerHTML = files.map((f,i)=>`<li><span class="name">${f.name}</span><button data-i="${i}">Hataayein</button></li>`).join("");
  ul.querySelectorAll("button").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      files.splice(Number(btn.dataset.i),1);
      renderFileList(files);
    });
  });
}

/* ---------------- Wire up modal per tool ---------------- */
function wireModal(tool){
  const dropZone = document.getElementById("dropZone");
  const fileInput = document.getElementById("fileInput");
  const runBtn = document.getElementById("runBtn");
  if(!dropZone) return;

  let files = [];

  dropZone.addEventListener("click", ()=>fileInput.click());
  dropZone.addEventListener("dragover", e=>{e.preventDefault(); dropZone.classList.add("drag");});
  dropZone.addEventListener("dragleave", ()=>dropZone.classList.remove("drag"));
  dropZone.addEventListener("drop", e=>{
    e.preventDefault(); dropZone.classList.remove("drag");
    handleFiles([...e.dataTransfer.files]);
  });
  fileInput.addEventListener("change", ()=>handleFiles([...fileInput.files]));

  function handleFiles(newFiles){
    if(fileInput.multiple){ files.push(...newFiles); } else { files = newFiles.slice(0,1); }
    renderFileList(files);
    if(tool.id === "organize" && files[0]) loadThumbs(files[0]);
  }

  if(runBtn) runBtn.addEventListener("click", ()=>runTool(tool, files));

  /* ---- Organize: thumbnail loader with remove / reorder ---- */
  let pageOrder = []; // array of original page indices, filtered as removed
  async function loadThumbs(file){
    setStatus("Pages load ho rahe hain...");
    const buf = await fileToArrayBuffer(file);
    const loadingTask = pdfjsLib.getDocument({data:buf.slice(0)});
    const pdf = await loadingTask.promise;
    pageOrder = Array.from({length:pdf.numPages}, (_,i)=>i);
    const thumbsEl = document.getElementById("thumbs");
    thumbsEl.innerHTML = "";
    for(let i=0;i<pdf.numPages;i++){
      const page = await pdf.getPage(i+1);
      const viewport = page.getViewport({scale:0.25});
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width; canvas.height = viewport.height;
      await page.render({canvasContext:canvas.getContext("2d"), viewport}).promise;
      const div = document.createElement("div");
      div.className = "thumb"; div.dataset.idx = i;
      div.innerHTML = `<span class="pnum">${i+1}</span><div class="actions">
          <button data-act="left" title="Left">←</button>
          <button data-act="right" title="Right">→</button>
          <button data-act="del" title="Delete">✕</button>
        </div>`;
      div.insertBefore(canvas, div.firstChild);
      thumbsEl.appendChild(div);
    }
    wireThumbActions();
    setStatus("");
    runBtn.style.display = "inline-flex";
  }
  function wireThumbActions(){
    const thumbsEl = document.getElementById("thumbs");
    thumbsEl.querySelectorAll("button").forEach(btn=>{
      btn.addEventListener("click", (e)=>{
        e.stopPropagation();
        const div = btn.closest(".thumb");
        const domIdx = [...thumbsEl.children].indexOf(div);
        const act = btn.dataset.act;
        if(act==="del"){
          div.classList.toggle("removed");
        } else if(act==="left" && domIdx>0){
          thumbsEl.insertBefore(div, thumbsEl.children[domIdx-1]);
        } else if(act==="right" && domIdx<thumbsEl.children.length-1){
          thumbsEl.insertBefore(thumbsEl.children[domIdx+1], div);
        }
      });
    });
  }
  window.__getOrganizeOrder = ()=>{
    const thumbsEl = document.getElementById("thumbs");
    if(!thumbsEl) return null;
    return [...thumbsEl.children].filter(d=>!d.classList.contains("removed")).map(d=>Number(d.dataset.idx));
  };
}

/* ---------------- Tool implementations ---------------- */
async function runTool(tool, files){
  if(files.length===0 && tool.id!=="organize"){ setStatus("Pehle file chunein.", "err"); return; }
  const runBtn = document.getElementById("runBtn");
  runBtn.disabled = true; const oldText = runBtn.textContent;
  runBtn.textContent = "Process ho raha hai...";
  try{
    switch(tool.id){
      case "merge": await doMerge(files); break;
      case "split": await doSplit(files[0]); break;
      case "rotate": await doRotate(files[0]); break;
      case "organize": await doOrganize(files[0]); break;
      case "page-numbers": await doPageNumbers(files[0]); break;
      case "crop": await doCrop(files[0]); break;
      case "pdf-to-jpg": await doPdfToJpg(files[0]); break;
      case "jpg-to-pdf": await doImagesToPdf(files); break;
      case "compress": await doCompress(files[0]); break;
      case "watermark": await doWatermark(files[0]); break;
    }
    setStatus("Ho gaya! Download shuru ho gaya hai.", "ok");
  }catch(err){
    console.error(err);
    setStatus("Kuch galat ho gaya: " + err.message, "err");
  }finally{
    runBtn.disabled = false; runBtn.textContent = oldText;
  }
}

async function doMerge(files){
  if(files.length<2){ throw new Error("Merge ke liye kam se kam 2 PDF files chunein."); }
  const { PDFDocument } = PDFLib;
  const merged = await PDFDocument.create();
  for(const f of files){
    const buf = await fileToArrayBuffer(f);
    const src = await PDFDocument.load(buf);
    const pages = await merged.copyPages(src, src.getPageIndices());
    pages.forEach(p=>merged.addPage(p));
  }
  const bytes = await merged.save();
  downloadBlob(new Blob([bytes],{type:"application/pdf"}), "merged.pdf");
}

async function doSplit(file){
  const { PDFDocument } = PDFLib;
  const buf = await fileToArrayBuffer(file);
  const src = await PDFDocument.load(buf);
  const zip = new JSZip();
  const n = src.getPageCount();
  for(let i=0;i<n;i++){
    const newDoc = await PDFDocument.create();
    const [page] = await newDoc.copyPages(src,[i]);
    newDoc.addPage(page);
    const bytes = await newDoc.save();
    zip.file(`page-${String(i+1).padStart(2,"0")}.pdf`, bytes);
  }
  const blob = await zip.generateAsync({type:"blob"});
  downloadBlob(blob, "split-pages.zip");
}

async function doRotate(file){
  const { PDFDocument, degrees } = PDFLib;
  const buf = await fileToArrayBuffer(file);
  const doc = await PDFDocument.load(buf);
  const angle = Number(document.getElementById("angleSelect").value);
  doc.getPages().forEach(p=>{
    const current = p.getRotation().angle;
    p.setRotation(degrees((current+angle)%360));
  });
  const bytes = await doc.save();
  downloadBlob(new Blob([bytes],{type:"application/pdf"}), "rotated.pdf");
}

async function doOrganize(file){
  const order = window.__getOrganizeOrder();
  if(!order || order.length===0){ throw new Error("Kam se kam ek page rakhna zaroori hai."); }
  const { PDFDocument } = PDFLib;
  const buf = await fileToArrayBuffer(file);
  const src = await PDFDocument.load(buf);
  const newDoc = await PDFDocument.create();
  const pages = await newDoc.copyPages(src, order);
  pages.forEach(p=>newDoc.addPage(p));
  const bytes = await newDoc.save();
  downloadBlob(new Blob([bytes],{type:"application/pdf"}), "organized.pdf");
}

async function doPageNumbers(file){
  const { PDFDocument, StandardFonts, rgb } = PDFLib;
  const buf = await fileToArrayBuffer(file);
  const doc = await PDFDocument.load(buf);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const pos = document.getElementById("posSelect").value;
  const start = Number(document.getElementById("startNum").value) || 1;
  doc.getPages().forEach((page,i)=>{
    const {width} = page.getSize();
    const label = String(start+i);
    const size = 11;
    const textWidth = font.widthOfTextAtSize(label, size);
    let x = width/2 - textWidth/2;
    if(pos==="bottom-right") x = width - textWidth - 36;
    if(pos==="bottom-left") x = 36;
    page.drawText(label, {x, y:22, size, font, color:rgb(0.08,0.13,0.24)});
  });
  const bytes = await doc.save();
  downloadBlob(new Blob([bytes],{type:"application/pdf"}), "numbered.pdf");
}

async function doCrop(file){
  const { PDFDocument } = PDFLib;
  const buf = await fileToArrayBuffer(file);
  const doc = await PDFDocument.load(buf);
  const margin = Number(document.getElementById("marginInput").value) || 0;
  doc.getPages().forEach(page=>{
    const {width,height} = page.getSize();
    const w = Math.max(10, width-2*margin);
    const h = Math.max(10, height-2*margin);
    page.setCropBox(margin, margin, w, h);
  });
  const bytes = await doc.save();
  downloadBlob(new Blob([bytes],{type:"application/pdf"}), "cropped.pdf");
}

async function doPdfToJpg(file){
  const buf = await fileToArrayBuffer(file);
  const pdf = await pdfjsLib.getDocument({data:buf}).promise;
  const zip = new JSZip();
  for(let i=1;i<=pdf.numPages;i++){
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({scale:2});
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width; canvas.height = viewport.height;
    await page.render({canvasContext:canvas.getContext("2d"), viewport}).promise;
    const blob = await new Promise(res=>canvas.toBlob(res, "image/jpeg", 0.92));
    zip.file(`page-${String(i).padStart(2,"0")}.jpg`, blob);
  }
  const outBlob = await zip.generateAsync({type:"blob"});
  downloadBlob(outBlob, "pdf-pages.zip");
}

async function doImagesToPdf(files){
  if(files.length===0) throw new Error("Kam se kam ek image chunein.");
  const { PDFDocument } = PDFLib;
  const doc = await PDFDocument.create();
  for(const f of files){
    const buf = await fileToArrayBuffer(f);
    let img;
    if(f.type==="image/png") img = await doc.embedPng(buf);
    else img = await doc.embedJpg(buf);
    const page = doc.addPage([img.width, img.height]);
    page.drawImage(img, {x:0,y:0,width:img.width,height:img.height});
  }
  const bytes = await doc.save();
  downloadBlob(new Blob([bytes],{type:"application/pdf"}), "images.pdf");
}

async function doCompress(file){
  const { PDFDocument } = PDFLib;
  const buf = await fileToArrayBuffer(file);
  const doc = await PDFDocument.load(buf, {updateMetadata:false});
  const bytes = await doc.save({useObjectStreams:true, addDefaultPage:false});
  const before = file.size, after = bytes.byteLength;
  downloadBlob(new Blob([bytes],{type:"application/pdf"}), "compressed.pdf");
  const pct = before>0 ? Math.max(0, Math.round((1-after/before)*100)) : 0;
  setStatus(`Ho gaya! ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB (~${pct}% chhota).`, "ok");
}

/* ---------------- Dark mode toggle ---------------- */
(function initTheme(){
  const saved = localStorage.getItem("pdfsolutions-theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  if(theme==="dark") document.documentElement.setAttribute("data-theme","dark");
  const btn = document.getElementById("themeToggle");
  btn?.addEventListener("click", ()=>{
    const isDark = document.documentElement.getAttribute("data-theme")==="dark";
    if(isDark){ document.documentElement.removeAttribute("data-theme"); localStorage.setItem("pdfsolutions-theme","light"); }
    else{ document.documentElement.setAttribute("data-theme","dark"); localStorage.setItem("pdfsolutions-theme","dark"); }
  });
})();

/* ---------------- Mobile hamburger menu ---------------- */
(function initHamburger(){
  const btn = document.getElementById("hamburgerBtn");
  const nav = document.getElementById("navCats");
  if(!btn || !nav) return;
  btn.addEventListener("click", ()=>{
    const open = nav.classList.toggle("open");
    btn.classList.toggle("open", open);
  });
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click", ()=>{
    nav.classList.remove("open"); btn.classList.remove("open");
  }));
  document.addEventListener("click", e=>{
    if(nav.classList.contains("open") && !nav.contains(e.target) && e.target!==btn){
      nav.classList.remove("open"); btn.classList.remove("open");
    }
  });
})();

/* ---------------- Scroll-reveal for cards/sections ---------------- */
(function initReveal(){
  const els = document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window) || els.length===0){
    els.forEach(el=>el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12, rootMargin:"0px 0px -40px 0px"});
  els.forEach(el=>io.observe(el));
})();

async function doWatermark(file){
  const { PDFDocument, StandardFonts, rgb, degrees } = PDFLib;
  const buf = await fileToArrayBuffer(file);
  const doc = await PDFDocument.load(buf);
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const text = document.getElementById("wmText").value || "CONFIDENTIAL";
  const opacity = Number(document.getElementById("wmOpacity").value) || 0.25;
  const size = Number(document.getElementById("wmSize").value) || 48;
  doc.getPages().forEach(page=>{
    const {width,height} = page.getSize();
    const textWidth = font.widthOfTextAtSize(text, size);
    page.drawText(text, {
      x: width/2 - textWidth/2, y: height/2,
      size, font, color: rgb(0.9,0.23,0.28), opacity,
      rotate: degrees(45)
    });
  });
  const bytes = await doc.save();
  downloadBlob(new Blob([bytes],{type:"application/pdf"}), "watermarked.pdf");
}
