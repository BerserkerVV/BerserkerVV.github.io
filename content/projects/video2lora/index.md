---
title: "Video2LoRA"
date: "2026-03-10T00:00:00Z"
summary: "Unified semantic-controlled video generation via per-reference-video LoRA."
tags:
  - Video Generation
  - Semantic Control
  - LoRA
  - HyperNetwork
links:
  - type: preprint
    url: https://arxiv.org/abs/2603.08210
  - type: code
    url: https://github.com/BerserkerVV/Video2LoRA
image:
  caption: "Video2LoRA teaser."
  focal_point: "Center"
  preview_only: false
---

<section class="v2l-hero">
  <p class="eyebrow">CVPR 2026 Findings</p>
  <h1>Video2LoRA</h1>
  <p class="lead">Unified semantic-controlled video generation via per-reference-video LoRA.</p>
  <p>Video2LoRA predicts a dedicated semantic LoRA from a reference video, making controllable video generation more flexible, compact, and zero-shot friendly.</p>
  <div class="zexi-actions">
    <a href="https://arxiv.org/abs/2603.08210">Paper</a>
    <a href="https://github.com/BerserkerVV/Video2LoRA">Code</a>
    <a href="/publications/preprint/">Publication</a>
  </div>
</section>

<div class="v2l-media-frame">
  <img src="featured.jpg" alt="Video2LoRA teaser showing semantic-controlled video generation examples">
</div>

<section class="v2l-stats">
  <div><strong>&lt;50KB</strong><span>LoRA parameters per semantic condition</span></div>
  <div><strong>&lt;150MB</strong><span>final model size</span></div>
  <div><strong>Zero-shot</strong><span>generalization to unseen semantics</span></div>
</section>

## Why It Matters

Semantic alignment across different video generation conditions is hard: explicit structure can become too rigid, while condition-specific models are difficult to reuse. Video2LoRA treats a reference video as the semantic source and predicts compact LoRA weights that adapt a frozen diffusion backbone.

## Method

<div class="v2l-media-frame">
  <img src="framework.png" alt="Video2LoRA framework diagram">
</div>

<div class="v2l-method-grid">
  <article>
    <span>01</span>
    <h3>LightLoRA Representation</h3>
    <p>Compact LoRA factors reduce the per-condition parameter footprint while keeping semantic adaptability.</p>
  </article>
  <article>
    <span>02</span>
    <h3>HyperNetwork Prediction</h3>
    <p>A transformer-based HyperNetwork consumes reference-video features and predicts semantic-specific LoRA weights.</p>
  </article>
  <article>
    <span>03</span>
    <h3>Frozen Diffusion Backbone</h3>
    <p>The predicted adapters are injected into a frozen video diffusion model, avoiding per-condition fine-tuning.</p>
  </article>
</div>

## Citation

```bibtex
@misc{wu2026video2loraunifiedsemanticcontrolledvideo,
  title={Video2LoRA: Unified Semantic-Controlled Video Generation via Per-Reference-Video LoRA},
  author={Wu, Zexi and Li, Baolu and Dai, Jing and Zhang, Yiming and Ma, Yue and Wang, Qinghe and Jia, Xu and Xu, Hongming},
  year={2026},
  eprint={2603.08210},
  archivePrefix={arXiv},
  primaryClass={cs.CV},
  url={https://arxiv.org/abs/2603.08210}
}
```
