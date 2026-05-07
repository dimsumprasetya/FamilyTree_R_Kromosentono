import React, { useState, useCallback, useMemo, memo, useRef, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, ZoomIn, ZoomOut, X, Camera, Users, User, RotateCcw } from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────
const INITIAL_DATA = [
  { id: 'root',       name: 'R. Kromosentono',              note: 'Kanjeng Sinuhun Mangkunegara Djawi', spouse: '', parentId: null },
  { id: 'g1_1',       name: 'R. Wasidi',                    note: '', spouse: '', parentId: 'root' },
  { id: 'g1_2',       name: 'R. Murdiman',                  note: '', spouse: '', parentId: 'root' },
  { id: 'g1_3',       name: 'R. Sadimin Atmosentono',       note: 'Mbah Mantri Klasir', spouse: '', parentId: 'root' },
  { id: 'g1_4',       name: 'R.Ngt Sadipah',                note: 'Mbah Suro', spouse: '', parentId: 'root' },
  { id: 'g1_5',       name: 'R.Ngt Parinem',                note: 'Mbah Ten', spouse: '', parentId: 'root' },
  { id: 'g1_6',       name: 'R. Ng. Somiadimo',             note: '', spouse: '', parentId: 'root' },
  { id: 'g1_7',       name: 'R. Ng. Widodari',              note: '', spouse: '', parentId: 'root' },
  { id: 'g1_8',       name: 'R. Ng. Somiadi',               note: '', spouse: '', parentId: 'root' },
  { id: 'g1_9',       name: 'R. Ng. Widarsari',             note: '', spouse: '', parentId: 'root' },
  { id: 'g1_10',      name: 'R.Ngt Sujinah',                note: 'Mbah Jure', spouse: '', parentId: 'root' },
  { id: 'g2_w1',      name: 'R. Wasidjo',                   note: '', spouse: '', parentId: 'g1_1' },
  { id: 'g3_w1_1',    name: 'R. Roni Rustomo',              note: '', spouse: '', parentId: 'g2_w1' },
  { id: 'g3_w1_2',    name: 'R. Rustomo Wasidjo',           note: '', spouse: '', parentId: 'g2_w1' },
  { id: 'g2_w2',      name: 'R.Ngt Wasijati',               note: '', spouse: '', parentId: 'g1_1' },
  { id: 'g3_w2_1',    name: 'R.Ngt Wasri',                  note: '', spouse: '', parentId: 'g2_w2' },
  { id: 'g3_w2_2',    name: 'R. Wasono',                    note: '', spouse: '', parentId: 'g2_w2' },
  { id: 'g2_w3',      name: 'R. Wasito',                    note: '', spouse: '', parentId: 'g1_1' },
  { id: 'g3_w3_1',    name: 'R.Ngt Warsiti',                note: '', spouse: '', parentId: 'g2_w3' },
  { id: 'g2_m1',      name: 'R.Ngt Murdini',                note: '', spouse: '', parentId: 'g1_2' },
  { id: 'g2_m2',      name: 'R. Murdijanto',                note: '', spouse: '', parentId: 'g1_2' },
  { id: 'g2_m3',      name: 'R.Ngt Murdiyanti',             note: '', spouse: '', parentId: 'g1_2' },
  { id: 'g2_m4',      name: 'R. Murdiono',                  note: '', spouse: '', parentId: 'g1_2' },
  { id: 'g2_s1',      name: 'R. Soepartoni',                note: '', spouse: '', parentId: 'g1_3' },
  { id: 'g3_sp1',     name: 'R. Partono',                   note: '', spouse: '', parentId: 'g2_s1' },
  { id: 'g3_sp2',     name: 'R.Ngt Partini',                note: '', spouse: '', parentId: 'g2_s1' },
  { id: 'g3_sp3',     name: 'R. Partoyo',                   note: '', spouse: '', parentId: 'g2_s1' },
  { id: 'g3_sp4',     name: 'R. Hariyono',                  note: '', spouse: '', parentId: 'g2_s1' },
  { id: 'g4_har1',    name: 'R. Arya',                      note: '', spouse: '', parentId: 'g3_sp4' },
  { id: 'g4_har2',    name: 'R. Aditya',                    note: '', spouse: '', parentId: 'g3_sp4' },
  { id: 'g4_har3',    name: 'Rr. Arin',                     note: '', spouse: '', parentId: 'g3_sp4' },
  { id: 'g2_s2',      name: 'R.Ngt Siti Kartini',           note: '', spouse: '', parentId: 'g1_3' },
  { id: 'g3_k1',      name: 'R. Didit Suprastio',           note: '', spouse: '', parentId: 'g2_s2' },
  { id: 'g4_d1',      name: 'R. Anggakara Previandono',     note: '', spouse: '', parentId: 'g3_k1' },
  { id: 'g4_d2',      name: 'R. Eggy Wicaksono',            note: '', spouse: '', parentId: 'g3_k1' },
  { id: 'g5_egg1',    name: 'Rr. Astari',                   note: '', spouse: '', parentId: 'g4_d2' },
  { id: 'g5_egg2',    name: 'R. Andrayuda',                 note: '', spouse: '', parentId: 'g4_d2' },
  { id: 'g6_helmy',   name: 'R. Helmy',                     note: '', spouse: '', parentId: 'g5_egg2' },
  { id: 'g4_d3',      name: 'R.Ngt Intiyastuti',            note: '', spouse: '', parentId: 'g3_k1' },
  { id: 'g3_k2',      name: 'R. Budhy Winarso',             note: '', spouse: '', parentId: 'g2_s2' },
  { id: 'g2_s3',      name: 'R.Ngt Sartupi Laili',          note: '', spouse: '', parentId: 'g1_3' },
  { id: 'g3_l1',      name: 'R.Ngt Edit Maria K.W.',        note: '', spouse: '', parentId: 'g2_s3' },
  { id: 'g3_l2',      name: 'R. Indro Purwoko',             note: '', spouse: '', parentId: 'g2_s3' },
  { id: 'g3_l3',      name: 'R.Ngt Yohana Maria K.R.',      note: '', spouse: '', parentId: 'g2_s3' },
  { id: 'g2_s4',      name: 'R. Koesoemo Asmoro',           note: '', spouse: '', parentId: 'g1_3' },
  { id: 'g3_a1',      name: 'R. Marten Kusuma Sularso',     note: '', spouse: '', parentId: 'g2_s4' },
  { id: 'g3_a2',      name: 'R. Michael Kusuma Suraso',     note: '', spouse: '', parentId: 'g2_s4' },
  { id: 'g3_a3',      name: 'R. Adi Prasetyo Utomo',        note: '', spouse: '', parentId: 'g2_s4' },
  { id: 'g2_sd1',     name: 'R. Suroso',                    note: '', spouse: '', parentId: 'g1_4' },
  { id: 'g3_sr1',     name: 'R. Suroso Hadi',               note: '', spouse: '', parentId: 'g2_sd1' },
  { id: 'g3_sr2',     name: 'R.Ngt Suroso Wati',            note: '', spouse: '', parentId: 'g2_sd1' },
  { id: 'g2_sd2',     name: 'R. Suroyo',                    note: '', spouse: '', parentId: 'g1_4' },
  { id: 'g2_sd3',     name: 'R. Suroto',                    note: '', spouse: '', parentId: 'g1_4' },
  { id: 'g2_sd4',     name: 'R. Surodi',                    note: '', spouse: '', parentId: 'g1_4' },
  { id: 'g2_sd5',     name: 'R.Ngt Suroti',                 note: '', spouse: '', parentId: 'g1_4' },
  { id: 'g2_p1',      name: 'R. Soedjito',                  note: '', spouse: '', parentId: 'g1_5' },
  { id: 'g3_dj1',     name: 'R. Djito Bawono',              note: '', spouse: '', parentId: 'g2_p1' },
  { id: 'g3_dj2',     name: 'R.Ngt Djito Wati',             note: '', spouse: '', parentId: 'g2_p1' },
  { id: 'g2_p2',      name: 'R. Bambang Soetejo',           note: '', spouse: '', parentId: 'g1_5' },
  { id: 'g3_bs_n1',   name: 'R. Bambang S. Krisnamurti',    note: '', spouse: '', parentId: 'g2_p2' },
  { id: 'g3_bs_n3',   name: 'R. Bambang S. Putranto',       note: '', spouse: '', parentId: 'g2_p2' },
  { id: 'g3_bs_n4',   name: 'R.Ngt E.S. Werdiningsih',      note: '', spouse: '', parentId: 'g2_p2' },
  { id: 'g3_bs_n5',   name: 'R. Bambang S. Kurniawan',      note: '', spouse: '', parentId: 'g2_p2' },
  { id: 'g3_bs_n6',   name: 'R. Bambang S. Noviadi',        note: '', spouse: '', parentId: 'g2_p2' },
  { id: 'g3_bs_n8',   name: 'R.Ngt Endang S. Siwi',         note: '', spouse: '', parentId: 'g2_p2' },
  { id: 'g3_bs_n9',   name: 'R.Ngt Endang S. Rini',         note: '', spouse: '', parentId: 'g2_p2' },
  { id: 'g3_bs_n10',  name: 'R. Bambang S. Edi Nugroho',    note: '', spouse: '', parentId: 'g2_p2' },
  { id: 'g2_p3',      name: 'R. Sudarsono',                 note: '', spouse: '', parentId: 'g1_5' },
  { id: 'g3_sdr1',    name: 'R. Bambang Sudarsono',         note: '', spouse: '', parentId: 'g2_p3' },
  { id: 'g4_sdr1_1',  name: 'R. Gagah',                     note: '', spouse: '', parentId: 'g3_sdr1' },
  { id: 'g4_sdr1_2',  name: 'R. Galih',                     note: '', spouse: '', parentId: 'g3_sdr1' },
  { id: 'g3_sdr2',    name: 'R.Ngt Nanik Sudarsono',        note: '', spouse: '', parentId: 'g2_p3' },
  { id: 'g4_sdr2_1',  name: 'R. Didit',                     note: '', spouse: '', parentId: 'g3_sdr2' },
  { id: 'g4_sdr2_2',  name: 'R. Dodo',                      note: '', spouse: '', parentId: 'g3_sdr2' },
  { id: 'g2_wid1',    name: 'R. Deddy Widjaja Adi',         note: '', spouse: '', parentId: 'g1_7' },
  { id: 'g3_dwa1',    name: 'R.Ngt Deddy Diding W.',        note: '', spouse: '', parentId: 'g2_wid1' },
  { id: 'g4_dwa1_1',  name: 'R. M. Daffa',                  note: '', spouse: '', parentId: 'g3_dwa1' },
  { id: 'g4_dwa1_2',  name: 'R. Dewangga',                  note: '', spouse: '', parentId: 'g3_dwa1' },
  { id: 'g3_dwa2',    name: 'R.Ngt Deddy Deny T.',          note: '', spouse: '', parentId: 'g2_wid1' },
  { id: 'g4_dwa2_1',  name: 'R.Ngt Ataya Nayla',            note: '', spouse: '', parentId: 'g3_dwa2' },
  { id: 'g4_dwa2_2',  name: 'R.Ngt Nabila',                 note: '', spouse: '', parentId: 'g3_dwa2' },
  { id: 'g3_dwa3',    name: 'R. Deddy Dicky H.',            note: '', spouse: '', parentId: 'g2_wid1' },
  { id: 'g4_dwa3_1',  name: 'R. Praba Raditya',             note: '', spouse: '', parentId: 'g3_dwa3' },
  { id: 'g4_dwa3_2',  name: 'R. Daniswara',                 note: '', spouse: '', parentId: 'g3_dwa3' },
  { id: 'g4_dwa3_3',  name: 'R. Davin',                     note: '', spouse: '', parentId: 'g3_dwa3' },
];

const GEN_COLORS = ['#4ade80','#60a5fa','#fb923c','#c084fc','#34d399','#f87171'];
const GEN_LABELS = ['Gen 0','Gen 1','Gen 2','Gen 3','Gen 4','Gen 5+'];

const TREE_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .tree-canvas { display: inline-flex; padding: 40px 56px 96px; min-width: max-content; }
  .td-sub { display: flex; flex-direction: column; align-items: center; }
  .td-vbar { width: 2px; height: 26px; background: #57534e; flex-shrink: 0; }
  .td-row { display: flex; flex-direction: row; align-items: flex-start; justify-content: center; }
  .td-col { display: flex; flex-direction: column; align-items: center; position: relative; padding: 0 6px; }
  .td-col::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: #57534e; }
  .td-col:first-child::before { left: 50%; }
  .td-col:last-child::before  { right: 50%; }
  .td-col:only-child::before  { display: none; }
  .mc { width: 100px; border-radius: 10px; overflow: visible; position: relative; background: #1c1917; border: 1.5px solid #44403c; flex-shrink: 0; cursor: default; transition: transform .18s cubic-bezier(.34,1.56,.64,1), box-shadow .18s; }
  .mc:hover { transform: translateY(-4px) scale(1.06); box-shadow: 0 14px 40px rgba(0,0,0,.7); z-index: 20; }
  .mc.hl { box-shadow: 0 0 0 3px #f59e0b, 0 8px 28px rgba(245,158,11,.4); transform: translateY(-4px) scale(1.08); z-index: 20; }
  .mc-inner { border-radius: 9px; overflow: hidden; }
  .mc-photo { width: 100%; height: 90px; background: #292524; display: flex; align-items: center; justify-content: center; overflow: hidden; cursor: pointer; position: relative; }
  .mc-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .mc-photo-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.55); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; color: #e7e5e4; opacity: 0; transition: opacity .18s; font-size: 9px; font-weight: 600; }
  .mc-photo:hover .mc-photo-overlay { opacity: 1; }
  .mc-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; color: #57534e; width: 100%; height: 100%; }
  .mc-placeholder span { font-size: 8px; }
  .mc-leaf { position: absolute; top: 5px; left: 5px; width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid #1c1917; }
  .mc-info { padding: 5px 5px 6px; border-top: 1px solid #292524; }
  .mc-name { font-size: 9px; font-weight: 700; color: #e7e5e4; text-align: center; line-height: 1.35; word-break: break-word; }
  .mc-note { font-size: 7.5px; color: #a8a29e; text-align: center; margin-top: 2px; line-height: 1.25; font-style: italic; }
  .mc-spouse { font-size: 7.5px; color: #fb923c; text-align: center; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .mc-childcount { font-size: 7px; color: #78716c; text-align: center; margin-top: 2px; }
  .mc-actions { position: absolute; top: -18px; left: 50%; transform: translateX(-50%); display: none; flex-direction: row; gap: 3px; z-index: 40; filter: drop-shadow(0 2px 4px rgba(0,0,0,.6)); }
  .mc:hover .mc-actions { display: flex; }
  .mc-act { width: 22px; height: 22px; border-radius: 50%; border: none; outline: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform .15s; }
  .mc-act:hover  { transform: scale(1.2); }
  .mc-act.a-add  { background: #14532d; color: #86efac; }
  .mc-act.a-edit { background: #1e3a8a; color: #93c5fd; }
  .mc-act.a-del  { background: #7f1d1d; color: #fca5a5; }
  @media (max-width: 480px) { .mc { width: 78px; } .mc-photo { height: 72px; } .mc-name { font-size: 8px; } .td-vbar { height: 18px; } .td-col { padding: 0 3px; } .tree-canvas { padding: 28px 28px 72px; } }
`;

// ─── TREE NODE (Corrected & Optimized) ───────────────────────────────────────
const TreeNode = memo(({
  node, childrenMap, depths, photos, searchQuery,
  onPhotoClick, onAdd, onEdit, onDelete,
}) => {
  const children = childrenMap[node.id] || [];
  const depth = depths[node.id] || 0;
  const accentColor = GEN_COLORS[depth % GEN_COLORS.length];
  const isHL = searchQuery.trim() !== '' && node.name.toLowerCase().includes(searchQuery.toLowerCase());
  const photo = photos[node.id];

  return (
    <div className="td-sub">
      <div className={`mc${isHL ? ' hl' : ''}`} style={{ borderTop: `3px solid ${accentColor}` }}>
        <div className="mc-actions">
          <button className="mc-act a-add" onClick={() => onAdd(node.id)} title="Tambah anak"><Plus size={11}/></button>
          <button className="mc-act a-edit" onClick={() => onEdit(node)} title="Edit"><Edit2 size={11}/></button>
          {node.id !== 'root' && <button className="mc-act a-del" onClick={() => onDelete(node.id)} title="Hapus"><Trash2 size={11}/></button>}
        </div>
        <div className="mc-inner">
          <div className="mc-photo" onClick={() => onPhotoClick(node.id)}>
            {photo ? <img src={photo} alt={node.name}/> : <div className="mc-placeholder"><Camera size={18}/><span>Tambah Foto</span></div>}
            <div className="mc-photo-overlay"><Camera size={14}/><span>Ganti Foto</span></div>
            <div className="mc-leaf" style={{ background: accentColor }}/>
          </div>
          <div className="mc-info">
            <div className="mc-name">{node.name}</div>
            {node.note && <div className="mc-note">{node.note}</div>}
            {node.spouse && <div className="mc-spouse">♥ {node.spouse}</div>}
            {children.length > 0 && <div className="mc-childcount">{children.length} keturunan ▾</div>}
          </div>
        </div>
      </div>
      {children.length > 0 && (
        <>
          <div className="td-vbar"/>
          <div className="td-row">
            {children.map(child => (
              <div className="td-col" key={child.id}>
                <div className="td-vbar"/>
                <TreeNode
                  node={child} childrenMap={childrenMap} depths={depths}
                  photos={photos} searchQuery={searchQuery}
                  onPhotoClick={onPhotoClick} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
});

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const DeleteModal = memo(({ name, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
    <div className="bg-[#1c1917] border border-[#44403c] rounded-2xl shadow-2xl w-full max-w-[300px] p-6">
      <div className="w-11 h-11 rounded-full bg-red-900/50 flex items-center justify-center mx-auto mb-3">
        <Trash2 size={20} className="text-red-400"/>
      </div>
      <h3 className="text-sm font-bold text-stone-100 text-center mb-1">Hapus Anggota?</h3>
      <p className="text-xs text-stone-300 font-semibold text-center mb-1">{name}</p>
      <p className="text-[11px] text-red-400 text-center mb-5">Serta seluruh keturunan di bawahnya akan terhapus.</p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-2 border border-[#44403c] rounded-xl text-stone-400 text-xs font-medium hover:bg-[#292524] transition-colors">Batal</button>
        <button onClick={onConfirm} className="flex-1 py-2 bg-red-800 hover:bg-red-700 text-red-100 text-xs font-semibold rounded-xl transition-colors">Ya, Hapus</button>
      </div>
    </div>
  </div>
));

const Field = ({ label, required, children }) => (
  <div>
    <label className="block text-[11px] font-semibold text-stone-500 mb-1 uppercase tracking-wide">
      {label}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);
const inputCls = `w-full px-3 py-2 bg-[#292524] border border-[#44403c] rounded-xl text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all`;

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function FamilyTreeApp() {
  const [members, setMembers] = useState(INITIAL_DATA);
  const [photos, setPhotos] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [formData, setFormData] = useState({ name: '', note: '', spouse: '', parentId: '' });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [pan, _setPan] = useState({ x: 80, y: 60 });
  const [zoom, _setZoom] = useState(0.55);
  const panRef = useRef({ x: 80, y: 60 });
  const zoomRef = useRef(0.55);
  const setPan = useCallback((v) => { panRef.current = v; _setPan(v); }, []);
  const setZoom = useCallback((fn) => {
    const nv = typeof fn === 'function' ? fn(zoomRef.current) : fn;
    const clamped = Math.min(2.5, Math.max(0.12, parseFloat(nv.toFixed(3))));
    zoomRef.current = clamped; _setZoom(clamped);
  }, []);

  const photoInputRef = useRef(null);
  const photoTargetIdRef = useRef(null);
  const canvasRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const touchRef = useRef({ pinchDist: null, startZoom: 0.55 });

  const { childrenMap, depths, rootNodes } = useMemo(() => {
    const map = {};
    const dMap = {};
    const roots = [];
    const calcDepth = (id, d) => {
      dMap[id] = d;
      const children = map[id] || [];
      children.forEach(c => calcDepth(c.id, d + 1));
    };
    members.forEach(m => {
      if (!m.parentId) roots.push(m);
      else {
        if (!map[m.parentId]) map[m.parentId] = [];
        map[m.parentId].push(m);
      }
    });
    roots.forEach(r => calcDepth(r.id, 0));
    return { childrenMap: map, depths: dMap, rootNodes: roots };
  }, [members]);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onTouchStart = (e) => {
      if (e.target.closest('button,input,select,textarea,[role="dialog"]')) return;
      if (e.touches.length === 1) {
        isDraggingRef.current = true; setIsDragging(true);
        dragStartRef.current = { x: e.touches[0].clientX - panRef.current.x, y: e.touches[0].clientY - panRef.current.y };
        touchRef.current.pinchDist = null;
      } else if (e.touches.length === 2) {
        isDraggingRef.current = false; setIsDragging(false);
        touchRef.current.pinchDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        touchRef.current.startZoom = zoomRef.current;
      }
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      if (e.touches.length === 1 && isDraggingRef.current) {
        setPan({ x: e.touches[0].clientX - dragStartRef.current.x, y: e.touches[0].clientY - dragStartRef.current.y });
      } else if (e.touches.length === 2 && touchRef.current.pinchDist !== null) {
        const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        setZoom(touchRef.current.startZoom * (d / touchRef.current.pinchDist));
      }
    };
    const onTouchEnd = () => { isDraggingRef.current = false; setIsDragging(false); };
    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [setPan, setZoom]);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onWheel = (e) => { e.preventDefault(); setZoom(z => z - e.deltaY * 0.001); };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [setZoom]);

  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('button,input,select,textarea,[role="dialog"]')) return;
    isDraggingRef.current = true; setIsDragging(true);
    dragStartRef.current = { x: e.clientX - panRef.current.x, y: e.clientY - panRef.current.y };
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    setPan({ x: e.clientX - dragStartRef.current.x, y: e.clientY - dragStartRef.current.y });
  }, [setPan]);

  const handleMouseUp = useCallback(() => { isDraggingRef.current = false; setIsDragging(false); }, []);

  const handlePhotoClick = useCallback((id) => {
    photoTargetIdRef.current = id;
    photoInputRef.current?.click();
  }, []);

  const handlePhotoChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotos(prev => ({ ...prev, [photoTargetIdRef.current]: ev.target.result }));
    reader.readAsDataURL(file);
    e.target.value = '';
  }, []);

  const openAdd = useCallback((parentId = '') => {
    setEditTarget(null);
    setFormData({ name: '', note: '', spouse: '', parentId });
    setEditModal('add');
  }, []);

  const openEdit = useCallback((member) => {
    setEditTarget(member);
    setFormData({ name: member.name, note: member.note || '', spouse: member.spouse || '', parentId: member.parentId || '' });
    setEditModal('edit');
  }, []);

  const saveMember = useCallback(() => {
    if (!formData.name.trim()) return;
    if (formData.parentId) {
      let currentParent = formData.parentId;
      while (currentParent) {
        if (currentParent === editTarget?.id) {
          alert("Error: Seseorang tidak bisa menjadi orang tua bagi leluhurnya sendiri!");
          return;
        }
        const parentNode = members.find(m => m.id === currentParent);
        currentParent = parentNode ? parentNode.parentId : null;
      }
    }
    if (editTarget) setMembers(prev => prev.map(m => m.id === editTarget.id ? { ...m, ...formData } : m));
    else {
      const id = 'id_' + Math.random().toString(36).substring(2, 11);
      setMembers(prev => [...prev, { id, ...formData }]);
    }
    setEditModal(null);
  }, [formData, editTarget, members]);

  const requestDelete = useCallback((id) => {
    const m = members.find(x => x.id === id);
    setDeleteTarget({ id, name: m?.name ?? id });
  }, [members]);

  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    const getDescendants = (id, list) => {
      let descendants = [];
      const children = list.filter(m => m.parentId === id);
      children.forEach(c => {
        descendants.push(c.id);
        descendants = [...descendants, ...getDescendants(c.id, list)];
      });
      return descendants;
    };
    const idsToDelete = [deleteTarget.id, ...getDescendants(deleteTarget.id, members)];
    setMembers(prev => prev.filter(m => !idsToDelete.includes(m.id)));
    setPhotos(prev => {
      const n = { ...prev };
      idsToDelete.forEach(id => delete n[id]);
      return n;
    });
    setDeleteTarget(null);
  }, [deleteTarget, members]);

  const resetView = useCallback(() => { setPan({ x: 80, y: 60 }); setZoom(0.55); }, [setPan, setZoom]);
  const setF = useCallback((k) => (e) => setFormData(p => ({ ...p, [k]: e.target.value })), []);

  return (
    <div className="relative w-full h-screen bg-[#0c0a09] overflow-hidden font-sans select-none">
      <style dangerouslySetInnerHTML={{ __html: TREE_CSS }}/>
      <input ref={photoInputRef} type="file" accept="image/*" className="absolute opacity-0 pointer-events-none w-0 h-0" onChange={handlePhotoChange}/>

      <div className="absolute top-0 left-0 right-0 z-30 flex items-center gap-2 px-3 py-2 bg-[#1c1917]/95 backdrop-blur-md border-b border-[#3f3836]" style={{ minHeight: 48 }}>
        <div className="hidden sm:flex flex-col flex-shrink-0 mr-1">
          <span className="text-xs font-black text-stone-100 leading-none">Silsilah Trah</span>
          <span className="text-[10px] font-semibold text-amber-400 leading-none mt-0.5">Praja Mangkunegaran</span>
        </div>
        <div className="flex sm:hidden flex-shrink-0">
          <span className="text-[11px] font-black text-amber-400">Trah Mangkunegaran</span>
        </div>
        <div className="hidden sm:block w-px h-5 bg-[#44403c] mx-1 flex-shrink-0"/>
        <div className="relative flex-1 min-w-0 max-w-[200px] sm:max-w-xs">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-600 pointer-events-none"/>
          <input type="text" placeholder="Cari nama…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-7 pr-6 py-1.5 bg-[#292524] border border-[#44403c] rounded-xl text-[11px] text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-300 transition-colors"><X size={11}/></button>}
        </div>
        <div className="flex-1"/>
        <div className="flex items-center bg-[#292524] rounded-xl border border-[#44403c] overflow-hidden flex-shrink-0">
          <button onClick={() => setZoom(z => z - 0.1)} className="p-1.5 text-stone-500 hover:text-stone-200 hover:bg-[#3f3836] transition-colors"><ZoomOut size={13}/></button>
          <span className="px-1 text-[11px] font-semibold text-stone-300 min-w-[2.8rem] text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => z + 0.1)} className="p-1.5 text-stone-500 hover:text-stone-200 hover:bg-[#3f3836] transition-colors"><ZoomIn size={13}/></button>
        </div>
        <button onClick={resetView} className="p-1.5 bg-[#292524] border border-[#44403c] rounded-xl text-stone-500 hover:text-stone-200 hover:bg-[#3f3836] transition-colors flex-shrink-0" title="Reset tampilan"><RotateCcw size={13}/></button>
        <button onClick={() => openAdd()} className="flex items-center gap-1 px-2.5 py-1.5 flex-shrink-0 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-amber-50 rounded-xl text-[11px] font-bold transition-colors shadow-md"><Plus size={13}/><span className="hidden sm:inline">Tambah</span></button>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 bg-[#1c1917]/90 backdrop-blur-sm border border-[#3f3836] rounded-full">
        {GEN_COLORS.map((c, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0" style={{ background: c }}/>
            <span className="text-[8px] sm:text-[9px] text-stone-600">{GEN_LABELS[i]}</span>
          </div>
        ))}
      </div>

      <div ref={canvasRef} className="w-full h-full" style={{ paddingTop: 48, cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none', WebkitUserSelect: 'none', userSelect: 'none' }} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
        <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: '0 0', willChange: 'transform', transition: isDragging ? 'none' : 'transform 0.08s ease-out' }}>
          <div className="tree-canvas">
            {rootNodes.map(node => (
              <TreeNode key={node.id} node={node} childrenMap={childrenMap} depths={depths} photos={photos} searchQuery={searchQuery} onPhotoClick={handlePhotoClick} onAdd={openAdd} onEdit={openEdit} onDelete={requestDelete} />
            ))}
          </div>
        </div>
      </div>

      {editModal && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black/75 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 backdrop-blur-sm">
          <div className="bg-[#1c1917] border border-[#44403c] rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-sm overflow-hidden" style={{ maxHeight: '92vh', overflowY: 'auto' }}>
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 bg-[#1c1917] border-b border-[#3f3836]">
              <h2 className="text-sm font-bold text-stone-100">{editModal === 'edit' ? '✏️ Edit Anggota' : '➕ Tambah Anggota'}</h2>
              <button onClick={() => setEditModal(null)} className="p-1.5 rounded-full text-stone-600 hover:text-stone-300 hover:bg-[#3f3836] transition-colors"><X size={15}/></button>
            </div>
            <div className="p-5 space-y-4">
              {editTarget && (
                <div className="flex flex-col items-center gap-2">
                  <div onClick={() => handlePhotoClick(editTarget.id)} className="w-20 h-20 rounded-full overflow-hidden bg-[#292524] border-2 border-[#44403c] flex items-center justify-center cursor-pointer hover:border-amber-500 transition-colors">
                    {photos[editTarget.id] ? <img src={photos[editTarget.id]} alt="" className="w-full h-full object-cover"/> : <Camera size={24} className="text-stone-600"/>}
                  </div>
                  <span className="text-[10px] text-stone-600">Klik foto untuk ganti</span>
                </div>
              )}
              <Field label="Nama Lengkap" required>
                <div className="relative">
                  <User size={12} className="absolute top-1/2 left-2.5 -translate-y-1/2 text-stone-600 pointer-events-none"/>
                  <input type="text" className={`${inputCls} pl-8`} placeholder="Nama lengkap & gelar" value={formData.name} onChange={setF('name')}/>
                </div>
              </Field>
              <Field label="Gelar / Keterangan">
                <input type="text" className={inputCls} placeholder="Contoh: Mbah Mantri Klasir" value={formData.note} onChange={setF('note')}/>
              </Field>
              <Field label="Nama Pasangan">
                <div className="relative">
                  <Users size={12} className="absolute top-1/2 left-2.5 -translate-y-1/2 text-stone-600 pointer-events-none"/>
                  <input type="text" className={`${inputCls} pl-8`} placeholder="Opsional" value={formData.spouse} onChange={setF('spouse')}/>
                </div>
              </Field>
              <Field label="Anak Dari">
                <select className={inputCls} value={formData.parentId} onChange={setF('parentId')}>
                  <option value="">— Tidak ada (Leluhur Akar) —</option>
                  {members.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </Field>
              <div className="flex gap-2 pt-1 pb-1">
                <button onClick={() => setEditModal(null)} className="flex-1 py-2.5 border border-[#44403c] rounded-xl text-stone-500 text-xs font-medium hover:bg-[#292524] transition-colors">Batal</button>
                <button onClick={saveMember} disabled={!formData.name.trim()} className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-35 text-amber-50 text-xs font-bold rounded-xl transition-colors">{editModal === 'edit' ? 'Simpan Perubahan' : 'Tambah Anggota'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {deleteTarget && <DeleteModal name={deleteTarget.name} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)}/>}
    </div>
  );
}
