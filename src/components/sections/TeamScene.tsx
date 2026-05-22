"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// ─── Data ─────────────────────────────────────────────────────────────────────

const MEMBERS = [
  {
    name: "Laura Correa Botero",
    role: "Directora de Agencia",
    color: "#F5A41C",
    photo: null,
    initials: "LC",
    bio: "Lidera la visión estratégica de YSM. Con años construyendo marcas locales en Caldas, es quien convierte cada proyecto en un resultado real para las empresas de Manizales.",
  },
  {
    name: "Daniel Hoyos Gómez",
    role: "Cofundador & Estrategia",
    color: "#1D3A6E",
    photo: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/team/daniel-hoyos.jpg`,
    initials: "DH",
    bio: "Cofundador y cerebro estratégico de YSM. Especialista en crear contenido de alto impacto que posiciona marcas en los mercados más competitivos de la región.",
  },
  {
    name: "Luis Alejandro Garzón",
    role: "Cofundador & Finanzas",
    color: "#2E6BC7",
    photo: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/team/luis-garzon.jpg`,
    initials: "LG",
    bio: "Cofundador y responsable financiero. Garantiza que cada peso invertido por los clientes genere resultados medibles, sostenibles y transparentes.",
  },
  {
    name: "Carolina Patiño",
    role: "Guionista & Administración",
    color: "#72B82C",
    photo: null,
    initials: "CP",
    bio: "Guionista creativa y pilar administrativo del equipo. Transforma ideas en narrativas que dan vida e identidad propia a cada marca del portafolio.",
  },
  {
    name: "María Daniela Rico",
    role: "Editora Senior",
    color: "#1A4D8E",
    photo: null,
    initials: "DR",
    bio: "Editora senior con ojo clínico para el detalle. Sus edits son la razón por la que los videos de los clientes se ven y se sienten premium.",
  },
  {
    name: "María Camila Pineda",
    role: "Artista Visual & Animación",
    color: "#E87C1E",
    photo: null,
    initials: "MP",
    bio: "Artista visual y animadora del equipo. Convierte conceptos en piezas visuales que sorprenden, conectan y quedan grabadas en la mente del espectador.",
  },
  {
    name: "Daniela Garzón Correa",
    role: "Comunidad & Administración",
    color: "#4A9B1A",
    photo: null,
    initials: "DG",
    bio: "El alma de la comunidad YSM. Gestiona relaciones, administra procesos y mantiene al equipo alineado con los valores y el propósito de la empresa.",
  },
  {
    name: "Sara Alzate Botero",
    role: "Asuntos Legales",
    color: "#1A3A82",
    photo: null,
    initials: "SA",
    bio: "Asegura que cada acción de YSM tenga un respaldo legal sólido. Protege a la empresa y a sus clientes en cada proyecto, alianza y colaboración.",
  },
] as const;

type Member = (typeof MEMBERS)[number];

// 4×2 grid with z-depth variation
const BASE_POSITIONS: [number, number, number][] = [
  [-4.5, 1.2, 0],
  [-1.5, 1.2, 0.2],
  [1.5, 1.2, -0.1],
  [4.5, 1.2, 0.15],
  [-4.5, -2.0, 0.1],
  [-1.5, -2.0, -0.15],
  [1.5, -2.0, 0.25],
  [4.5, -2.0, 0],
];

const EXPANDED_POS = new THREE.Vector3(0, -0.4, 2.8);
const EXPANDED_SCALE = new THREE.Vector3(1.55, 1.55, 1);
const NORMAL_SCALE = new THREE.Vector3(1, 1, 1);
const HOVER_SCALE = new THREE.Vector3(1.07, 1.07, 1);

// ─── Canvas texture helpers ───────────────────────────────────────────────────

function rr(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function makeGradientTexture(member: Member): THREE.CanvasTexture {
  const W = 512, H = 682;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.save();
  rr(ctx, 0, 0, W, H, 28);
  ctx.clip();

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, member.color + "ee");
  bg.addColorStop(1, member.color + "66");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle orbs
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(50 + i * 100, 70 + (i % 3) * 40, 30 + i * 10, 0, Math.PI * 2);
    ctx.fill();
  }

  // Initials circle
  ctx.beginPath();
  ctx.arc(W / 2, 195, 95, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(W / 2, 195, 80, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = "bold 76px system-ui, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(member.initials, W / 2, 197);

  // Bottom strip
  ctx.fillStyle = "rgba(0,0,0,0.42)";
  ctx.fillRect(0, H - 155, W, 155);

  // Accent line
  ctx.fillStyle = member.color;
  ctx.fillRect(0, H - 155, W, 4);

  ctx.fillStyle = "white";
  ctx.font = "bold 28px system-ui, Arial, sans-serif";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(member.name.split(" ").slice(0, 2).join(" "), W / 2, H - 105);

  ctx.fillStyle = "rgba(200,220,255,0.75)";
  ctx.font = "20px system-ui, Arial, sans-serif";
  const shortRole = member.role.length > 26 ? member.role.slice(0, 26) + "…" : member.role;
  ctx.fillText(shortRole, W / 2, H - 74);

  ctx.restore();
  return new THREE.CanvasTexture(canvas);
}

function makePhotoTexture(
  img: HTMLImageElement,
  member: Member
): THREE.CanvasTexture {
  const W = 512, H = 682;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.save();
  rr(ctx, 0, 0, W, H, 28);
  ctx.clip();

  const photoH = 395;
  const imgAspect = img.width / img.height;
  const tgtAspect = W / photoH;
  let sx = 0, sy = 0, sw = img.width, sh = img.height;
  if (imgAspect > tgtAspect) { sw = img.height * tgtAspect; sx = (img.width - sw) / 2; }
  else { sh = img.width / tgtAspect; sy = (img.height - sh) / 2; }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, photoH);

  const ov = ctx.createLinearGradient(0, photoH - 110, 0, photoH);
  ov.addColorStop(0, "rgba(0,0,0,0)");
  ov.addColorStop(1, "rgba(0,0,0,0.65)");
  ctx.fillStyle = ov;
  ctx.fillRect(0, 0, W, photoH);

  ctx.fillStyle = "rgba(6,10,22,0.96)";
  ctx.fillRect(0, photoH, W, H - photoH);

  ctx.fillStyle = member.color;
  ctx.fillRect(0, photoH, W, 4);

  ctx.fillStyle = "white";
  ctx.font = "bold 28px system-ui, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(member.name.split(" ").slice(0, 2).join(" "), W / 2, photoH + 70);

  ctx.fillStyle = "rgba(200,220,255,0.75)";
  ctx.font = "20px system-ui, Arial, sans-serif";
  ctx.fillText(member.role, W / 2, photoH + 105);

  ctx.restore();
  return new THREE.CanvasTexture(canvas);
}

// ─── Dim Overlay ──────────────────────────────────────────────────────────────

function DimOverlay({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, visible ? 0.8 : 0, 0.08);
    meshRef.current.visible = mat.opacity > 0.01;
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 1.8]}
      visible={false}
      onClick={onClose}
    >
      <planeGeometry args={[40, 25]} />
      <meshBasicMaterial
        color="#030912"
        transparent
        opacity={0}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── Bio Panel ────────────────────────────────────────────────────────────────

function BioPanel({
  selectedIndex,
  onClose,
}: {
  selectedIndex: number | null;
  onClose: () => void;
}) {
  const member = selectedIndex !== null ? MEMBERS[selectedIndex] : null;
  const visible = selectedIndex !== null;

  return (
    <Html
      position={[0, -1.65, 2.9]}
      center
      zIndexRange={[20, 0]}
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.35s ease",
        pointerEvents: visible ? "auto" : "none",
        userSelect: "none",
      }}
    >
      <div
        style={{
          width: "270px",
          textAlign: "center",
          fontFamily: "'system-ui', '-apple-system', 'sans-serif'",
        }}
      >
        <div
          style={{
            padding: "20px 22px 18px",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(3,9,20,0.6) 25%, rgba(3,9,20,0.88) 100%)",
            borderRadius: "0 0 14px 14px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "rgba(210,228,255,0.92)",
              lineHeight: "1.75",
              margin: "0 0 16px",
              textShadow: "0 1px 8px rgba(0,0,0,0.8)",
            }}
          >
            {member?.bio}
          </p>
          <button
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.38)",
              cursor: "pointer",
              background: "none",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "20px",
              padding: "4px 14px",
              letterSpacing: "0.06em",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onClick={onClose}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
              (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.35)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.38)";
              (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            ✕ cerrar
          </button>
        </div>
      </div>
    </Html>
  );
}

// ─── Team Card ────────────────────────────────────────────────────────────────

function TeamCard({
  member,
  index,
  selected,
  dimmed,
  onSelect,
}: {
  member: Member;
  index: number;
  selected: boolean;
  dimmed: boolean;
  onSelect: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const basePos = useMemo(
    () => new THREE.Vector3(...BASE_POSITIONS[index]),
    [index]
  );
  const phase = index * 0.85;
  const speed = 0.45 + index * 0.07;

  // Load texture
  useEffect(() => {
    if (member.photo) {
      const img = new window.Image();
      img.src = member.photo;
      img.onload = () => setTexture(makePhotoTexture(img, member));
    } else {
      setTexture(makeGradientTexture(member));
    }
  }, [member]);

  useFrame((state) => {
    if (!meshRef.current || !texture) return;
    const t = state.clock.elapsedTime;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;

    if (selected) {
      meshRef.current.position.lerp(EXPANDED_POS, 0.07);
      meshRef.current.scale.lerp(EXPANDED_SCALE, 0.07);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x, 0, 0.1
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y, 0, 0.1
      );
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, 1.0, 0.08);
    } else {
      const floatY = Math.sin(t * speed + phase) * 0.1;
      const floatX = Math.cos(t * speed * 0.65 + phase) * 0.03;
      const rotX = Math.sin(t * speed * 0.5 + phase) * 0.022;
      const rotY = Math.cos(t * speed * 0.35 + phase) * 0.018;

      const target = basePos
        .clone()
        .add(new THREE.Vector3(floatX, floatY, 0));
      meshRef.current.position.lerp(target, 0.04);

      const targetScale = hovered && !dimmed ? HOVER_SCALE : NORMAL_SCALE;
      meshRef.current.scale.lerp(targetScale, 0.08);

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x, rotX, 0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y, rotY, 0.05
      );

      mat.opacity = THREE.MathUtils.lerp(
        mat.opacity, dimmed ? 0.14 : 1.0, 0.07
      );
    }
  });

  if (!texture) return null;

  return (
    <mesh
      ref={meshRef}
      position={BASE_POSITIONS[index]}
      onPointerEnter={() => {
        if (!dimmed) {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <planeGeometry args={[1.7, 2.27]} />
      <meshStandardMaterial map={texture} transparent />
    </mesh>
  );
}

// ─── Particles ────────────────────────────────────────────────────────────────

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 90;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color("#1D3A6E");
    const c2 = new THREE.Color("#F5A41C");
    const c3 = new THREE.Color("#72B82C");
    const palette = [c1, c2, c3];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3;
      const c = palette[Math.floor(Math.random() * 3)];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.01;
      ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.006) * 0.04;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.07} vertexColors transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (i: number) => {
    setSelectedIndex((prev) => (prev === i ? null : i));
  };

  const handleDeselect = () => setSelectedIndex(null);

  useFrame(({ pointer }) => {
    if (!groupRef.current || selectedIndex !== null) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, pointer.x * 0.08, 0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, -pointer.y * 0.05, 0.04
    );
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 8, 6]} intensity={0.5} />
      <pointLight position={[-5, 4, 5]} color="#1D3A6E" intensity={1.6} />
      <pointLight position={[5, -4, 5]} color="#F5A41C" intensity={1.0} />
      <pointLight position={[0, 0, 6]} color="#72B82C" intensity={0.4} />

      <DimOverlay visible={selectedIndex !== null} onClose={handleDeselect} />

      <ParticleField />

      <group ref={groupRef}>
        {MEMBERS.map((member, i) => (
          <TeamCard
            key={member.name}
            member={member}
            index={i}
            selected={selectedIndex === i}
            dimmed={selectedIndex !== null && selectedIndex !== i}
            onSelect={() => handleSelect(i)}
          />
        ))}
      </group>

      <BioPanel selectedIndex={selectedIndex} onClose={handleDeselect} />
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function TeamScene() {
  return (
    <Canvas
      camera={{ position: [0, -0.4, 7], fov: 58 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "600px" }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  );
}
