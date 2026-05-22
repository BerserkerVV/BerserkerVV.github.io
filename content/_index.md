---
title: ''
date: 2022-10-24
type: landing

design:
  spacing: '5rem'

sections:
  - block: resume-biography-3
    content:
      username: admin
      text: 'I build generative video systems that can follow semantic references, adapt efficiently, and reason about motion in the world.'
      button:
        text: Download CV
        url: uploads/resume.pdf
      headings:
        about: ''
        education: 'Education'
        interests: 'Research Interests'
    design:
      css_class: zexi-hero-shell
      avatar:
        size: large
        shape: circle

  - block: markdown
    id: research
    content:
      title: 'Research Signal'
      subtitle: 'Generative video, semantic control, efficient adaptation.'
      text: |-
        <div class="zexi-signal-grid">
          <article>
            <span>01</span>
            <h3>Semantic-Controlled Generation</h3>
            <p>Designing video models that turn reference motion, structure, style, and visual effects into controllable generation signals.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Efficient Model Adaptation</h3>
            <p>Exploring LoRA, hypernetworks, and compact parameterizations that make personalization lightweight and deployable.</p>
          </article>
          <article>
            <span>03</span>
            <h3>World Understanding</h3>
            <p>Building toward AI systems that understand dynamic scenes, temporal consistency, and high-level intent.</p>
          </article>
        </div>
    design:
      columns: '1'

  - block: collection
    id: papers
    content:
      title: Selected Publications
      text: 'Current work at the intersection of video diffusion, semantic control, and parameter-efficient generation.'
      filters:
        folders:
          - publications
        featured_only: true
    design:
      view: article-grid
      columns: 2

  - block: markdown
    id: video2lora
    content:
      title: 'Project Spotlight'
      subtitle: ''
      text: |-
        <section class="zexi-project-callout">
          <div>
            <p class="eyebrow">CVPR 2026 Findings</p>
            <h2>Video2LoRA</h2>
            <p>Unified semantic-controlled video generation via per-reference-video LoRA. A transformer HyperNetwork predicts lightweight LoRA adapters from a reference video, enabling zero-shot semantic control without per-condition fine-tuning.</p>
            <div class="zexi-actions">
              <a href="/projects/video2lora/">Project Page</a>
              <a href="https://arxiv.org/abs/2603.08210">arXiv</a>
              <a href="https://github.com/BerserkerVV/Video2LoRA">Code</a>
            </div>
          </div>
          <div class="metric-strip">
            <span><strong>&lt;50KB</strong> per semantic condition</span>
            <span><strong>&lt;150MB</strong> final model size</span>
            <span><strong>Zero-shot</strong> unseen semantics</span>
          </div>
        </section>
    design:
      columns: '1'

  - block: collection
    content:
      title: Projects
      text: 'Research code and project pages.'
      filters:
        folders:
          - projects
    design:
      view: article-grid
      columns: 3
      show_date: false
      show_read_time: false
      show_read_more: false
---
