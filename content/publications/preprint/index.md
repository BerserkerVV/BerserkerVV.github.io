---
title: "Video2LoRA: Unified Semantic-Controlled Video Generation via Per-Reference-Video LoRA"
authors:
  - admin
  - Baolu Li
  - Jing Dai
  - Yiming Zhang
  - Yue Ma
  - Qinghe Wang
  - Xu Jia
  - Hongming Xu
date: "2026-03-10T00:00:00Z"
publishDate: "2026-03-10T00:00:00Z"

publication_types: ["paper-conference"]
publication: "In *CVPR 2026 Findings*"
publication_short: "CVPR 2026 Findings"

abstract: "Achieving semantic alignment across diverse video generation conditions remains a significant challenge. Methods that rely on explicit structural guidance often enforce rigid spatial constraints that limit semantic flexibility, whereas models tailored for individual control types lack interoperability and adaptability. Video2LoRA is a scalable and generalizable framework for semantic-controlled video generation conditioned on a reference video. A lightweight HyperNetwork predicts personalized LoRA weights for each semantic input, which are combined with auxiliary matrices to form adaptive LoRA modules integrated into a frozen diffusion backbone. This enables generation consistent with reference semantics while preserving style and content variation, without per-condition training."
summary: "A HyperNetwork predicts lightweight semantic LoRA adapters from each reference video for unified controllable video generation."

tags:
  - Video Generation
  - Semantic Control
  - LoRA
  - Diffusion Models

featured: true

hugoblox:
  ids:
    arxiv: 2603.08210

links:
  - type: preprint
    provider: arxiv
    id: "2603.08210"
  - type: pdf
    url: https://arxiv.org/pdf/2603.08210
  - type: code
    url: https://github.com/BerserkerVV/Video2LoRA
  - type: project
    url: /projects/video2lora/

image:
  caption: 'Video2LoRA teaser.'
  focal_point: "Center"
  preview_only: false

projects:
  - video2lora

slides: ""
---

Video2LoRA introduces a reference-driven route to semantic video generation: instead of training separate adapters for every condition, it predicts compact semantic LoRA weights directly from a reference video.

The project page includes a visual overview, method breakdown, highlights, links, and BibTeX.
