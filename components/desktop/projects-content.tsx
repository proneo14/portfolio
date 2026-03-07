'use client'

import { useState } from 'react'

interface FileItem {
  name: string
  type: 'folder' | 'app' | 'exe' | 'txt' | 'bmp' | 'html' | 'py' | 'go'
  description: string
  content?: string
  children?: FileItem[]
}

const projectTree: FileItem[] = [
  {
    name: 'GoFish',
    type: 'folder',
    description: 'Multiplayer card game — uOttaHack 8',
    children: [
      { name: 'README.md', type: 'txt', description: 'Project overview', content: `# GoFish 🐟\n\nA real-time multiplayer card game built for uOttaHack 8.\n\n## Tech Stack\n- Backend: Go (net/http, gorilla/websocket)\n- Frontend: React + TypeScript\n- Protocol: WebSocket for real-time state sync\n- Auth: JWT session tokens\n\n## Architecture\nServer manages game rooms with goroutine-per-connection.\nEach room runs an independent game loop with channel-based\nmessage passing. Frontend uses React context for state.\n\n## Team\nCollaborative build — pair programmed the WebSocket layer\nwhile partner handled the UI/UX and card animations.` },
      { name: 'main.go', type: 'go', description: 'Server entry point', content: `// GoFish game server\npackage main\n\nimport (\n\t"log"\n\t"net/http"\n\t"github.com/gorilla/websocket"\n)\n\nvar upgrader = websocket.Upgrader{\n\tCheckOrigin: func(r *http.Request) bool { return true },\n}\n\nfunc main() {\n\thub := NewHub()\n\tgo hub.Run()\n\n\thttp.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {\n\t\tconn, _ := upgrader.Upgrade(w, r, nil)\n\t\tclient := &Client{Hub: hub, Conn: conn}\n\t\thub.Register <- client\n\t\tgo client.ReadPump()\n\t\tgo client.WritePump()\n\t})\n\n\tlog.Println("GoFish server on :8080")\n\tlog.Fatal(http.ListenAndServe(":8080", nil))\n}` },
      { name: 'tech_stack.txt', type: 'txt', description: 'Technologies used', content: `GoFish Technology Stack\n=======================\nLanguage:   Go 1.21, TypeScript 5.x\nBackend:    Go stdlib + gorilla/websocket\nFrontend:   React 18 + Vite\nStyling:    Tailwind CSS\nDeploy:     Railway (backend) + Vercel (frontend)\nCI:         GitHub Actions\nTesting:    Go testing pkg + Vitest` },
    ],
  },
  {
    name: 'Robotic_Arm_Build',
    type: 'folder',
    description: 'Custom 6-DOF robotic arm with inverse kinematics',
    children: [
      { name: 'README.md', type: 'txt', description: 'Build documentation', content: `# 6-DOF Robotic Arm 🦾\n\nCustom-built articulated robotic arm with 6 degrees of freedom.\n\n## Specifications\n- Joints: 6 revolute joints (J1-J6)\n- Actuators: MG996R servos (J1-J3), SG90 (J4-J6)\n- Controller: Arduino Mega 2560\n- Material: PLA+ (Bambu Lab A1)\n- Reach: ~450mm\n\n## Kinematics\nForward kinematics via DH parameters.\nInverse kinematics using Jacobian transpose method\nwith damped least squares for singularity handling.\n\n## Control\nSerial protocol from host PC to Arduino.\nPython GUI for joint-space and Cartesian control.\nTrajectory planning with trapezoidal velocity profiles.` },
      { name: 'blueprints.bmp', type: 'bmp', description: 'Mechanical drawings & dimensions', content: `╔══════════════════════════════════════╗\n║      ROBOTIC ARM - TOP VIEW          ║\n╠══════════════════════════════════════╣\n║                                      ║\n║    [Base] ─── [J1: Yaw 360°]        ║\n║      │                               ║\n║    [Link1: 150mm]                    ║\n║      │                               ║\n║    [J2: Pitch ±90°]                  ║\n║      │                               ║\n║    [Link2: 150mm]                    ║\n║      │                               ║\n║    [J3: Pitch ±120°]                 ║\n║      │                               ║\n║    [Link3: 100mm]                    ║\n║      │                               ║\n║    [J4: Roll] ── [J5: Pitch]         ║\n║                    │                  ║\n║              [J6: Roll/Gripper]       ║\n║                                      ║\n║  Total Reach: ~450mm                 ║\n║  Payload: ~200g                      ║\n║  Resolution: ~0.5mm (tip)            ║\n╚══════════════════════════════════════╝` },
      { name: 'kinematics.py', type: 'py', description: 'IK solver implementation', content: `# Jacobian-based Inverse Kinematics Solver\nimport numpy as np\n\ndef dh_transform(theta, d, a, alpha):\n    \"\"\"Denavit-Hartenberg transformation matrix\"\"\"\n    ct, st = np.cos(theta), np.sin(theta)\n    ca, sa = np.cos(alpha), np.sin(alpha)\n    return np.array([\n        [ct, -st*ca,  st*sa, a*ct],\n        [st,  ct*ca, -ct*sa, a*st],\n        [0,   sa,     ca,    d   ],\n        [0,   0,      0,     1   ]\n    ])\n\ndef jacobian(q, dh_params):\n    \"\"\"Compute 6x6 Jacobian matrix\"\"\"\n    # ... forward kinematics chain\n    pass\n\ndef ik_solve(target, q0, dh_params, tol=1e-3, max_iter=100):\n    \"\"\"Damped Least Squares IK solver\"\"\"\n    q = q0.copy()\n    damping = 0.1\n    for i in range(max_iter):\n        T = forward_kinematics(q, dh_params)\n        error = pose_error(target, T)\n        if np.linalg.norm(error) < tol:\n            return q\n        J = jacobian(q, dh_params)\n        JtJ = J.T @ J + damping**2 * np.eye(6)\n        dq = np.linalg.solve(JtJ, J.T @ error)\n        q += dq\n    return q  # best effort` },
      { name: 'parts_list.txt', type: 'txt', description: 'Bill of materials', content: `ROBOTIC ARM - BILL OF MATERIALS\n================================\nQty  Part                    Cost\n---  ----                    ----\n 3x  MG996R Servo Motor      $24\n 3x  SG90 Micro Servo        $9\n 1x  Arduino Mega 2560       $15\n 1x  PCA9685 PWM Driver      $6\n 1x  12V 5A Power Supply     $12\n 6x  PLA+ Filament Spools    $90\n 1x  M3 Hardware Kit         $8\n 2x  Bearing 608ZZ           $4\n 1x  Gripper Spring Kit      $3\n---\nTotal:                       ~$171\n\nPrint Time: ~48 hours (Bambu Lab A1)\nAssembly Time: ~6 hours` },
    ],
  },
  {
    name: 'Bambu_Computer_Vision',
    type: 'folder',
    description: 'Real-time 3D print monitoring with OpenCV + YOLO',
    children: [
      { name: 'README.md', type: 'txt', description: 'Project overview', content: `# Bambu Lab CV Monitor 📸\n\nReal-time 3D print failure detection system.\n\n## How It Works\n1. USB camera captures print bed at 1080p/30fps\n2. YOLO v8 nano model detects print artifacts\n3. OpenCV processes frames for spaghetti/blob detection\n4. Alert system triggers on confidence > 0.85\n5. Optional: auto-pause via Bambu API\n\n## Model Training\n- Dataset: ~2000 labeled images of print failures\n- Classes: spaghetti, blob, layer_shift, stringing\n- mAP@0.5: 0.91 on validation set\n- Inference: ~18ms per frame on RTX GPU\n\n## Stack\n- Python 3.12 + OpenCV 4.9\n- Ultralytics YOLO v8\n- ONNX Runtime (for NPU offload experiments)\n- FastAPI dashboard + WebSocket live view` },
      { name: 'detect.py', type: 'py', description: 'Main detection pipeline', content: `#!/usr/bin/env python3\n\"\"\"Bambu Lab Print Failure Detection\"\"\"\nimport cv2\nfrom ultralytics import YOLO\n\nmodel = YOLO('best.pt')  # trained model\ncap = cv2.VideoCapture(0)\n\nALERT_THRESHOLD = 0.85\n\nwhile True:\n    ret, frame = cap.read()\n    if not ret:\n        break\n\n    results = model(frame, conf=0.5)\n\n    for r in results:\n        for box in r.boxes:\n            cls = int(box.cls[0])\n            conf = float(box.conf[0])\n            label = model.names[cls]\n\n            if conf > ALERT_THRESHOLD:\n                print(f\"ALERT: {label} ({conf:.2f})\")\n                # trigger_pause_api()\n\n            x1, y1, x2, y2 = map(int, box.xyxy[0])\n            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 2)\n            cv2.putText(frame, f\"{label} {conf:.2f}\",\n                       (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX,\n                       0.5, (0, 0, 255), 2)\n\n    cv2.imshow('Bambu Monitor', frame)\n    if cv2.waitKey(1) & 0xFF == ord('q'):\n        break` },
      { name: 'tech_stack.txt', type: 'txt', description: 'Technologies used', content: `Bambu CV Monitor - Technology Stack\n====================================\nLanguage:    Python 3.12\nCV:          OpenCV 4.9, Ultralytics YOLO v8\nML Runtime:  PyTorch, ONNX Runtime\nDashboard:   FastAPI + Jinja2 + WebSocket\nCamera:      USB 1080p @ 30fps\nHardware:    AMD Ryzen AI Max+ 395\n             AMD XDNA 2 NPU (experimental)\nPrinter:     Bambu Lab A1\nDeployment:  Docker on local network` },
    ],
  },
  {
    name: 'Office_DAM_Integration',
    type: 'folder',
    description: 'Enterprise digital asset management integration',
    children: [
      { name: 'README.md', type: 'txt', description: 'Architecture docs', content: `# Office DAM Integration 🏢\n\nEnterprise Digital Asset Management system integrated\nwith Microsoft 365 ecosystem.\n\n## Architecture\n- SharePoint & OneDrive webhook subscriptions\n- Delta sync for incremental updates\n- Message queue for async processing\n- Metadata extraction pipeline\n\n## Tech Stack\n- Node.js + Express\n- Microsoft Graph API\n- PostgreSQL\n- Redis (caching + queue)\n- React admin dashboard\n\n## Features\n- Automatic file indexing on upload/modify\n- Full-text search across documents\n- Version history tracking\n- Permission-aware access control\n- Batch export for compliance audits` },
      { name: 'architecture.txt', type: 'txt', description: 'System architecture', content: `SYSTEM ARCHITECTURE\n═══════════════════\n\n┌─────────────┐    Webhook     ┌──────────────┐\n│ SharePoint  │───────────────→│ Express API  │\n│ OneDrive    │    Events      │ (Node.js)    │\n└─────────────┘                └──────┬───────┘\n                                      │\n                                ┌─────▼──────┐\n                                │ Redis Queue │\n                                └─────┬──────┘\n                                      │\n                              ┌───────▼────────┐\n                              │ Worker Process  │\n                              │ - Delta sync    │\n                              │ - Metadata      │\n                              │ - Indexing       │\n                              └───────┬────────┘\n                                      │\n                              ┌───────▼────────┐\n                              │  PostgreSQL    │\n                              │  + pgvector    │\n                              └────────────────┘` },
      { name: 'setup_guide.txt', type: 'txt', description: 'Deployment instructions', content: `DEPLOYMENT GUIDE\n================\n1. Register Azure AD app\n2. Configure Graph API permissions\n3. Set webhook endpoint URL\n4. Run: docker-compose up -d\n5. Seed database: npm run db:migrate\n6. Start workers: npm run worker:start\n\nEnvironment Variables:\n  AZURE_CLIENT_ID=xxx\n  AZURE_CLIENT_SECRET=xxx\n  AZURE_TENANT_ID=xxx\n  DATABASE_URL=postgres://...\n  REDIS_URL=redis://...` },
    ],
  },
]

const fileTypeColors: Record<string, string> = {
  folder: '#e8b230',
  app: '#0078d4',
  exe: '#808080',
  txt: '#000080',
  bmp: '#008000',
  html: '#cc4400',
  py: '#3572A5',
  go: '#00ADD8',
}

const fileTypeIcons: Record<string, string> = {
  folder: '📁',
  app: '📦',
  exe: '⚙️',
  txt: '📄',
  bmp: '🖼️',
  html: '🌐',
  py: '🐍',
  go: '🔷',
}

export function ProjectsContent() {
  const [path, setPath] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [openFile, setOpenFile] = useState<FileItem | null>(null)

  // Navigate to current folder
  let currentItems = projectTree
  for (const segment of path) {
    const folder = currentItems.find(f => f.name === segment)
    if (folder?.children) {
      currentItems = folder.children
    }
  }

  const handleDoubleClick = (item: FileItem) => {
    if (item.type === 'folder' && item.children) {
      setPath([...path, item.name])
      setSelected(null)
      setOpenFile(null)
    } else if (item.content) {
      setOpenFile(item)
    }
  }

  const goUp = () => {
    if (openFile) {
      setOpenFile(null)
    } else {
      setPath(path.slice(0, -1))
      setSelected(null)
    }
  }

  const addressPath = 'C:\\Users\\Admin\\Projects' + (path.length ? '\\' + path.join('\\') : '')

  return (
    <div className="h-full flex flex-col bg-[#ffffff]">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <span className="text-[12px] font-sans text-[#000000]">File</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Edit</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">View</span>
        <span className="text-[12px] font-sans text-[#000000] ml-3">Help</span>
      </div>

      {/* Navigation bar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
        <button
          className="win-button text-[11px] h-[20px] px-3"
          onClick={goUp}
          disabled={path.length === 0 && !openFile}
        >
          ← Back
        </button>
        <button
          className="win-button text-[11px] h-[20px] px-3"
          onClick={() => { setPath([]); setSelected(null); setOpenFile(null) }}
        >
          🏠
        </button>
        <div className="flex-1 win-border-field bg-[#ffffff] px-2 h-[20px] flex items-center">
          <span className="text-[12px] font-sans text-[#000000]">
            📁 {addressPath}{openFile ? '\\' + openFile.name : ''}
          </span>
        </div>
      </div>

      {/* Content area */}
      {openFile ? (
        /* File viewer */
        <div className="flex-1 overflow-auto">
          <div className="p-1 bg-[var(--win-bg)] border-b border-b-[var(--win-shadow)]">
            <span className="text-[12px] font-sans text-[#000000] font-bold">
              {fileTypeIcons[openFile.type] || '📄'} {openFile.name}
            </span>
          </div>
          <pre className="p-3 text-[13px] font-mono text-[#000000] leading-relaxed whitespace-pre-wrap bg-[#ffffff]">
            {openFile.content}
          </pre>
        </div>
      ) : (
        /* Folder grid */
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-4 gap-4">
            {currentItems.map((item) => (
              <button
                key={item.name}
                className={`flex flex-col items-center gap-1 p-3 cursor-pointer group focus:outline-none ${
                  selected === item.name ? 'bg-[var(--win-titlebar)] bg-opacity-20' : ''
                }`}
                onClick={() => setSelected(item.name)}
                onDoubleClick={() => handleDoubleClick(item)}
                title={item.description}
              >
                <span className="text-[32px] leading-none">{fileTypeIcons[item.type] || '📄'}</span>
                <span
                  className={`text-[12px] font-sans text-center leading-tight ${
                    selected === item.name
                      ? 'bg-[var(--win-titlebar)] text-[var(--win-titlebar-text)] px-1'
                      : 'text-[#000000]'
                  }`}
                >
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Status bar */}
      <div className="flex items-center px-2 py-[2px] bg-[var(--win-bg)] border-t border-t-[var(--win-shadow)]">
        <span className="text-[11px] font-sans text-[#000000]">
          {openFile
            ? `${openFile.name} — ${openFile.description}`
            : selected
              ? currentItems.find(p => p.name === selected)?.description
              : `${currentItems.length} object(s)`}
        </span>
      </div>
    </div>
  )
}
