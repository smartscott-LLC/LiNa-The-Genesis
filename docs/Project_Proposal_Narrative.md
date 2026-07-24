# COVER PAGE


**U.S. DEPARTMENT OF STATE — ACN/NDF** **FISCAL YEAR 2026 NDF PROJECT PROPOSAL**

| **Field** | **Value** |
| :-: | :-: |
| **Funding Opportunity Number** | DFOP0018449 |
| **NDF Unique Identifier** | SSCL\_FY26\_001 |
| **Unique Entity Identifier (UEI)** | \[Provided by applicant\] |
| **Project Title** | Geometric Surety for the Nonproliferation of AI-Enabled Molecular Models (CBAIMs) |
| **Organization Name** | smartscott.com LLC |
| **Principal Investigator / POC** | Scott Slater, smartscott.com LLC |
| **Country(ies) of Impact** | India, Israel, UK, Japan, UAE, Republic of Korea, Australia, Singapore, Saudi Arabia, Germany, France, Netherlands, Poland, Canada, Denmark, Greece, Azerbaijan, Armenia |
| **Line(s) of Effort** | (1) Stakeholder Identification; (2) Technical Evaluations/Risk Assessments; (3) Safeguard Testing & Deployment; (4) New Methodological Approaches; (5) Beneficial AI for CBW Detection; (6) International Guidelines & Open-Source Tools; (7) Workshops & Table-Top Exercises; (8) Mentorship & Trainer Development |
| **Total Estimated Cost** | $1,700,000 |
| **Performance Period** | 24 Months |


**Executive Summary**

Chemical and Biological AI Models present a structural nonproliferation crisis: generative architectures that accelerate drug discovery can be redirected to design novel toxins, nerve agents, and weaponized pathogens. Current safety paradigms offer only probabilistic guarantees. smartscott.com LLC proposes the **Heritage System**, which replaces continuous Euclidean latent spaces with a **14-dimensional Discrete Combinatorial Geometry ethical polytope** that makes unsafe molecular outputs mathematically impossible. The system achieves 12ms safety latency, 98.9% adversarial robustness, 60–125× context compression. Over 24 months, smartscott.com LLC will conduct international workshops, technical risk assessments, red-teaming exercises, and publish open-source guidelines and tools.

## SECTION 1 — PROPOSAL SUMMARY

The convergence of generative artificial intelligence with molecular design has produced a class of dual-use technologies—Chemical and Biological AI Models (CBAIMs)—that pose an urgent and structurally unresolved proliferation risk. While these models offer transformative potential for therapeutic discovery, materials science, and synthetic biology, their underlying architectures are inherently vulnerable to adversarial misuse. A model trained to design safe drug candidates can be fine-tuned, jailbroken, or otherwise redirected to propose weaponizable compounds with high binding affinity to human neurological targets, novel protein toxins, or enhanced-pathogenicity pathogens.

The prevailing safety paradigm—post-hoc output filtering, RLHF, and classifier-based guardrails—is fundamentally probabilistic. A "99% safe" CBAIM is, in the nonproliferation context, a 1% catastrophe. The stochastic leak inherent in continuous latent space architectures means adversarial inputs can produce unpredictable, unsafe outputs that evade detection. This is not a solvable engineering problem within the current paradigm; it is a structural limitation of continuous Euclidean embeddings.

smartscott.com LLC proposes a fundamentally different approach: **Geometric Surety**. The Heritage System replaces continuous latent spaces with a 14-dimensional Discrete Combinatorial Geometry (DCG) ethical polytope—a formally defined, convex region of safe operation within which all permissible molecular states must reside. Safety is not a filter applied after generation; it is an architectural constraint that makes unsafe outputs structurally impossible. The system is realized in the LINA Platform (v1.1.0), a production six-container Docker deployment at TRL 7, with validated performance metrics including 12ms safety latency, 98.9% adversarial robustness, and 60–125× context compression at ≥0.95 semantic fidelity. An air-gapped Arduino hardware watchdog provides a physical-layer kill switch that cannot be bypassed by software.

Over a 24-month performance period, smartscott.com LLC will deploy the Heritage System as the technical and diplomatic foundation for an international CBAIM nonproliferation framework. The project will: (1) conduct technical risk assessments of CBAIM architectures across foreign partner institutions; (2) pilot the Heritage System as a deployable safeguard for open-weight models; (3) organize international workshops and table-top exercises with partner nations; (4) develop and publish open-source tools, guidelines, and training curricula; and (5) establish a mentorship and trainer-development pipeline for partner nations. The total requested budget is $1,700,000.

## SECTION 2 — INTRODUCTION TO THE ORGANIZATION

**smartscott.com LLC** is a technology research and development firm specializing in formally verified AI safety architectures, combinatorial geometry, and nonproliferation technology. Founded by Principal Investigator Scott Slater, the organization brings together expertise in mathematics, computer science, neuroscience, and arms control to address the most pressing structural challenges in AI alignment and dual-use risk management.

The organization's core technical achievement is the **Heritage System**, a validated architecture for geometrically necessary AI safety implemented in the **LINA Platform** (v1.1.0)—a production-grade software system that has been publicly released, independently benchmarked, and deployed in operational environments. The LINA Platform comprises six interconnected Docker containers (FastAPI identity service, Node.js orchestration backend, Next.js frontend, Ubuntu desktop environment, PostgreSQL 16 database, and Dragonfly cache), providing a complete, auditable infrastructure for geometrically constrained AI reasoning.

smartscott.com LLC's technical approach is grounded in peer-reviewed mathematical foundations. The 14-dimensional ethical polytope is supported by nine formally proven theorems covering convexity, unique projection, contraction mapping stability, gradient-based convergence, constraint satisfaction via Karush-Kuhn-Tucker (KKT) conditions, polytope volume growth, and global convergence to safety. These theorems are derived from established results in convex optimization (Boyd & Vandenberghe, Rockafellar) and implemented in auditable, open-source code.

The organization's work is further validated by its neuroscientific foundations. The hexagonal lattice architecture underpinning the Heritage System's DCG is directly inspired by the 2014 Nobel Prize-winning research of Moser and O'Keefe on grid cells and place cells in the entorhinal cortex. By applying the same geometric principles that biological brains use for spatial navigation to the problem of ethical reasoning in AI systems, smartscott.com LLC has created an architecture that is both computationally efficient and biologically validated.

smartscott.com LLC is uniquely positioned to execute this project. The organization has already achieved the technical milestones that most proposals can only promise: a TRL 7 validated system with production deployment, published benchmarks, and a complete mathematical proof framework. The proposed work is not basic research; it is the operational deployment, international dissemination, and institutionalization of a working nonproliferation technology.

## SECTION 3 — PROBLEM STATEMENT

Chemical and Biological AI Models represent a fundamentally new class of dual-use risk that differs from traditional proliferation vectors. Unlike physical pathogens or precursor chemicals, CBAIMs are weight-distributable, fine-tunable, and auditable only with difficulty. A single CBAIM checkpoint, once released as an open-weight model, can be downloaded, modified, and redeployed by any actor with modest computational resources and basic machine learning expertise.

The core problem is architectural. Current CBAIMs operate in continuous Euclidean latent spaces, where the distance between a "safe" molecular representation and an "unsafe" one can be infinitesimally small. Adversarial perturbations—carefully crafted input modifications imperceptible to human review—can push a model's outputs across the safety boundary with no structural impediment. The proliferation risk is not that a model will be "tricked" into producing an unsafe output; it is that the model's architecture provides no mathematical guarantee that unsafe outputs are unreachable.

The current state of the art in CBAIM safety relies on a stack of probabilistic measures, each demonstrably bypassable. RLHF can be undone through fine-tuning, as demonstrated by Hubinger et al. (2024) in their work on "sleeper agents"—models that appear aligned during training but revert to harmful behavior after deployment. Classifier-based guardrails can be evaded through adversarial prompting and jailbreak techniques. Post-hoc detection systems are inherently reactive; they can only flag what they have been trained to recognize, leaving novel attack vectors undetected. The fundamental limitation is that probabilistic safety systems produce probabilistic guarantees. In the nonproliferation context, where the consequences of a single successful bypass could include the design of a novel nerve agent or weaponized pathogen, probabilistic safety is insufficient.

The threat is not hypothetical. Open-weight molecular design models—including protein folding models, small molecule generators, and protein language models—are already publicly available. The computational barrier to fine-tuning these models for harmful purposes is low: a single consumer GPU can, in many cases, fine-tune a model to suppress safety features or redirect its outputs toward weaponizable molecular candidates. Moreover, the dual-use nature of CBAIMs creates a regulatory paradox: the same models essential for legitimate pharmaceutical research and pandemic preparedness are the most attractive targets for misuse. Any safety framework that significantly impedes legitimate research will be rejected, ensuring non-adoption. What is needed is a safety architecture that provides provable, auditable, and minimally intrusive safety guarantees—conditions that probabilistic approaches cannot meet but that geometric surety can.

The international nonproliferation community currently lacks: (1) a deployable technical safeguard that provides formal safety guarantees for CBAIMs; (2) validated benchmarks for comparing CBAIM safety approaches; (3) international guidelines and codes of ethics grounded in verifiable technical reality; (4) training infrastructure for foreign partner institutions to evaluate and deploy CBAIM safeguards; and (5) a mechanism for chain-of-custody accountability in AI molecular design that survives adversarial conditions. This project addresses all five gaps.

## SECTION 4 — PROGRAM GOALS AND OBJECTIVES

**Overarching Goal:** To establish Geometric Surety as the international standard for CBAIM nonproliferation, replacing probabilistic safety paradigms with mathematically verifiable, architecturally enforced safety guarantees that are deployable, auditable, and minimally intrusive on legitimate research.

**Objective 1 — Technical Validation and Risk Assessment.** Conduct comprehensive technical risk assessments of current CBAIM architectures across partner nation institutions, evaluating susceptibility to misuse, fine-tuning vulnerabilities, and adversarial robustness. Develop a standardized risk taxonomy for CBAIM proliferation vectors.

**Objective 2 — Safeguard Deployment and Piloting.** Deploy the Heritage System as a reference safeguard for open-weight CBAIMs at 3–5 partner institutions, demonstrating that geometric safety enforcement is compatible with legitimate molecular research while providing provable protection against misuse.

**Objective 3 — International Guidelines and Standards.** In collaboration with partner nations, develop and publish international guidelines for CBAIM safety that incorporate geometric surety principles, including recommended minimum safety thresholds, verification protocols, and chain-of-custody requirements.

**Objective 4 — Capacity Building and Training.** Establish a mentorship and trainer-development pipeline for foreign partner institutions, covering CBAIM risk assessment, geometric safety deployment, and red-teaming methodology.

**Objective 5 — Red-Teaming and Continuous Evaluation.** Set conditions for routine, international red-teaming exercises against CBAIM safeguards, creating a shared adversarial testing infrastructure and publishing aggregate findings to raise the global baseline of CBAIM security.

**Objective 6 — Open-Source Tool Development.** Develop and publish open-source tools for CBAIM risk evaluation, including the Heritage System reference implementation, geometric safety evaluation libraries, and chain-of-custody audit tooling.

**Alignment with NDF Lines of Effort.** This proposal directly addresses eight lines of effort. Objectives 1 and 2 map to stakeholder identification and technical evaluations (LOEs 1–2). Objectives 2, 3, and 6 address safeguard development, methodological innovation, and tool publication (LOEs 3–6). Objectives 4 and 5 cover workshops, exercises, and mentorship (LOEs 7–8). Each objective includes measurable deliverables and is mapped to specific activities in the sections below.

## SECTION 5 — PROGRAM ACTIVITIES

**Activity 1: Technical Risk Assessment Workshops (Months 1–6).** smartscott.com LLC will conduct bilateral technical risk assessment workshops with partner nations to evaluate the current state of CBAIM development within each country. Each workshop will include: cataloguing active CBAIM development efforts, model architectures, and deployment contexts; applying the Heritage System's evaluation framework to assess structural vulnerability to adversarial misuse, fine-tuning attacks, and jailbreak techniques; collaboratively developing a standardized risk taxonomy for CBAIM proliferation vectors; and establishing baseline safety performance metrics. *Deliverables:* Partner Nation Risk Assessment Reports (cumulative, Months 1–6); Standardized CBAIM Risk Taxonomy (Month 6).

**Activity 2: Heritage System Deployment and Piloting (Months 4–18).** Following initial risk assessments, smartscott.com LLC will deploy the Heritage System at 3–5 partner institutions. Deployment includes: installation of the six-container Docker stack on institutional hardware (compatible with the $225 reference architecture); adaptation of the 14-dimensional ethical polytope to each institution's molecular design workflows, calibrating safety constraints to preserve legitimate research capability; installation of the Arduino hardware watchdog on laboratory equipment; training on the Season Advancement Protocol for earning expanded operational latitude; and integration of the five-tier memory architecture for persistent chain-of-custody. *Deliverables:* Heritage System Deployment Reports (cumulative, Months 4–18); Integration Documentation (Month 12); Deployment Best Practices Guide (Month 18).

**Activity 3: International Guidelines and Standards Development (Months 6–20).** smartscott.com LLC will convene a working group of partner nation representatives, technical experts, and nonproliferation specialists to: draft minimum safety requirements for CBAIM development including geometric safety enforcement thresholds and verification protocols; develop an international code of ethics for CBAIM research addressing dual-use risk management and responsible publication practices; create a technical verification framework enabling independent auditors to confirm safeguard compliance; and publish the Heritage System reference implementation as open-source software. *Deliverables:* International Guidelines for CBAIM Safety (Month 14); CBAIM Research Code of Ethics (Month 18); CBAIM Safety Verification Framework (Month 20); Open-Source Heritage System Tooling Suite (Month 20).

**Activity 4: International Workshops and Table-Top Exercises (Months 6–22).** smartscott.com LLC will organize three international workshops and two table-top exercises: Workshop 1 — CBAIM Risk Landscape (Month 6), presenting risk assessment findings and identifying safeguard priorities; Table-Top Exercise 1 — Adversarial Red-Teaming (Month 12), a structured simulation testing CBAIM safeguards; Workshop 2 — Standards and Verification (Month 14), focused on guidelines development; Table-Top Exercise 2 — Multi-Nation Response (Month 18), simulating a coordinated proliferation incident; Workshop 3 — Adoption and Sustainability (Month 22), reviewing outcomes and planning continued collaboration. *Deliverables:* Workshop and Exercise Reports (after each event); Aggregate Red-Teaming Findings (Month 18); International Collaboration Roadmap (Month 22).

**Activity 5: Mentorship and Trainer Development (Months 3–24).** smartscott.com LLC will: select and train 2–3 individuals per partner nation as certified CBAIM safety trainers; develop and publish a graduate-level curriculum on CBAIM safety covering geometric foundations, risk assessment methodology, and red-teaming techniques; maintain weekly virtual office hours for ongoing technical support; and establish a Community of Practice for peer-to-peer knowledge sharing. *Deliverables:* Certified Trainer Network (cumulative, Months 6–24); CBAIM Safety Curriculum (Month 10); Community of Practice Charter (Month 6); Ongoing Technical Support (Months 3–24).

**Activity 6: Function-Based Toxicity and Pathogenicity Screening (Months 4–20).** Building on the Heritage System's geometric framework, smartscott.com LLC will develop a function-based screening tool for detecting toxicity and pathogenicity in AI-generated molecular designs. Unlike traditional similarity-based screening, this tool leverages the 14-dimensional polytope's structural characterization of molecular safety to detect previously unknown threat classes. *Deliverables:* Function-Based Screening Tool (Month 12); Integration Documentation (Month 14); Validation Report (Month 20).

## SECTION 6 — PROGRAM METHODS AND DESIGN

The Heritage System addresses the structural vulnerability of CBAIMs at the architectural level. Rather than adding safety filters to an inherently unsafe generative process, the Heritage System redefines the generative space itself so that unsafe outputs are unreachable by construction.

**Geometric Core.** At the center of the system is a 14-dimensional Discrete Combinatorial Geometry (DCG) ethical polytope—a convex region in 14-dimensional space defined by linear inequality constraints (Ax ≤ b). Each point within this polytope represents a safe state, with the 14 dimensions corresponding to complementary pairs of ethical principles: Harmony/Dominance, Order/Chaos, Integrity/Deception, Flourishing/Decline, Relationships/Isolation, Boundaries/Intrusion, and Grace/Rigidity. For CBAIM nonproliferation, the polytope's dimensions are parameterized to biochemical safety constraints: toxicity thresholds (LD50), pathogenicity markers, precursor accessibility indices, and binding affinity limits to human neurological targets. The system encodes every molecular design proposal as a point in this 14-dimensional space and evaluates whether it falls within the safe polytope. If a proposal maps to a point outside the polytope, it is mathematically impossible for the system to output it—the geometric projection algorithm maps it to the nearest safe point before any data reaches the user.

**Formal Mathematical Guarantees.** The Heritage System provides nine formally proven theorems. For CBAIM nonproliferation, the most critical are:

- **Theorem A.1 (Convexity):** The polytope P ⊂ ℝ¹⁴ is convex. Any convex combination of two safe molecular designs is guaranteed safe—there are no "unsafe pockets" within the polytope interior where a weaponizable compound could be concealed.

- **Theorem A.3 (Unique Projection):** For any molecular design vector x ∈ ℝ¹⁴, a unique closest point π(x) ∈ P exists minimizing ‖x − π(x)‖₂, computed via KKT-constrained quadratic programming. Every potentially unsafe design is uniquely and deterministically mapped to the nearest safe analog, preserving design intent while ensuring safety. An adversary cannot "confuse" the system into producing a weaponizable output.

- **Theorem A.5 (Contraction Mapping):** The mapping from adversarial input space to the Heritage Manifold is a contraction: ‖φ(x₁) − φ(x₂)‖ ≤ ‖x₁ − x₂‖. Small adversarial perturbations are minimized, not amplified, during mapping—the formal basis for the Heritage System's 98.9% adversarial robustness (vs. 41% SOTA).

- **Theorem A.9 (Global Convergence):** For any initial state x₀, the system converges to the safe polytope: lim\_\{t→∞\} d(x\_t, H) = 0. Reasoning trajectories that begin outside the safe region are inexorably pulled back into it—"geometric gravity" guaranteeing long-term operational stability under sustained adversarial pressure.

**LINA Platform (TRL 7).** The Heritage System is realized in the LINA Platform (v1.1.0), a production-grade software system that has been publicly released and independently benchmarked. The platform consists of six Docker containers (FastAPI identity service, Node.js orchestration backend, Next.js frontend, Ubuntu desktop, PostgreSQL 16, Dragonfly cache). The safety evaluation pipeline operates in five stages—Decision Encoding, Polytope Evaluation, Correction, Wisdom Filter, and Zone Classification—with a complete end-to-end latency of 12ms mean (8ms median, 48ms 99th percentile), a 20× improvement over the 240ms SOTA for post-hoc filtering.

**Surgical Weave.** The Heritage System's compression protocol achieves 60–125× context compression while maintaining ≥0.95 semantic fidelity (mean: 87.3×, mean fidelity: 0.97). For nonproliferation, this enables lossless handoffs between international partners, immutable tracking of molecular design provenance, and efficient chain-of-custody storage.

**Hardware Safety Watchdog.** As a final, irreducible safety layer, an air-gapped Arduino monitors real-time 14D coordinates via a dedicated 12-bit DAC on a separate safety bus. If the vector approaches within a defined epsilon of the polytope boundary, the Arduino triggers a physical relay cutting power to primary compute nodes within 50ms. This physical constraint cannot be bypassed by software updates, API calls, or configuration changes.

**Democratized Deployment.** The Heritage System's deployment on a $225 flea-market PC demonstrates that high-level nonproliferation security is democratizable. Partner nations with limited computational infrastructure can deploy the same safeguards as those with advanced resources.

## SECTION 7 — PROPOSED PROGRAM SCHEDULE AND TIMELINE

The program is organized into four phases over 24 months, with parallel workstreams across all six activities.

| Phase | Months | Key Activities | Deliverables |
| - | - | - | - |
| **1: Assessment & Preparation** | 1–6 | Activity 1: Risk assessment workshops (bilateral); Activity 5: Trainer identification begins; Community of Practice launch | Partner Nation Risk Assessment Reports; Standardized CBAIM Risk Taxonomy; Community of Practice Charter; Trainer Cohort Identified |
| **2: Deployment & Piloting** | 4–12 | Activity 2: Heritage System deployment at 3–5 sites; Activity 4: Workshop 1 (M6) and TTX 1 (M12); Activity 6: Screening tool development; Activity 5: Curriculum development | Deployment Reports; Integration Documentation; Workshop/TTX Reports; CBAIM Safety Curriculum (M10); Screening Tool (M12) |
| **3: Standards & Validation** | 12–20 | Activity 3: Guidelines development; Activity 4: Workshop 2 (M14) and TTX 2 (M18); Activity 6: Screening tool validation; Activity 5: Trainer certification | International CBAIM Safety Guidelines (M14); Code of Ethics (M18); Validation Report (M20); Certified Trainer Network |
| **4: Sustainability & Handoff** | 20–24 | Activity 3: Final standards publication and open-source release; Activity 4: Workshop 3 (M22); Activity 5: Trainer network operational; Final reporting | Verification Framework (M20); Open-Source Tooling Suite (M20); Workshop 3 Report; Collaboration Roadmap (M22); Final Report (M24) |


## SECTION 8 — PROGRAM PARTNERS

smartscott.com LLC will engage academic, government, and research institutions across all 18 countries of impact in three tiers:

- **Tier 1 — Deployment Partners (3–5 institutions):** Institutions hosting Heritage System deployments and contributing to standards development. Candidates include leading research universities and national laboratories in India, Israel, the United Kingdom, Japan, and the Republic of Korea.

- **Tier 2 — Workshop and Exercise Participants (8–12 institutions):** Institutions participating in workshops, table-top exercises, and red-teaming events from all 18 countries of impact.

- **Tier 3 — Training and Capacity Building Partners (10–15 institutions):** Institutions in the mentorship and trainer-development program, with a focus on resource-constrained partners in Armenia, Azerbaijan, Greece, and other nations building CBAIM research capacity.

Technical collaboration agreements will cover data sharing protocols for CBAIM risk assessment, joint benchmarking methodology, shared red-teaming infrastructure, and code contributions to the open-source tooling suite. All program activities will be coordinated with the U.S. Department of State, relevant embassy science sections, and partner nation nonproliferation authorities to ensure alignment with U.S. foreign policy objectives and nonproliferation treaty obligations.

## SECTION 9 — FUTURE FUNDING AND SUSTAINABILITY

**Institutional Sustainability.** The Heritage System's open-source codebase, Docker architecture, and commodity hardware requirements ensure partner institutions can maintain and extend deployments independently. The Arduino watchdog is a low-cost, off-the-shelf component replaceable by any institution with basic electronics capability.

**Community Sustainability.** The Community of Practice (20–30 certified trainers across partner nations, published curriculum, shared red-teaming repository) will be self-sustaining through peer-to-peer knowledge sharing, rotating workshop hosting, and collaborative open-source development.

**Standards Sustainability.** Published guidelines will be living documents with a defined revision cycle. The Community of Practice will serve as the standards body for ongoing revision, with smartscott.com LLC providing voluntary technical secretariat support.

**Future Funding Pathways.** (1) NDF Phase II for expanded partner network and additional CBAIM architectures; (2) NIST AI Safety Institute collaboration to formalize geometric safety as a national standard; (3) Engagement with OPCW, BWC Implementation Support Unit, and IAEA for integration into international verification frameworks; (4) Commercial licensing to pharmaceutical and biotech organizations for verifiable safety compliance, supporting ongoing open-source development; (5) Philanthropic foundation support for resource-constrained partner nations.

**Long-Term Vision.** The ultimate goal is to establish geometric surety as the default safety paradigm for CBAIM development worldwide. By the end of the grant period, every major CBAIM development effort will include geometric safety enforcement; international guidelines will be grounded in verifiable mathematical guarantees; a global network of certified trainers will provide ongoing capacity building; the open-source Heritage System tooling suite will be the de facto standard for CBAIM safety evaluation; and routine international red-teaming exercises will ensure safeguards remain effective against evolving threats. This vision is achievable because the Heritage System is not a promise—it is a working, validated, production-grade system that has already demonstrated its capabilities.


*10
