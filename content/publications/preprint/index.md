---
title: "Video2LoRA: Unified Semantic-Controlled Video Generation via Per-Reference-Video LoRA"
authors:
- admin
date: "2026-03-10T00:00:00Z"

# Schedule page publish date (NOT publication's date).
publishDate: "2026-03-10T00:00:00Z"

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ["article"]

# Publication name and optional abbreviated publication name.
publication: ""
publication_short: ""

abstract: Achieving semantic alignment across diverse video generation conditions remains a significant challenge. Methods that rely on explicit structural guidance often enforce rigid spatial constraints that limit semantic flexibility, whereas models tailored for individual control types lack interoperability and adaptability. These design bottlenecks hinder progress toward flexible and efficient semantic video generation. To address this, we propose \textbf{Video2LoRA}, a scalable and generalizable framework for semantic-controlled video generation that conditions on a reference video. Video2LoRA employs a lightweight hypernetwork to predict personalized LoRA weights for each semantic input, which are combined with auxiliary matrices to form adaptive LoRA modules integrated into a frozen diffusion backbone. This design enables the model to generate videos consistent with the reference semantics while preserving key style and content variations, eliminating the need for any per-condition training. Notably, the final model weights less than 150MB, making it highly efficient for storage and deployment. Video2LoRA achieves coherent, semantically aligned generation across diverse conditions and exhibits strong zero-shot generalization to unseen semantics.

# Summary. An optional shortened abstract.
summary: Customizing a dedicated semantic LoRA for each reference video.

tags:
- Video Generation

featured: true

hugoblox:
  ids:
    arxiv: 2603.08210

links:
- type: preprint
  provider: arxiv
  id: http://arxiv.org/abs/2603.08210
- type: code
  url: https://github.com/BerserkerVV/Video2LoRA
- type: slides
  url: https://www.slideshare.net/
- type: dataset
  url: "#"
- type: poster
  url: "#"
- type: source
  url: "#"
- type: video
  url: https://youtube.com
- type: custom
  label: Custom Link
  url: http://example.org

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Image credit: [**Unsplash**](https://github.com/BerserkerVV/Video2LoRA/blob/main/assets/teaser.jpg)'
  focal_point: ""
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
- internal-project

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: ""
---

This work is driven by the results in my [previous paper](/publications/conference-paper/) on LLMs.

> [!NOTE]
> Create your slides in Markdown - click the *Slides* button to check out the example.

Add the publication's **full text** or **supplementary notes** here. You can use rich formatting such as including [code, math, and images](https://docs.hugoblox.com/content/writing-markdown-latex/).
