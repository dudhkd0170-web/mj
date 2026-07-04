"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

interface Point2D {
  x: number;
  y: number;
}

interface SavedSolid {
  id: string;
  title: string;
  author_name: string;
  points: Point2D[];
  created_at: string;
}

export default function SolidExplorer() {
  const [isMounted, setIsMounted] = useState(false);
  const [drawMode, setDrawMode] = useState<"free" | "grid">("free");
  const [points, setPoints] = useState<Point2D[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [savedShapes, setSavedShapes] = useState<SavedSolid[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [dbStatus, setDbStatus] = useState<"checking" | "connected" | "disconnected">("checking");

  // Canvas Refs
  const canvas2DRef = useRef<HTMLCanvasElement | null>(null);
  const threeContainerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const solidMeshRef = useRef<THREE.Mesh | null>(null);
  const axisLineRef = useRef<THREE.Line | null>(null);

  // Constants
  const CANVAS_WIDTH = 340;
  const CANVAS_HEIGHT = 440;
  const AXIS_X = 30; // Axis line offset from left boundary (px)
  const SNAP_GRID = 20; // Grid spacing in pixels
  const POINT_SCALE = 30; // Coordinates scale factor for Three.js (30px = 1 unit)

  useEffect(() => {
    setIsMounted(true);
    checkSupabaseConnection();
  }, []);

  // Check if Supabase env is ready and fetch
  const checkSupabaseConnection = async () => {
    if (!isSupabaseConfigured()) {
      setDbStatus("disconnected");
      return;
    }
    try {
      const { data, error } = await supabase
        .from("rotational_solids")
        .select("id")
        .limit(1);
      if (error) {
        setDbStatus("disconnected");
      } else {
        setDbStatus("connected");
        fetchSavedShapes();
      }
    } catch (err) {
      setDbStatus("disconnected");
    }
  };

  const fetchSavedShapes = async () => {
    if (!isSupabaseConfigured()) return;
    try {
      const { data, error } = await supabase
        .from("rotational_solids")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setSavedShapes(data as SavedSolid[]);
      }
    } catch (err) {
      console.error("Error fetching shapes:", err);
    }
  };

  // 1. Handle 2D Drawing Canvas logic
  useEffect(() => {
    if (!isMounted) return;
    const canvas = canvas2DRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear Canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw grid background if in grid mode, or faint background grid
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    for (let x = 0; x < CANVAS_WIDTH; x += SNAP_GRID) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y < CANVAS_HEIGHT; y += SNAP_GRID) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_WIDTH, y);
      ctx.stroke();
    }

    // Draw Axis (Y-Axis representing the Rotational Axis)
    ctx.strokeStyle = "#ef4444"; // Red color
    ctx.lineWidth = 2.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(AXIS_X, 0);
    ctx.lineTo(AXIS_X, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // Axis label
    ctx.fillStyle = "#ef4444";
    ctx.font = "bold 11px Inter, sans-serif";
    ctx.fillText("회전축 (Axis)", AXIS_X + 8, 20);

    // Draw user path
    if (points.length > 0) {
      ctx.strokeStyle = "#4f46e5"; // Indigo path
      ctx.lineWidth = 3.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();

      // Draw markers on points
      ctx.fillStyle = "#818cf8";
      points.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }, [points, drawMode, isMounted]);

  // 2. Initialize Three.js 3D Viewer
  useEffect(() => {
    if (!isMounted || !threeContainerRef.current) return;

    const container = threeContainerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 440;

    // Create Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Slate-50 background matching default theme
    sceneRef.current = scene;

    // Create Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 12);

    // Create WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.3; // Prevent looking underground too much

    // Add Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0x818cf8, 0.3); // Slight blue color light from other side
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Add 3D Axis line
    const axisMaterial = new THREE.LineDashedMaterial({
      color: 0xef4444,
      dashSize: 0.2,
      gapSize: 0.1,
    });
    const pointsAxis = [];
    pointsAxis.push(new THREE.Vector3(0, -6, 0));
    pointsAxis.push(new THREE.Vector3(0, 6, 0));
    const axisGeom = new THREE.BufferGeometry().setFromPoints(pointsAxis);
    const axisLine = new THREE.Line(axisGeom, axisMaterial);
    axisLine.computeLineDistances();
    scene.add(axisLine);
    axisLineRef.current = axisLine;

    // Faint grid on floor to anchor 3D objects
    const gridHelper = new THREE.GridHelper(20, 20, 0xcbd5e1, 0xe2e8f0);
    gridHelper.position.y = -4.5;
    scene.add(gridHelper);

    // Animation loop flag
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Auto rotation to emphasize 3D
      if (solidMeshRef.current) {
        solidMeshRef.current.rotation.y += 0.003;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [isMounted]);

  // 3. Rebuild 3D Solid whenever the user path points change
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene: THREE.Scene = sceneRef.current;

    if (points.length < 2) {
      // Remove mesh if points are cleared
      if (solidMeshRef.current) {
        scene.remove(solidMeshRef.current);
        solidMeshRef.current = null;
      }
      return;
    }

    // Convert Canvas coordinates to Three.js coordinates
    const threePoints = points.map((p) => {
      const r = (p.x - AXIS_X) / POINT_SCALE;
      const h = (CANVAS_HEIGHT / 2 - p.y) / POINT_SCALE;
      return new THREE.Vector2(Math.max(0.001, r), h);
    });

    // Create Lathe Geometry (48 segments, full 360-degree rotation)
    const geometry = new THREE.LatheGeometry(threePoints, 48);

    // Indigo gloss material
    const material = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      roughness: 0.3,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });

    // Create solid mesh
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Add wireframe overlay
    const wireframeGeom = new THREE.WireframeGeometry(geometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.35,
    });
    const wireframe = new THREE.LineSegments(wireframeGeom, wireframeMat);
    mesh.add(wireframe);

    // Remove old mesh
    if (solidMeshRef.current) {
      scene.remove(solidMeshRef.current);
      solidMeshRef.current.geometry.dispose();
      if (Array.isArray(solidMeshRef.current.material)) {
        solidMeshRef.current.material.forEach((m) => m.dispose());
      } else {
        solidMeshRef.current.material.dispose();
      }
    }

    scene.add(mesh);
    solidMeshRef.current = mesh;

  }, [points]);

  // 4. Drawing Actions
  const handleCanvasInteraction = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvas2DRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;

    // Prevent drawing on the left side of the axis (must draw on the right side)
    const constrainedX = Math.max(AXIS_X, rawX);
    
    let finalX = constrainedX;
    let finalY = rawY;

    // Snap to grid if enabled
    if (drawMode === "grid") {
      // Calculate snap offset relative to the Axis line
      const relX = constrainedX - AXIS_X;
      const snappedRelX = Math.round(relX / SNAP_GRID) * SNAP_GRID;
      finalX = AXIS_X + snappedRelX;
      finalY = Math.round(rawY / SNAP_GRID) * SNAP_GRID;
    }

    if (e.type === "mousedown") {
      setIsDrawing(true);
      if (drawMode === "grid") {
        // Grid mode: Add points on click/down
        setPoints((prev) => {
          // Prevent duplicates
          if (prev.length > 0 && prev[prev.length - 1].x === finalX && prev[prev.length - 1].y === finalY) {
            return prev;
          }
          return [...prev, { x: finalX, y: finalY }];
        });
      } else {
        // Freehand mode: Start fresh path or continue
        setPoints([{ x: finalX, y: finalY }]);
      }
    } else if (e.type === "mousemove" && isDrawing) {
      if (drawMode === "free") {
        setPoints((prev) => {
          const lastPt = prev[prev.length - 1];
          // Filter out identical adjacent coordinate events
          if (lastPt && Math.hypot(lastPt.x - finalX, lastPt.y - finalY) < 4) {
            return prev;
          }
          return [...prev, { x: finalX, y: finalY }];
        });
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    setPoints([]);
  };

  const handleUndo = () => {
    setPoints((prev) => prev.slice(0, -1));
  };

  // 5. Database Save/Load handlers
  const handleSave = async () => {
    if (!title.trim()) {
      alert("회전체 제목을 입력해주세요!");
      return;
    }
    if (points.length < 2) {
      alert("최소 2개 이상의 점을 그려주셔야 회전체를 구성할 수 있습니다!");
      return;
    }

    try {
      const authorName = author.trim() || "익명의 선생님";
      const { error } = await supabase.from("rotational_solids").insert([
        {
          title: title.trim(),
          author_name: authorName,
          points: points,
          description: `${drawMode === "free" ? "자유 그리기" : "격자 그리기"} 모드로 그린 3D 회전체`,
        },
      ]);

      if (error) throw error;

      alert("🎉 Supabase 데이터베이스에 저장이 완료되었습니다!");
      setTitle("");
      setAuthor("");
      setShowSaveModal(false);
      fetchSavedShapes();
    } catch (err: any) {
      console.error(err);
      alert(`저장에 실패했습니다: ${err.message || "연결 오류"}`);
    }
  };

  const handleLoadSolid = (solid: SavedSolid) => {
    if (solid.points && Array.isArray(solid.points)) {
      setPoints(solid.points);
    }
  };

  if (!isMounted) {
    return <div className="min-h-[500px] flex items-center justify-center">로딩 중...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl transition-all duration-300">
      
      {/* DB Connection Status Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 mb-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center space-x-3">
          <span className="text-xl">🔌</span>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Supabase DB 연결 확인</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {dbStatus === "checking" && "연결 상태 확인 중..."}
              {dbStatus === "connected" && "성공적으로 연결되었습니다! 데이터를 저장하고 불러올 수 있습니다."}
              {dbStatus === "disconnected" && "데이터베이스가 설정되지 않았습니다. (테스트는 로컬에서도 계속 가능합니다)"}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          {dbStatus === "checking" && <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 animate-pulse">확인 중</span>}
          {dbStatus === "connected" && <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">연결됨</span>}
          {dbStatus === "disconnected" && <span className="px-3 py-1 text-xs rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-semibold">미연결</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: 2D Drawing Canvas (Grid / Free) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
              <span>🖌️</span> 
              <span>2D 단면 그리기</span>
            </h3>
            
            {/* Draw Mode Switcher */}
            <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200/50 dark:border-slate-800/50">
              <button
                onClick={() => { setDrawMode("free"); handleClear(); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  drawMode === "free"
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                자유 곡선
              </button>
              <button
                onClick={() => { setDrawMode("grid"); handleClear(); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  drawMode === "grid"
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                격자 스냅 (20px)
              </button>
            </div>
          </div>

          {/* 2D Canvas Wrapper */}
          <div className="relative bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-inner cursor-crosshair">
            <canvas
              ref={canvas2DRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              onMouseDown={handleCanvasInteraction}
              onMouseMove={handleCanvasInteraction}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="block"
            />
            {points.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none select-none bg-slate-50/70 dark:bg-slate-950/75">
                <span className="text-3xl mb-2">✏️</span>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {drawMode === "free" ? "마우스로 선을 그려보세요" : "격자 교차점을 클릭해 선을 연결하세요"}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  빨간색 회전축 기준 오른쪽에 그릴 수 있습니다.
                </p>
              </div>
            )}
          </div>

          {/* 2D Tool Buttons */}
          <div className="w-full flex justify-between gap-3 mt-4">
            <button
              onClick={handleUndo}
              disabled={points.length === 0}
              className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-40 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl transition-all"
            >
              한 단계 취소
            </button>
            <button
              onClick={handleClear}
              disabled={points.length === 0}
              className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-40 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl transition-all"
            >
              지우기 (초기화)
            </button>
            <button
              onClick={() => setShowSaveModal(true)}
              disabled={points.length < 2}
              className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-indigo-600/20"
            >
              저장하기 💾
            </button>
          </div>
        </div>

        {/* Right column: 3D Visualization Canvas (ThreeJS) */}
        <div className="lg:col-span-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between mb-4">
            <span className="flex items-center space-x-1.5">
              <span>🧊</span> 
              <span>3D 회전체 시각화</span>
            </span>
            <span className="text-[11px] font-normal text-slate-400 dark:text-slate-500">
              드래그: 회전 | 휠: 확대/축소
            </span>
          </h3>

          {/* ThreeJS Container */}
          <div className="relative flex-grow min-h-[350px] lg:min-h-[440px] bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-inner flex items-center justify-center">
            <div ref={threeContainerRef} className="w-full h-full min-h-[440px]" />
            
            {points.length < 2 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-50/80 dark:bg-slate-950/80 pointer-events-none select-none">
                <span className="text-3xl mb-2 animate-bounce">🏺</span>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  왼쪽 캔버스에 단면을 그리면<br />여기에 실시간 3D 회전체가 나타납니다.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Shapes Load Section */}
      <section className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800/60">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center space-x-2">
          <span>📚</span>
          <span>저장된 회전체 불러오기</span>
        </h3>
        
        {savedShapes.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800">
            데이터베이스에 저장된 회전체가 아직 없습니다. 직접 만들어 첫 번째 기록을 남겨보세요!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {savedShapes.map((shape) => (
              <button
                key={shape.id}
                onClick={() => handleLoadSolid(shape)}
                className="flex flex-col text-left p-4 bg-slate-50 hover:bg-indigo-50/50 dark:bg-slate-950/50 dark:hover:bg-indigo-950/20 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-900 transition-all group"
              >
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mb-1">
                  by {shape.author_name}
                </span>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {shape.title}
                </h4>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-2">
                  {new Date(shape.created_at).toLocaleDateString()}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              회전체 데이터베이스 저장 💾
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  회전체 제목
                </label>
                <input
                  type="text"
                  placeholder="예: 깔때기 모양 회전체, 도넛"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  작성자 이름 (선생님/학생)
                </label>
                <input
                  type="text"
                  placeholder="예: 홍길동 교사"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-xl transition-all"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20"
              >
                저장 완료
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
