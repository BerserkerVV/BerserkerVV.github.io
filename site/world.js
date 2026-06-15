import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

const canvas = document.querySelector("#world-canvas");

if (canvas) {
  const links = {
    publications: "/publications/",
    news: "/news/",
    contact: "/contact/",
    video2lora: "/projects/video2lora/"
  };

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07111f, 0.035);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 180);
  camera.position.set(0, 9.4, 19);
  camera.lookAt(0, 0, 0);

  const pointer = new THREE.Vector2();
  const targetCamera = new THREE.Vector3(0, 9.4, 19);
  const raycaster = new THREE.Raycaster();
  const clickable = [];

  const world = new THREE.Group();
  scene.add(world);

  const ambient = new THREE.HemisphereLight(0x8edcff, 0x080b12, 1.8);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
  keyLight.position.set(-7, 14, 8);
  scene.add(keyLight);

  const cyanLight = new THREE.PointLight(0x45d7ff, 35, 42);
  cyanLight.position.set(-6, 4, 4);
  scene.add(cyanLight);

  const roseLight = new THREE.PointLight(0xff6f9b, 26, 34);
  roseLight.position.set(7, 4, -8);
  scene.add(roseLight);

  const mintLight = new THREE.PointLight(0x70f6bf, 24, 32);
  mintLight.position.set(4, 4, 6);
  scene.add(mintLight);

  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x0a1830,
    roughness: 0.86,
    metalness: 0.18,
    emissive: 0x061525,
    emissiveIntensity: 0.25
  });

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 80, 80, 80), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.22;
  world.add(ground);

  const grid = new THREE.GridHelper(80, 80, 0x45d7ff, 0x1b3956);
  grid.position.y = -0.18;
  grid.material.transparent = true;
  grid.material.opacity = 0.28;
  world.add(grid);

  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x45d7ff,
    transparent: true,
    opacity: 0.34,
    side: THREE.DoubleSide
  });

  const pathMat = new THREE.MeshBasicMaterial({
    color: 0x70f6bf,
    transparent: true,
    opacity: 0.42
  });

  const makePath = (x, z, rotation, length) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.035, length), pathMat);
    mesh.position.set(x, 0.03, z);
    mesh.rotation.y = rotation;
    world.add(mesh);
    return mesh;
  };

  makePath(-2.7, 0.5, -0.7, 10);
  makePath(2.7, -1.4, 0.62, 11);
  makePath(0, 1.8, Math.PI / 2, 11);

  const voxelMats = [
    new THREE.MeshStandardMaterial({ color: 0x102947, roughness: 0.82, metalness: 0.12, emissive: 0x061525, emissiveIntensity: 0.18 }),
    new THREE.MeshStandardMaterial({ color: 0x123c46, roughness: 0.76, metalness: 0.14, emissive: 0x0b2b2e, emissiveIntensity: 0.2 }),
    new THREE.MeshStandardMaterial({ color: 0x2f2454, roughness: 0.72, metalness: 0.18, emissive: 0x170e2f, emissiveIntensity: 0.2 })
  ];
  const cubeGeo = new THREE.BoxGeometry(0.72, 0.72, 0.72);
  const voxelField = new THREE.Group();
  world.add(voxelField);
  for (let x = -8; x <= 8; x += 2) {
    for (let z = -8; z <= 8; z += 2) {
      const distance = Math.hypot(x, z);
      if (distance < 2.2 || Math.random() > 0.58) continue;
      const height = 0.35 + Math.max(0, 2.1 - distance * 0.14) + Math.random() * 1.25;
      const cube = new THREE.Mesh(cubeGeo, voxelMats[Math.floor(Math.random() * voxelMats.length)]);
      cube.position.set(x + (Math.random() - 0.5) * 0.35, height * 0.5 - 0.22, z + (Math.random() - 0.5) * 0.35);
      cube.scale.y = height;
      voxelField.add(cube);
    }
  }

  const makeLabelTexture = (title, subtitle, color) => {
    const labelCanvas = document.createElement("canvas");
    labelCanvas.width = 512;
    labelCanvas.height = 256;
    const ctx = labelCanvas.getContext("2d");
    ctx.clearRect(0, 0, labelCanvas.width, labelCanvas.height);
    ctx.fillStyle = "rgba(5, 9, 18, 0.72)";
    ctx.fillRect(0, 0, labelCanvas.width, labelCanvas.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.strokeRect(12, 12, labelCanvas.width - 24, labelCanvas.height - 24);
    ctx.fillStyle = color;
      ctx.font = "700 38px Orbitron, sans-serif";
    ctx.fillText(title, 34, 100);
    ctx.fillStyle = "rgba(243, 247, 255, 0.82)";
    ctx.font = "24px JetBrains Mono, monospace";
    ctx.fillText(subtitle, 34, 146);
    ctx.fillRect(34, 178, 92, 8);
    ctx.fillRect(142, 178, 36, 8);
    const texture = new THREE.CanvasTexture(labelCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  const makeIsland = ({ name, subtitle, href, color, position, scale, rotation = 0 }) => {
    const group = new THREE.Group();
    group.position.set(position[0], 0, position[1]);
    group.rotation.y = rotation;
    world.add(group);

    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x11223b,
      roughness: 0.62,
      metalness: 0.28,
      emissive: color,
      emissiveIntensity: 0.08
    });

    const base = new THREE.Mesh(new THREE.CylinderGeometry(scale * 1.35, scale * 1.65, 0.55, 6), baseMat);
    base.position.y = 0.22;
    base.userData.href = href;
    clickable.push(base);
    group.add(base);

    const towerMat = new THREE.MeshStandardMaterial({
      color: 0x132846,
      roughness: 0.46,
      metalness: 0.48,
      emissive: color,
      emissiveIntensity: 0.16
    });

    const tower = new THREE.Mesh(new THREE.BoxGeometry(scale * 0.55, scale * 1.6, scale * 0.55), towerMat);
    tower.position.y = scale * 0.95;
    tower.userData.href = href;
    clickable.push(tower);
    group.add(tower);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(scale * 1.05, 0.025, 10, 72), ringMat.clone());
    ring.material.color.setHex(color);
    ring.position.y = 0.58;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    const beacon = new THREE.PointLight(color, 12, 11);
    beacon.position.y = scale * 2.25;
    group.add(beacon);

    const label = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeLabelTexture(name, subtitle, `#${color.toString(16).padStart(6, "0")}`),
      transparent: true
    }));
    label.position.set(0, scale * 2.65, 0);
    label.scale.set(3.6, 1.8, 1);
    label.userData.href = href;
    clickable.push(label);
    group.add(label);

    group.userData = { ring, base, tower, label, phase: Math.random() * Math.PI * 2 };
    return group;
  };

  const islands = [
    makeIsland({
      name: "ARENA",
      subtitle: "papers / projects",
      href: links.publications,
      color: 0xffd36b,
      position: [-7, -2],
      scale: 1.35,
      rotation: 0.4
    }),
    makeIsland({
      name: "QUEST",
      subtitle: "academic log",
      href: links.news,
      color: 0xff6f9b,
      position: [6.8, -4],
      scale: 1.22,
      rotation: -0.3
    }),
    makeIsland({
      name: "BOOTH",
      subtitle: "contact port",
      href: links.contact,
      color: 0x70f6bf,
      position: [6.3, 3.5],
      scale: 1.18,
      rotation: 0.7
    }),
    makeIsland({
      name: "GATE",
      subtitle: "video2lora",
      href: links.video2lora,
      color: 0x45d7ff,
      position: [-2, 5.4],
      scale: 1.28,
      rotation: -0.15
    })
  ];

  const avatarTexture = new THREE.TextureLoader().load("/assets/avatar.png");
  avatarTexture.colorSpace = THREE.SRGBColorSpace;
  const avatar = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2),
    new THREE.MeshBasicMaterial({
      map: avatarTexture,
      transparent: true
    })
  );
  avatar.position.set(0, 3.2, 0.1);
  world.add(avatar);

  const avatarFrame = new THREE.Mesh(
    new THREE.TorusGeometry(1.62, 0.025, 10, 96),
    new THREE.MeshBasicMaterial({
      color: 0x45d7ff,
      transparent: true,
      opacity: 0.78
    })
  );
  avatarFrame.position.set(0, 3.2, 0);
  world.add(avatarFrame);

  const beatStage = new THREE.Group();
  beatStage.position.set(0, 0.04, -0.15);
  world.add(beatStage);

  const deckMat = new THREE.MeshStandardMaterial({
    color: 0x0f1d32,
    roughness: 0.34,
    metalness: 0.7,
    emissive: 0x061525,
    emissiveIntensity: 0.28
  });
  const deck = new THREE.Mesh(new THREE.CylinderGeometry(2.15, 2.35, 0.16, 64), deckMat);
  beatStage.add(deck);

  const vinyl = new THREE.Mesh(
    new THREE.CylinderGeometry(1.25, 1.25, 0.05, 72),
    new THREE.MeshStandardMaterial({
      color: 0x05070c,
      roughness: 0.42,
      metalness: 0.64,
      emissive: 0x190824,
      emissiveIntensity: 0.3
    })
  );
  vinyl.position.y = 0.14;
  beatStage.add(vinyl);

  const vinylRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.25, 0.018, 8, 96),
    new THREE.MeshBasicMaterial({ color: 0xff6f9b, transparent: true, opacity: 0.88 })
  );
  vinylRing.position.y = 0.19;
  vinylRing.rotation.x = Math.PI / 2;
  beatStage.add(vinylRing);

  const equalizer = new THREE.Group();
  equalizer.position.set(0, 0.2, -3.3);
  world.add(equalizer);
  const barMat = new THREE.MeshStandardMaterial({
    color: 0x70f6bf,
    roughness: 0.5,
    metalness: 0.36,
    emissive: 0x70f6bf,
    emissiveIntensity: 0.55
  });
  const bars = [];
  for (let i = 0; i < 17; i += 1) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1, 0.24), barMat);
    bar.position.x = (i - 8) * 0.38;
    bar.position.y = 0.55;
    equalizer.add(bar);
    bars.push(bar);
  }

  const arenaRing = new THREE.Mesh(
    new THREE.TorusGeometry(5.8, 0.035, 12, 160),
    new THREE.MeshBasicMaterial({ color: 0xffd36b, transparent: true, opacity: 0.42 })
  );
  arenaRing.rotation.x = Math.PI / 2;
  arenaRing.position.y = 0.12;
  world.add(arenaRing);

  const starGeo = new THREE.BufferGeometry();
  const starCount = 520;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i += 1) {
    starPositions[i * 3] = (Math.random() - 0.5) * 90;
    starPositions[i * 3 + 1] = Math.random() * 36 + 5;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 90;
  }
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
  const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({
      color: 0x9fe9ff,
      size: 0.075,
      transparent: true,
      opacity: 0.7
    })
  );
  scene.add(stars);

  const resize = () => {
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  window.addEventListener("resize", resize);
  resize();

  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    targetCamera.x = pointer.x * 2.2;
    targetCamera.z = 19 + pointer.y * 1.5;
  }, { passive: true });

  window.addEventListener("click", (event) => {
    raycaster.setFromCamera({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1
    }, camera);
    const hit = raycaster.intersectObjects(clickable, false)[0];
    const href = hit?.object?.userData?.href;
    if (href) window.location.href = href;
  });

  const clock = new THREE.Clock();

  const render = () => {
    const elapsed = clock.getElapsedTime();
    camera.position.lerp(targetCamera, 0.045);
    camera.lookAt(0, 1.2, 0);

    world.rotation.y = Math.sin(elapsed * 0.12) * 0.08;
    grid.material.opacity = 0.22 + Math.sin(elapsed * 1.2) * 0.035;
    stars.rotation.y = elapsed * 0.018;
    avatar.lookAt(camera.position);
    avatarFrame.lookAt(camera.position);
    avatarFrame.rotation.z += elapsed * 0.0006;

    islands.forEach((island) => {
      island.position.y = Math.sin(elapsed * 0.9 + island.userData.phase) * 0.12;
      island.userData.ring.rotation.z = elapsed * 0.85;
      island.userData.label.lookAt(camera.position);
    });

    beatStage.rotation.y = elapsed * 0.18;
    vinyl.rotation.y = elapsed * 1.9;
    vinylRing.rotation.z = elapsed * 1.9;
    arenaRing.rotation.z = elapsed * 0.18;
    bars.forEach((bar, index) => {
      const height = 0.35 + Math.abs(Math.sin(elapsed * 2.6 + index * 0.58)) * 1.65;
      bar.scale.y = height;
      bar.position.y = height * 0.5;
    });

    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
  };

  render();
}
