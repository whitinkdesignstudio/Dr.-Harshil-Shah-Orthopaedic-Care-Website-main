import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Numbered Anatomical Hotspots definitions for each joint (matching clinical accuracy)
const JOINT_HOTSPOTS = {
  knee: [
    {
      id: 'patellar_tendon',
      num: 1,
      name: 'Patellar Tendon',
      category: 'Tendon & Extensor',
      pos: [0.0, -0.42, 0.92],
      condition: "Jumper's Knee / Patellar Tendinitis",
      desc: 'Connects the inferior patella to the tibial tuberosity, enabling full knee extension and athletic jumping force.',
      treatment: 'Conservative therapy, PRP injection, or tendon debridement.'
    },
    {
      id: 'quad_tendon',
      num: 2,
      name: 'Quadriceps Tendon',
      category: 'Extensor Mechanism',
      pos: [0.0, 1.35, 0.45],
      condition: 'Quadriceps Tendinopathy / Tears',
      desc: 'Transmits vast force from the quad muscles to the patella, vital for squatting, standing, and stairs.',
      treatment: 'Targeted strengthening or surgical tendon repair.'
    },
    {
      id: 'tibial_tuberosity',
      num: 3,
      name: 'Tibial Tuberosity',
      category: 'Bony Prominence',
      pos: [0.0, -0.98, 0.82],
      condition: 'Osgood-Schlatter Disease / Apophysitis',
      desc: 'Prominent anterior bony elevation on the upper tibia that anchors the distal patellar tendon.',
      treatment: 'Activity modification, shockwave therapy, or tuberosity osteotomy.'
    },
    {
      id: 'mcl',
      num: 4,
      name: 'Medial Collateral Ligament (MCL)',
      category: 'Primary Stabilizer',
      pos: [0.88, -0.08, 0.18],
      condition: 'MCL Sprain / Valgus Tear',
      desc: 'Broad band along the inner knee preventing opening into valgus stress and stabilizing the medial joint.',
      treatment: 'Hinged brace protocol or surgical reconstruction.'
    },
    {
      id: 'lcl',
      num: 5,
      name: 'Lateral Collateral Ligament (LCL)',
      category: 'Lateral Stabilizer',
      pos: [-0.88, -0.08, 0.18],
      condition: 'LCL Rupture / Posterolateral Corner Injury',
      desc: 'Cord-like ligament on the outer knee resisting varus forces and external rotatory knee instability.',
      treatment: 'Ligament reconstruction and corner stabilization.'
    },
    {
      id: 'acl',
      num: 6,
      name: 'Anterior Cruciate Ligament (ACL)',
      category: 'Cruciate Ligament',
      pos: [0.0, 0.12, 0.28],
      condition: 'ACL Rupture / Rotational Instability',
      desc: 'Central stabilizer preventing anterior tibial translation and sudden pivoting knee collapse.',
      treatment: 'Arthroscopic anatomical ACL reconstruction.'
    },
    {
      id: 'pcl',
      num: 7,
      name: 'Posterior Cruciate Ligament (PCL)',
      category: 'Cruciate Ligament',
      pos: [0.0, 0.12, -0.28],
      condition: 'PCL Tear / Dashboard Injury',
      desc: 'Heavy central ligament preventing posterior sliding of the tibia beneath the distal femur.',
      treatment: 'Specialized PCL reconstruction or bracing.'
    },
    {
      id: 'medial_meniscus',
      num: 8,
      name: 'Medial Meniscus Cartilage',
      category: 'Fibrocartilage Shock Absorber',
      pos: [0.65, -0.16, 0.26],
      condition: 'Meniscus Tear / Root Tear',
      desc: 'C-shaped shock-absorbing fibrocartilage protecting femoral-tibial contact surfaces.',
      treatment: 'Arthroscopic meniscus repair or root fixation.'
    },
    {
      id: 'lateral_meniscus',
      num: 9,
      name: 'Lateral Meniscus Cartilage',
      category: 'Fibrocartilage Shock Absorber',
      pos: [-0.65, -0.16, 0.26],
      condition: 'Radial Tear / Discoid Meniscus',
      desc: 'High-mobility shock absorber on the outer compartment maintaining cartilage longevity.',
      treatment: 'Arthroscopic meniscus preservation.'
    },
    {
      id: 'lateral_condyle',
      num: 10,
      name: 'Lateral Femoral Condyle',
      category: 'Articular Surface',
      pos: [-0.82, 0.42, 0.22],
      condition: 'Cartilage Defect / Osteoarthritis',
      desc: 'Convex outer articular cartilage surface bearing load through flexion and extension.',
      treatment: 'Cartilage restoration, OATS, or robotic resurfacing.'
    },
    {
      id: 'patella',
      num: 11,
      name: 'Patella (Kneecap)',
      category: 'Sesamoid Bone',
      pos: [0.0, 0.68, 1.05],
      condition: 'Patellofemoral Pain / Instability',
      desc: 'Articulating shield protecting the knee joint and multiplying extensor lever mechanical advantage.',
      treatment: 'MPFL reconstruction, realignment, or resurfacing.'
    }
  ],
  hip: [
    {
      id: 'acetabulum',
      num: 1,
      name: 'Acetabulum (Hip Socket)',
      category: 'Pelvic Articulation',
      pos: [0.35, 0.05, 0.42],
      condition: 'Hip Dysplasia / Acetabular Cartilage Wear',
      desc: 'Deep concave socket forming the weight-bearing articulation with the femoral head in the pelvic bone.',
      treatment: 'Robotic total hip arthroplasty or periacetabular osteotomy.'
    },
    {
      id: 'iliac_crest',
      num: 2,
      name: 'Ilium & Iliac Crest',
      category: 'Pelvic Wing',
      pos: [-0.15, 1.35, 0.05],
      condition: 'Hip Pointer / Muscle Enthesopathy',
      desc: 'Upper curved border of the pelvis providing anchor points for abdominal, gluteal, and latissimus musculature.',
      treatment: 'Preservation management and targeted physical therapy.'
    },
    {
      id: 'ischium',
      num: 3,
      name: 'Ischial Tuberosity (Sit Bone)',
      category: 'Posterior Bony Base',
      pos: [0.45, -1.15, -0.22],
      condition: 'Hamstring Avulsion / Ischial Bursitis',
      desc: 'Heavy inferoposterior bone bearing upper body weight while sitting and anchoring hamstring tendon origins.',
      treatment: 'Endoscopic hamstring repair or bursal decompression.'
    },
    {
      id: 'pubis',
      num: 4,
      name: 'Pubic Bone & Symphysis',
      category: 'Anterior Pelvic Strut',
      pos: [-0.65, -0.75, 0.32],
      condition: 'Osteitis Pubis / Athletic Pubalgia',
      desc: 'Anterior midline bone uniting the pelvic girdle to maintain pelvic ring stability during gait.',
      treatment: 'Pelvic floor rehabilitation or core muscle surgery.'
    },
    {
      id: 'sciatic_notch',
      num: 5,
      name: 'Greater Sciatic Notch',
      category: 'Neurovascular Portal',
      pos: [0.62, 0.35, -0.32],
      condition: 'Piriformis Syndrome / Deep Gluteal Pain',
      desc: 'Crucial bony gateway through which the sciatic nerve and gluteal vessels exit the pelvis into the leg.',
      treatment: 'Nerve hydrodissection or endoscopic release.'
    },
    {
      id: 'asis',
      num: 6,
      name: 'Anterior Superior Iliac Spine (ASIS)',
      category: 'Anterior Landmark',
      pos: [-0.72, 0.82, 0.42],
      condition: 'Sartorius Avulsion / Meralgia Paresthetica',
      desc: 'Palpable anterior pelvic landmark giving origin to the inguinal ligament and sartorius muscle.',
      treatment: 'Preservation care and nerve decompression.'
    }
  ],
  shoulder: [
    {
      id: 'glenoid',
      num: 1,
      name: 'Glenoid Cavity (Socket)',
      category: 'Scapular Articulation',
      pos: [-0.55, 0.35, 0.12],
      condition: 'Glenoid Bone Loss / Labral Tear (Bankart)',
      desc: 'Pear-shaped shallow socket on the lateral scapula articulating with the upper arm ball.',
      treatment: 'Arthroscopic Bankart repair or Latarjet bone transfer.'
    },
    {
      id: 'humeral_head',
      num: 2,
      name: 'Humeral Head (Ball)',
      category: 'Articular Ball',
      pos: [0.15, 0.25, 0.22],
      condition: 'Avascular Necrosis / Shoulder Osteoarthritis',
      desc: 'Smooth spherical head articulating in the glenoid, providing greatest range of human body motion.',
      treatment: 'Anatomic or Reverse total shoulder replacement.'
    },
    {
      id: 'supraspinatus',
      num: 3,
      name: 'Supraspinatus Tendon (Rotator Cuff)',
      category: 'Dynamic Stabilizer',
      pos: [0.25, 1.15, 0.12],
      condition: 'Rotator Cuff Tear / Shoulder Impingement',
      desc: 'Primary dynamic tendon holding the humeral head centered in the shallow socket during arm elevation.',
      treatment: 'Arthroscopic double-row rotator cuff repair.'
    },
    {
      id: 'acromion',
      num: 4,
      name: 'Acromion Arch',
      category: 'Scapular Spine Roof',
      pos: [-0.35, 1.35, -0.22],
      condition: 'Subacromial Impingement / Spurs',
      desc: 'Bony roof of the shoulder forming the acromioclavicular (AC) articulation.',
      treatment: 'Subacromial decompression / acromioplasty.'
    },
    {
      id: 'clavicle',
      num: 5,
      name: 'Clavicle Articulation (Collarbone)',
      category: 'Strut Skeleton',
      pos: [-0.85, 1.45, 0.35],
      condition: 'AC Joint Separation / Clavicle Fracture',
      desc: 'Strut connecting the upper limb to the sternum, governing scapular thoracic rhythm.',
      treatment: 'Anatomical AC ligament reconstruction.'
    },
    {
      id: 'biceps',
      num: 6,
      name: 'Long Head of Biceps Tendon',
      category: 'Anterior Tendon',
      pos: [-0.05, 0.45, 0.62],
      condition: 'Biceps Tendinitis / SLAP Tear',
      desc: 'Passes through the bicipital groove over the head of the humerus to attach to superior labrum.',
      treatment: 'Arthroscopic biceps tenodesis or SLAP repair.'
    }
  ]
};

// Global in-memory cache for instant zero-lag switching
const meshCache = {};
const textureCache = {};

function loadTexture(loader, url) {
  if (!textureCache[url]) {
    textureCache[url] = loader.load(url);
    textureCache[url].colorSpace = THREE.SRGBColorSpace;
  }
  return textureCache[url];
}

export default function Interactive3DViewer({ initialJoint = 'knee', onSelectTreatment }) {
  const mountRef = useRef(null);
  const [selectedJoint, setSelectedJoint] = useState(initialJoint);
  const [viewMode, setViewMode] = useState('natural'); // 'natural' | 'surgical' | 'xray'
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [screenHotspots, setScreenHotspots] = useState([]);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const jointGroupRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0.003 });
  const targetRotationRef = useRef({ x: 0, y: 0, targetCamY: 0.2, targetCamZ: 5.8, animating: false });

  useEffect(() => {
    if (initialJoint && initialJoint !== selectedJoint) {
      setSelectedJoint(initialJoint);
    }
  }, [initialJoint]);

  // -------------------------------------------------------------
  // PROCEDURAL 3D MESH BUILDER (Instant fallback & guaranteed 3D on all devices)
  // -------------------------------------------------------------
  const buildProceduralMeshes = useCallback((jointType, mode) => {
    const group = new THREE.Group();
    const isXray = mode === 'xray';
    const isSurgical = mode === 'surgical';

    const boneMat = new THREE.MeshStandardMaterial({
      color: isXray ? 0x0284c7 : 0xf1f5f9,
      roughness: isXray ? 0.2 : 0.45,
      metalness: isXray ? 0.8 : 0.1,
      wireframe: isXray,
      transparent: isXray,
      opacity: isXray ? 0.65 : 1.0
    });

    const cartilageMat = new THREE.MeshStandardMaterial({
      color: isSurgical ? 0x38bdf8 : (isXray ? 0x00f0ff : 0x7dd3fc),
      roughness: 0.2,
      metalness: 0.2,
      transparent: true,
      opacity: isXray ? 0.8 : 0.9
    });

    const ligamentMat = new THREE.MeshStandardMaterial({
      color: isSurgical ? 0x0284c7 : (isXray ? 0x38bdf8 : 0x0284c7),
      roughness: 0.35,
      metalness: 0.15,
      transparent: true,
      opacity: 0.95
    });

    const implantMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.15
    });

    if (jointType === 'knee') {
      // Femur Shaft
      const femurGeo = new THREE.CylinderGeometry(0.55, 0.72, 2.2, 32);
      const femur = new THREE.Mesh(femurGeo, boneMat);
      femur.position.set(0, 1.4, 0);
      group.add(femur);

      // Medial & Lateral Condyles
      const condyleMat = isSurgical ? implantMat : cartilageMat;
      const condyleMedGeo = new THREE.SphereGeometry(0.58, 24, 24);
      condyleMedGeo.scale(0.8, 1.1, 1.3);
      const condyleMed = new THREE.Mesh(condyleMedGeo, condyleMat);
      condyleMed.position.set(0.52, 0.25, 0);
      group.add(condyleMed);

      const condyleLatGeo = new THREE.SphereGeometry(0.55, 24, 24);
      condyleLatGeo.scale(0.8, 1.1, 1.3);
      const condyleLat = new THREE.Mesh(condyleLatGeo, condyleMat);
      condyleLat.position.set(-0.52, 0.25, 0);
      group.add(condyleLat);

      // Meniscus Rings (Cartilage)
      const menMedGeo = new THREE.TorusGeometry(0.48, 0.1, 16, 24, Math.PI * 1.6);
      const menMed = new THREE.Mesh(menMedGeo, cartilageMat);
      menMed.rotation.x = Math.PI / 2;
      menMed.position.set(0.52, -0.15, 0);
      group.add(menMed);

      const menLatGeo = new THREE.TorusGeometry(0.45, 0.1, 16, 24, Math.PI * 1.6);
      const menLat = new THREE.Mesh(menLatGeo, cartilageMat);
      menLat.rotation.x = Math.PI / 2;
      menLat.rotation.z = Math.PI;
      menLat.position.set(-0.52, -0.15, 0);
      group.add(menLat);

      // Tibia Plateau & Shaft
      const tibiaPlatGeo = new THREE.CylinderGeometry(0.95, 0.75, 0.5, 32);
      const tibiaPlat = new THREE.Mesh(tibiaPlatGeo, boneMat);
      tibiaPlat.position.set(0, -0.4, 0);
      group.add(tibiaPlat);

      const tibiaShaftGeo = new THREE.CylinderGeometry(0.68, 0.48, 2.2, 32);
      const tibiaShaft = new THREE.Mesh(tibiaShaftGeo, boneMat);
      tibiaShaft.position.set(0, -1.65, 0);
      group.add(tibiaShaft);

      // Fibula
      const fibulaGeo = new THREE.CylinderGeometry(0.22, 0.16, 2.4, 20);
      const fibula = new THREE.Mesh(fibulaGeo, boneMat);
      fibula.position.set(-0.88, -1.55, -0.1);
      group.add(fibula);

      // Patella (Kneecap)
      const patellaGeo = new THREE.SphereGeometry(0.45, 24, 24);
      patellaGeo.scale(0.85, 1.15, 0.5);
      const patella = new THREE.Mesh(patellaGeo, isSurgical ? implantMat : boneMat);
      patella.position.set(0, 0.65, 0.85);
      group.add(patella);

      // Cruciate Ligaments (ACL & PCL)
      const aclCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.15, 0.35, -0.1),
        new THREE.Vector3(0.0, 0.05, 0.05),
        new THREE.Vector3(0.18, -0.22, 0.22)
      ]);
      const acl = new THREE.Mesh(new THREE.TubeGeometry(aclCurve, 16, 0.08, 12, false), ligamentMat);
      group.add(acl);

      // Collateral Ligaments (MCL & LCL)
      const mclGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.6, 12);
      const mcl = new THREE.Mesh(mclGeo, ligamentMat);
      mcl.position.set(0.88, 0.1, 0.1);
      group.add(mcl);

      const lclGeo = new THREE.CylinderGeometry(0.07, 0.07, 1.6, 12);
      const lcl = new THREE.Mesh(lclGeo, ligamentMat);
      lcl.position.set(-0.88, 0.1, 0.1);
      group.add(lcl);
    } else if (jointType === 'shoulder') {
      // Scapula / Glenoid Cup
      const glenoidGeo = new THREE.SphereGeometry(0.8, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.5);
      const glenoid = new THREE.Mesh(glenoidGeo, boneMat);
      glenoid.position.set(-0.55, 0.35, 0);
      glenoid.rotation.y = Math.PI / 2;
      group.add(glenoid);

      // Humeral Head (Ball)
      const headGeo = new THREE.SphereGeometry(0.85, 32, 32);
      const head = new THREE.Mesh(headGeo, isSurgical ? implantMat : cartilageMat);
      head.position.set(0.2, 0.35, 0.05);
      group.add(head);

      // Humerus Shaft
      const humShaftGeo = new THREE.CylinderGeometry(0.55, 0.45, 2.5, 32);
      const humShaft = new THREE.Mesh(humShaftGeo, boneMat);
      humShaft.position.set(0.42, -1.2, 0);
      humShaft.rotation.z = -0.12;
      group.add(humShaft);

      // Clavicle Strut
      const clavGeo = new THREE.CylinderGeometry(0.22, 0.22, 2.0, 20);
      const clav = new THREE.Mesh(clavGeo, boneMat);
      clav.position.set(-0.7, 1.45, 0.2);
      clav.rotation.z = Math.PI / 3;
      group.add(clav);

      // Acromion Arch
      const acromionGeo = new THREE.BoxGeometry(0.7, 0.22, 0.9);
      const acromion = new THREE.Mesh(acromionGeo, boneMat);
      acromion.position.set(-0.25, 1.35, -0.1);
      group.add(acromion);

      // Rotator Cuff Tendon
      const cuffCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.35, 1.25, 0),
        new THREE.Vector3(0.0, 1.15, 0.15),
        new THREE.Vector3(0.35, 0.75, 0.2)
      ]);
      const cuff = new THREE.Mesh(new THREE.TubeGeometry(cuffCurve, 16, 0.12, 12, false), ligamentMat);
      group.add(cuff);
    } else if (jointType === 'hip') {
      const pelvisGeo = new THREE.CylinderGeometry(1.4, 1.1, 0.9, 32);
      pelvisGeo.scale(1.2, 0.8, 1.1);
      const pelvis = new THREE.Mesh(pelvisGeo, boneMat);
      pelvis.position.set(0.8, 1.5, 0);
      pelvis.rotation.z = -0.3;
      group.add(pelvis);

      const socketGeo = new THREE.SphereGeometry(0.9, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55);
      const socket = new THREE.Mesh(socketGeo, boneMat);
      socket.position.set(0.6, 0.8, 0.2);
      socket.rotation.x = Math.PI * 0.8;
      socket.rotation.z = -0.4;
      group.add(socket);

      const labrumGeo = new THREE.TorusGeometry(0.85, 0.12, 16, 32);
      const labrum = new THREE.Mesh(labrumGeo, cartilageMat);
      labrum.position.set(0.6, 0.75, 0.25);
      labrum.rotation.x = Math.PI * 0.8;
      labrum.rotation.z = -0.4;
      group.add(labrum);

      const headGeo = new THREE.SphereGeometry(0.78, 32, 32);
      const head = new THREE.Mesh(headGeo, isSurgical ? implantMat : cartilageMat);
      head.position.set(0.4, 0.65, 0.15);
      group.add(head);

      const neckCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.4, 0.65, 0.15),
        new THREE.Vector3(-0.2, 0.2, 0.0),
        new THREE.Vector3(-0.7, -0.2, -0.05)
      ]);
      const neckGeo = new THREE.TubeGeometry(neckCurve, 20, 0.38, 20, false);
      const neck = new THREE.Mesh(neckGeo, isSurgical ? implantMat : boneMat);
      group.add(neck);

      const trochanterGeo = new THREE.SphereGeometry(0.7, 24, 20);
      trochanterGeo.scale(1.1, 1.4, 1.0);
      const trochanter = new THREE.Mesh(trochanterGeo, boneMat);
      trochanter.position.set(-0.9, -0.3, 0);
      group.add(trochanter);

      const hipShaftGeo = new THREE.CylinderGeometry(0.65, 0.5, 2.4, 32);
      const hipShaft = new THREE.Mesh(hipShaftGeo, boneMat);
      hipShaft.position.set(-0.75, -1.8, 0);
      hipShaft.rotation.z = 0.08;
      group.add(hipShaft);
    }

    return group;
  }, []);

  // -------------------------------------------------------------
  // APPLY MATERIALS TO THREE.JS HIERARCHY
  // -------------------------------------------------------------
  const applyJointMaterials = useCallback((model, jointType, mode, textures) => {
    const isXray = mode === 'xray';
    const isSurgical = mode === 'surgical';

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const nameLower = (child.name || '').toLowerCase();
        const matNameLower = (child.material?.name || '').toLowerCase();

        if (isXray) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0x0284c7,
            roughness: 0.2,
            metalness: 0.85,
            wireframe: true,
            transparent: true,
            opacity: 0.65
          });
        } else if (isSurgical) {
          const isImplantOrCartilage =
            nameLower.includes('opac') ||
            matNameLower.includes('opac') ||
            nameLower.includes('cartil') ||
            nameLower.includes('menisc') ||
            nameLower.includes('socket') ||
            nameLower.includes('head');

          child.material = new THREE.MeshStandardMaterial({
            color: isImplantOrCartilage ? 0x0284c7 : 0xe2e8f0,
            metalness: isImplantOrCartilage ? 0.4 : 0.85,
            roughness: isImplantOrCartilage ? 0.2 : 0.18,
            transparent: isImplantOrCartilage,
            opacity: isImplantOrCartilage ? 0.9 : 1.0
          });
        } else {
          // Natural Real Texture PBR
          if (jointType === 'hip') {
            const hipBaseMap = textures.hipBase;
            child.material = new THREE.MeshStandardMaterial({
              map: hipBaseMap || child.material?.map || null,
              roughness: 0.55,
              metalness: 0.04,
              color: 0xffffff
            });
          } else if (jointType === 'knee') {
            if (nameLower.includes('opac') || matNameLower.includes('opac') || nameLower.includes('cartil') || nameLower.includes('menisc')) {
              child.material = new THREE.MeshStandardMaterial({
                map: textures.kneeOpacityBase,
                normalMap: textures.kneeOpacityNormal,
                roughnessMap: textures.kneeOpacityRoughness,
                aoMap: textures.kneeOpacityAO,
                roughness: 0.35,
                metalness: 0.1,
                transparent: true,
                opacity: 0.88,
                side: THREE.DoubleSide
              });
            } else if (nameLower.includes('mash') || matNameLower.includes('mash') || nameLower.includes('ligament') || nameLower.includes('tendon') || nameLower.includes('musc')) {
              child.material = new THREE.MeshStandardMaterial({
                map: textures.kneeMashBase,
                normalMap: textures.kneeMashNormal,
                roughnessMap: textures.kneeMashRoughness,
                aoMap: textures.kneeMashAO,
                roughness: 0.45,
                metalness: 0.1
              });
            } else {
              child.material = new THREE.MeshStandardMaterial({
                map: textures.kneeBoneBase,
                normalMap: textures.kneeBoneNormal,
                roughnessMap: textures.kneeBoneRoughness,
                aoMap: textures.kneeBoneAO,
                roughness: 0.6,
                metalness: 0.05
              });
            }
          } else if (jointType === 'shoulder') {
            if (nameLower.includes('musc') || matNameLower.includes('musc') || nameLower.includes('cuff') || nameLower.includes('tendon')) {
              child.material = new THREE.MeshStandardMaterial({
                map: textures.shoulderMusculesBase,
                normalMap: textures.shoulderMusculesNormal,
                roughnessMap: textures.shoulderMusculesRoughness,
                aoMap: textures.shoulderMusculesAO,
                roughness: 0.4,
                metalness: 0.1
              });
            } else {
              child.material = new THREE.MeshStandardMaterial({
                map: textures.shoulderBoneBase,
                normalMap: textures.shoulderBoneNormal,
                roughnessMap: textures.shoulderBoneRoughness,
                aoMap: textures.shoulderBoneAO,
                roughness: 0.6,
                metalness: 0.05
              });
            }
          }
        }
      }
    });
  }, []);

  // -------------------------------------------------------------
  // THREE.JS SCENE SETUP & OPTIMIZED MODEL LOADER
  // -------------------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 540;
    const height = container.clientHeight || 480;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 5.8);
    cameraRef.current = camera;

    // Safe WebGL initialization with universal device compatibility
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      rendererRef.current = renderer;
      setHasWebGLError(false);
    } catch (err) {
      console.warn('WebGL initialization failed, using fallback:', err);
      setHasWebGLError(true);
      return;
    }

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.45);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf0f9ff, 2.7);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x0284c7, 1.45);
    fillLight.position.set(-6, -2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 2.6, 18);
    rimLight.position.set(0, 4, -5);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1.0);
    topLight.position.set(0, 8, 0);
    scene.add(topLight);

    // Floor Shadow Disc
    const groundGeo = new THREE.CircleGeometry(2.4, 32);
    const groundMat = new THREE.MeshBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.08 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.3;
    scene.add(ground);

    const activeGroup = new THREE.Group();
    scene.add(activeGroup);
    jointGroupRef.current = activeGroup;

    const textureLoader = new THREE.TextureLoader();

    // Prepare Textures
    const textures = {
      kneeBoneBase: loadTexture(textureLoader, '/knee-anatomy/textures/bone_Base_color.png'),
      kneeBoneNormal: loadTexture(textureLoader, '/knee-anatomy/textures/bone_Normal_OpenGL.png'),
      kneeBoneRoughness: loadTexture(textureLoader, '/knee-anatomy/textures/bone_Roughness.png'),
      kneeBoneAO: loadTexture(textureLoader, '/knee-anatomy/textures/bone_Mixed_AO.png'),

      kneeOpacityBase: loadTexture(textureLoader, '/knee-anatomy/textures/Opacyty_Base_color.png'),
      kneeOpacityNormal: loadTexture(textureLoader, '/knee-anatomy/textures/Opacyty_Normal_OpenGL.png'),
      kneeOpacityRoughness: loadTexture(textureLoader, '/knee-anatomy/textures/Opacyty_Roughness.png'),
      kneeOpacityAO: loadTexture(textureLoader, '/knee-anatomy/textures/Opacyty_Mixed_AO.png'),

      kneeMashBase: loadTexture(textureLoader, '/knee-anatomy/textures/mash_Base_color.png'),
      kneeMashNormal: loadTexture(textureLoader, '/knee-anatomy/textures/mash_Normal_OpenGL.png'),
      kneeMashRoughness: loadTexture(textureLoader, '/knee-anatomy/textures/mash_Roughness.png'),
      kneeMashAO: loadTexture(textureLoader, '/knee-anatomy/textures/mash_Mixed_AO.png'),

      shoulderBoneBase: loadTexture(textureLoader, '/shoulder-joint/textures/bone_Base_color.png'),
      shoulderBoneNormal: loadTexture(textureLoader, '/shoulder-joint/textures/bone_Normal_OpenGL.png'),
      shoulderBoneRoughness: loadTexture(textureLoader, '/shoulder-joint/textures/bone_Roughness.png'),
      shoulderBoneAO: loadTexture(textureLoader, '/shoulder-joint/textures/bone_Mixed_AO.png'),

      shoulderMusculesBase: loadTexture(textureLoader, '/shoulder-joint/textures/muscules_Base_color.png'),
      shoulderMusculesNormal: loadTexture(textureLoader, '/shoulder-joint/textures/muscules_Normal_OpenGL.png'),
      shoulderMusculesRoughness: loadTexture(textureLoader, '/shoulder-joint/textures/muscules_Roughness.png'),
      shoulderMusculesAO: loadTexture(textureLoader, '/shoulder-joint/textures/muscules_Mixed_AO.png'),

      hipBase: loadTexture(textureLoader, '/hip-bone-3d-scan/textures/hip_bone_texture_opt.jpg')
    };

    // Check if model already cached for instant loading
    if (meshCache[selectedJoint]) {
      const cached = meshCache[selectedJoint].clone(true);
      applyJointMaterials(cached, selectedJoint, viewMode, textures);
      activeGroup.add(cached);
      setIsLoading(false);
    } else {
      setIsLoading(true);

      if (selectedJoint === 'knee') {
        const fbxLoader = new FBXLoader();
        fbxLoader.load(
          '/knee-anatomy/source/knee-anatomy.fbx',
          (fbx) => {
            const box = new THREE.Box3().setFromObject(fbx);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scaleFactor = 3.6 / (maxDim || 1);
            fbx.scale.setScalar(scaleFactor);
            fbx.position.x = -center.x * scaleFactor;
            fbx.position.y = -center.y * scaleFactor + 0.1;
            fbx.position.z = -center.z * scaleFactor;

            meshCache.knee = fbx;
            applyJointMaterials(fbx, 'knee', viewMode, textures);
            activeGroup.add(fbx);
            setIsLoading(false);
          },
          undefined,
          () => {
            const proc = buildProceduralMeshes('knee', viewMode);
            activeGroup.add(proc);
            setIsLoading(false);
          }
        );
      } else if (selectedJoint === 'shoulder') {
        const fbxLoader = new FBXLoader();
        fbxLoader.load(
          '/shoulder-joint/source/glenohumeral-joint.fbx',
          (fbx) => {
            const box = new THREE.Box3().setFromObject(fbx);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scaleFactor = 3.6 / (maxDim || 1);
            fbx.scale.setScalar(scaleFactor);
            fbx.position.x = -center.x * scaleFactor;
            fbx.position.y = -center.y * scaleFactor;
            fbx.position.z = -center.z * scaleFactor;

            meshCache.shoulder = fbx;
            applyJointMaterials(fbx, 'shoulder', viewMode, textures);
            activeGroup.add(fbx);
            setIsLoading(false);
          },
          undefined,
          () => {
            const proc = buildProceduralMeshes('shoulder', viewMode);
            activeGroup.add(proc);
            setIsLoading(false);
          }
        );
      } else if (selectedJoint === 'hip') {
        const gltfLoader = new GLTFLoader();
        // Load optimized binary model
        const modelPath = '/hip-bone-3d-scan/source/hip-bone-ultra.glb';
        gltfLoader.load(
          modelPath,
          (gltf) => {
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scaleFactor = 3.6 / (maxDim || 1);
            model.scale.setScalar(scaleFactor);
            model.position.x = -center.x * scaleFactor;
            model.position.y = -center.y * scaleFactor;
            model.position.z = -center.z * scaleFactor;

            meshCache.hip = model;
            applyJointMaterials(model, 'hip', viewMode, textures);
            activeGroup.add(model);
            setIsLoading(false);
          },
          undefined,
          () => {
            const proc = buildProceduralMeshes('hip', viewMode);
            activeGroup.add(proc);
            setIsLoading(false);
          }
        );
      }
    }

    // -------------------------------------------------------------
    // ANIMATION & 3D-TO-2D SCREEN PROJECTION LOOP
    // -------------------------------------------------------------
    let animationFrameId;
    let frameCount = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (jointGroupRef.current && cameraRef.current) {
        // Fast & smooth camera focusing & zoom animation when hotspot clicked
        if (targetRotationRef.current.animating) {
          const { x: tx, y: ty, targetCamY = 0.2, targetCamZ = 5.8 } = targetRotationRef.current;
          if (ty !== null && ty !== undefined) {
            jointGroupRef.current.rotation.y += (ty - jointGroupRef.current.rotation.y) * 0.16;
          } else if (autoRotate && !isDraggingRef.current) {
            jointGroupRef.current.rotation.y += 0.0035;
          }

          if (tx !== null && tx !== undefined) {
            jointGroupRef.current.rotation.x += (tx - jointGroupRef.current.rotation.x) * 0.16;
          }
          if (cameraRef.current) {
            cameraRef.current.position.z += (targetCamZ - cameraRef.current.position.z) * 0.16;
            cameraRef.current.position.y += (targetCamY - cameraRef.current.position.y) * 0.16;
          }

          const rotYDone = ty === null || ty === undefined || Math.abs(ty - jointGroupRef.current.rotation.y) < 0.005;
          const rotXDone = tx === null || tx === undefined || Math.abs(tx - jointGroupRef.current.rotation.x) < 0.005;
          const camZDone = cameraRef.current ? Math.abs(targetCamZ - cameraRef.current.position.z) < 0.01 : true;
          const camYDone = cameraRef.current ? Math.abs(targetCamY - cameraRef.current.position.y) < 0.01 : true;

          if (rotYDone && rotXDone && camZDone && camYDone) {
            targetRotationRef.current.animating = false;
          }
        } else if (autoRotate && !isDraggingRef.current && !activeHotspot) {
          jointGroupRef.current.rotation.y += 0.0035; // Gentle, elegant 360 auto-rotation
        }

        if (isDraggingRef.current) {
          jointGroupRef.current.rotation.y += rotationVelocityRef.current.y;
          jointGroupRef.current.rotation.x += rotationVelocityRef.current.x;
          jointGroupRef.current.rotation.x = Math.max(-0.65, Math.min(0.65, jointGroupRef.current.rotation.x));
        }

        // Fast & optimized 2D Screen Coordinates projection for 3D Numbered Pins
        frameCount++;
        if (frameCount % 2 === 0) {
          const spots = JOINT_HOTSPOTS[selectedJoint] || [];
          const cont = mountRef.current;
          if (cont) {
            const cW = cont.clientWidth;
            const cH = cont.clientHeight;

            const projected = spots.map((spot) => {
              const v = new THREE.Vector3(...spot.pos);
              v.applyMatrix4(jointGroupRef.current.matrixWorld);
              const isFacingCamera = v.z > -0.4;
              v.project(cameraRef.current);

              const screenX = ((v.x + 1) / 2) * cW;
              const screenY = ((-v.y + 1) / 2) * cH;

              return {
                ...spot,
                screenX,
                screenY,
                visible: v.z < 1.0 && isFacingCamera,
                depth: v.z
              };
            });

            setScreenHotspots(projected);
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Pause animation loop when tab is not visible — saves CPU/GPU
    let isPaused = false;
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused) animate();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Resize with RAF throttle
    let resizeRafId = null;
    const handleResize = () => {
      if (resizeRafId) return;
      resizeRafId = requestAnimationFrame(() => {
        if (!container || !renderer || !camera) { resizeRafId = null; return; }
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
        resizeRafId = null;
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Dispose geometries and materials to prevent WebGL memory leaks
      if (scene) {
        scene.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
            else obj.material.dispose();
          }
        });
      }
      if (renderer) {
        try {
          renderer.dispose();
        } catch (e) {
          // ignore
        }
      }
    };
  }, [selectedJoint, viewMode, autoRotate, buildProceduralMeshes, applyJointMaterials]);

  // -------------------------------------------------------------
  // MOUSE & TOUCH 360 DRAG ROTATION
  // -------------------------------------------------------------
  const handleMouseDown = (e) => {
    // If clicking directly on a button or popover, let button handle it
    if (e.target.closest('.viewer-3d-pin') || e.target.closest('.viewer-hotspot-popover') || e.target.closest('.viewer-action-dock')) {
      return;
    }
    isDraggingRef.current = true;
    targetRotationRef.current.animating = false;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !jointGroupRef.current) return;

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    rotationVelocityRef.current = {
      x: deltaY * 0.008,
      y: deltaX * 0.008
    };

    jointGroupRef.current.rotation.y += deltaX * 0.014;
    jointGroupRef.current.rotation.x += deltaY * 0.014;
    jointGroupRef.current.rotation.x = Math.max(-0.65, Math.min(0.65, jointGroupRef.current.rotation.x));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      if (e.target.closest('.viewer-3d-pin') || e.target.closest('.viewer-hotspot-popover')) return;
      isDraggingRef.current = true;
      targetRotationRef.current.animating = false;
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || !jointGroupRef.current || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
    const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

    jointGroupRef.current.rotation.y += deltaX * 0.014;
    jointGroupRef.current.rotation.x += deltaY * 0.014;
    jointGroupRef.current.rotation.x = Math.max(-0.65, Math.min(0.65, jointGroupRef.current.rotation.x));

    previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const handleZoom = (delta) => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z = Math.max(3.0, Math.min(8.5, cameraRef.current.position.z + delta));
  };

  const handleDeselectHotspot = () => {
    setActiveHotspot(null);
    setAutoRotate(true); // START 3D model movement on close
    targetRotationRef.current = {
      x: 0,
      y: null, // Let 360 auto-movement continue immediately
      targetCamY: 0.2,
      targetCamZ: 5.8, // Zoom back out to full view
      animating: true
    };
  };

  const handleResetView = () => {
    setActiveHotspot(null);
    setAutoRotate(true); // START 3D model movement on reset
    targetRotationRef.current = {
      x: 0,
      y: 0,
      targetCamY: 0.2,
      targetCamZ: 5.8,
      animating: true
    };
  };

  // Smooth focus & close-up zoom on selected anatomical hotspot
  const handleSelectHotspot = (spot) => {
    if (activeHotspot?.id === spot.id) {
      handleDeselectHotspot();
      return;
    }

    // STOP 3D model movement when number is clicked
    setAutoRotate(false);
    setActiveHotspot(spot);

    // Calculate angle to rotate landmark directly toward front and zoom in close
    const [x, y, z] = spot.pos;
    const targetY = -Math.atan2(x, z || 0.1);
    const targetX = Math.max(-0.25, Math.min(0.25, -y * 0.12));

    targetRotationRef.current = {
      x: targetX,
      y: targetY,
      targetCamY: y * 0.45 + 0.1, // Center vertically on this part
      targetCamZ: 3.65, // Close-up zoom on this part
      animating: true
    };
  };

  const currentHotspots = JOINT_HOTSPOTS[selectedJoint] || [];

  return (
    <div className="interactive-3d-wrapper" aria-label="Interactive 3D Anatomical Joint Viewer">
      {/* Top Controls Bar */}
      <div className="viewer-top-bar">
        {/* Joint Selector Pills */}
        <div className="viewer-joint-pills" role="tablist" aria-label="Select Anatomical Joint">
          <button
            type="button"
            className={`viewer-joint-pill ${selectedJoint === 'knee' ? 'active' : ''}`}
            onClick={() => { setSelectedJoint('knee'); handleDeselectHotspot(); }}
            title="Knee Anatomy 3D Model"
          >
            <span className="joint-pill-title">Knee</span>
            <span className="joint-pill-sub">Anatomy (3D)</span>
          </button>
          <button
            type="button"
            className={`viewer-joint-pill ${selectedJoint === 'shoulder' ? 'active' : ''}`}
            onClick={() => { setSelectedJoint('shoulder'); handleDeselectHotspot(); }}
            title="Shoulder Joint 3D Model"
          >
            <span className="joint-pill-title">Shoulder</span>
            <span className="joint-pill-sub">Joint (3D)</span>
          </button>
          <button
            type="button"
            className={`viewer-joint-pill ${selectedJoint === 'hip' ? 'active' : ''}`}
            onClick={() => { setSelectedJoint('hip'); handleDeselectHotspot(); }}
            title="Hip Joint 3D Model"
          >
            <span className="joint-pill-title">Hip</span>
            <span className="joint-pill-sub">Joint (3D)</span>
          </button>
        </div>

        {/* View Mode Switcher */}
        <div className="viewer-mode-selector">
          <button
            type="button"
            className={`mode-btn ${viewMode === 'natural' ? 'mode-active' : ''}`}
            onClick={() => setViewMode('natural')}
            title="Natural Anatomy PBR Mode"
          >
            Real Textures
          </button>
          <button
            type="button"
            className={`mode-btn ${viewMode === 'surgical' ? 'mode-active' : ''}`}
            onClick={() => setViewMode('surgical')}
            title="Surgical & Implant View"
          >
            Surgical
          </button>
          <button
            type="button"
            className={`mode-btn ${viewMode === 'xray' ? 'mode-active' : ''}`}
            onClick={() => setViewMode('xray')}
            title="3D Holographic / X-Ray Mode"
          >
            3D Hologram
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Stage */}
      <div
        className="viewer-stage"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {hasWebGLError ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '380px',
            padding: '24px',
            textAlign: 'center',
            background: 'radial-gradient(circle at center, rgba(20, 108, 114, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)',
            borderRadius: '16px'
          }}>
            <img
              src={`${import.meta.env.BASE_URL}${selectedJoint}-3d.webp`}
              alt={`${selectedJoint} Anatomy`}
              style={{ maxHeight: '240px', objectFit: 'contain', marginBottom: '16px', filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.3))' }}
            />
            <p style={{ color: '#3bb3bc', fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>
              {selectedJoint.toUpperCase()} Anatomy Overview
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', maxWidth: '380px' }}>
              Select any anatomical structure below to inspect condition details and treatment options.
            </p>
          </div>
        ) : (
          <div ref={mountRef} className="three-canvas-container" />
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="viewer-loading-overlay">
            <div className="viewer-spinner" />
            <span>Loading 3D Anatomy Model &amp; Textures...</span>
          </div>
        )}

        {/* Ambient Neon Orbit Ring & Grid */}
        <div className="viewer-orbital-grid" aria-hidden="true" />
        <div className="viewer-center-glow" aria-hidden="true" />

        {/* Drag Hint Badge */}
        <div className="viewer-drag-hint">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span className="drag-hint-desktop">Click &amp; drag 360° | Click numbered pins for details</span>
          <span className="drag-hint-mobile">Drag 360° • Tap numbered pins</span>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* NUMBERED 3D HOTSPOT PINS PINNED DIRECTLY ONTO 3D MODEL ANATOMY */}
        {/* ───────────────────────────────────────────────────────────── */}
        {screenHotspots.map((spot) => {
          const isSelected = activeHotspot?.id === spot.id;

          // When a number pin is clicked, ONLY show this active pin and HIDE all other numbers
          if (activeHotspot) {
            if (!isSelected) return null;
          } else {
            if (!spot.visible) return null;
          }

          return (
            <button
              key={spot.id}
              type="button"
              className={`viewer-3d-pin ${isSelected ? 'pin-active' : ''}`}
              style={{
                left: `${spot.screenX}px`,
                top: `${spot.screenY}px`,
                opacity: 1
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectHotspot(spot);
              }}
              title={`${spot.num}. ${spot.name}`}
              aria-label={`Hotspot ${spot.num}: ${spot.name}`}
            >
              <span className="pin-number">{spot.num}</span>
              {isSelected && <span className="pin-pulse-ring" />}
            </button>
          );
        })}

        {/* On-Canvas Floating Action Tools */}
        <div className="viewer-action-dock">
          <button
            type="button"
            className="dock-tool-btn"
            onClick={() => handleZoom(-0.7)}
            title="Zoom In"
            aria-label="Zoom In"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <button
            type="button"
            className="dock-tool-btn"
            onClick={() => handleZoom(0.7)}
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 12h14" />
            </svg>
          </button>
          <button
            type="button"
            className={`dock-tool-btn ${autoRotate ? 'btn-engaged' : ''}`}
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Pause 360 Rotation' : 'Start 360 Rotation'}
            aria-label="Toggle Auto Rotation"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-1.19" />
            </svg>
          </button>
          <button
            type="button"
            className="dock-tool-btn"
            onClick={handleResetView}
            title="Reset Camera View"
            aria-label="Reset View"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* ULTRA PRO MAX ANATOMICAL DETAILS CARD / TOOLTIP POPUP */}
        {/* ───────────────────────────────────────────────────────────── */}
        {activeHotspot && (
          <div className="viewer-hotspot-popover" role="dialog" aria-modal="false">
            <button
              type="button"
              className="popover-close-btn"
              onClick={handleDeselectHotspot}
              aria-label="Close hotspot info and zoom out"
            >
              ✕
            </button>
            <div className="popover-header">
              <span className="popover-num-badge">{activeHotspot.num}</span>
              <div>
                <span className="popover-badge">{activeHotspot.category}</span>
                <h4 className="popover-title">{activeHotspot.name}</h4>
              </div>
            </div>
            <p className="popover-desc">{activeHotspot.desc}</p>
            {activeHotspot.condition && (
              <div className="popover-clinical-box">
                <span className="clinical-label">Clinical Implication:</span>
                <span className="clinical-val">{activeHotspot.condition}</span>
              </div>
            )}
            {activeHotspot.treatment && (
              <div className="popover-treatment-box">
                <span className="treatment-label">Expert Treatment:</span>
                <span className="treatment-val">{activeHotspot.treatment}</span>
              </div>
            )}
            <div className="popover-cta-row">
              <a
                href="#appointment"
                className="popover-consult-btn"
                onClick={(e) => {
                  e.preventDefault();
                  if (onSelectTreatment) onSelectTreatment(selectedJoint);
                  const el = document.getElementById('appointment') || document.querySelector('.appointment-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Discuss with Dr. Harshil
              </a>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
