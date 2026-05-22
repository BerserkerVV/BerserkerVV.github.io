(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const updateScrollProgress = () => {
    const scrollable = document.body.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    root.style.setProperty("--scroll-progress", `${Math.min(progress, 100)}%`);
  };

  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress);

  if (!reducedMotion) {
    let pointerFrame = 0;
    window.addEventListener("pointermove", (event) => {
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);
        pointerFrame = 0;
      });
    }, { passive: true });
  }

  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  if (!reducedMotion) {
    document.querySelectorAll(".tilt-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
        card.style.setProperty("--tilt-y", `${(x - 0.5) * 9}deg`);
        card.style.setProperty("--glow-x", `${x * 100}%`);
        card.style.setProperty("--glow-y", `${y * 100}%`);
      });

      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        card.style.setProperty("--glow-x", "50%");
        card.style.setProperty("--glow-y", "0%");
      });
    });
  }

  const signalType = document.querySelector("#signal-type");
  if (signalType && !reducedMotion) {
    const signals = [
      "semantic control",
      "reference-video LoRA",
      "temporal consistency",
      "world-facing generation"
    ];
    let index = 0;
    window.setInterval(() => {
      index = (index + 1) % signals.length;
      signalType.animate(
        [
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: "translateY(-6px)" }
        ],
        { duration: 150, easing: "ease-out" }
      ).onfinish = () => {
        signalType.textContent = signals[index];
        signalType.animate(
          [
            { opacity: 0, transform: "translateY(6px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 180, easing: "ease-out" }
        );
      };
    }, 2200);
  }

  const labContent = {
    reference: {
      title: "Reference Video",
      copy: "A short reference clip provides the semantic cue: motion, style, camera behavior, or visual effect.",
      active: 0
    },
    hypernetwork: {
      title: "HyperNetwork",
      copy: "A transformer HyperNetwork reads reference-video features and predicts condition-specific adapter weights.",
      active: 1
    },
    lightlora: {
      title: "LightLoRA",
      copy: "The predicted LightLoRA factors stay tiny while carrying the semantics needed for generation control.",
      active: 2
    },
    backbone: {
      title: "Frozen Backbone",
      copy: "Adapters plug into a frozen video diffusion model, avoiding separate fine-tuning for each control condition.",
      active: 3
    }
  };

  const labTitle = document.querySelector("#lab-title");
  const labCopy = document.querySelector("#lab-copy");
  const labNodes = document.querySelectorAll(".flow-node");
  document.querySelectorAll("[data-lab]").forEach((button) => {
    button.addEventListener("click", () => {
      const content = labContent[button.dataset.lab];
      if (!content) return;

      document.querySelectorAll("[data-lab]").forEach((tab) => tab.classList.remove("is-active"));
      button.classList.add("is-active");
      labTitle.textContent = content.title;
      labCopy.textContent = content.copy;
      labNodes.forEach((node, nodeIndex) => {
        node.classList.toggle("active", nodeIndex === content.active);
      });
    });
  });

  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      if (!target) return;

      try {
        await navigator.clipboard.writeText(target.textContent.trim());
        button.textContent = "Copied";
        window.setTimeout(() => {
          button.textContent = "Copy";
        }, 1400);
      } catch {
        button.textContent = "Select text";
      }
    });
  });
})();
