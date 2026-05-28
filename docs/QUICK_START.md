# 🚀 Quick-Start Guide — CollabSmart with LINA

Get CollabSmart running in minutes using **OpenRouter** and the free **Owl Alpha** model as your primary AI provider.

---

## What is Owl Alpha?

**Owl Alpha** is a high-performance foundation model designed for agentic workloads.  
It natively supports tool use and long-context tasks, with strong performance in:

- Code generation
- Automated workflows
- Complex instruction execution

| Property | Value |
|----------|-------|
| Provider | [OpenRouter](https://openrouter.ai) |
| Model ID | `openrouter/owl-alpha` |
| Price | **Free** |
| Context window | 1 M tokens |
| Released | April 28, 2026 |

Compatible with Claude Code, OpenClaw, and other mainstream productivity tools.

> **Note:** Prompts and completions may be logged by the provider and used to improve the model.

---

## Prerequisites

| Requirement | Notes |
|-------------|-------|
| [Docker](https://docs.docker.com/get-docker/) ≥ 24 | Required for all services |
| [Docker Compose](https://docs.docker.com/compose/) ≥ 2 | `docker compose` plugin or standalone |
| Node.js / npm | For local dependency installation |
| OpenRouter API key | Free — sign up at [openrouter.ai](https://openrouter.ai) |

---

## Step-by-step Setup

### 1 — Clone the repository

```bash
git clone https://github.com/smartscott-LLC/CollabSmart.git
cd CollabSmart
```

### 2 — Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 3 — First run (creates `.env`)

```bash
./start.sh
```

The script will create a `.env` file if one does not already exist.  
Press **Ctrl-C** to stop it once the file has been created.

### 4 — Configure OpenRouter + Owl Alpha

Open `.env` in your editor:

```bash
nano .env
```

Set the following values (add or update them):

```dotenv
# ── AI Provider ──────────────────────────────────────────────────────────────
AI_PROVIDER=openrouter
AI_API_KEY=sk-or-...          # ← paste your OpenRouter API key here
AI_MODEL=openrouter/owl-alpha # ← Owl Alpha (free, 1M-token context)
AI_BASE_URL=https://openrouter.ai/api/v1
```

> **Tip:** You can find or create your API key at  
> https://openrouter.ai/keys

### 5 — Start the full stack

```bash
./start.sh
```

### 6 — Open your browser

| Service | URL |
|---------|-----|
| **Chat UI** | http://localhost:3000 |
| **Shared Desktop** | http://localhost:6080 |
| **Backend health** | http://localhost:3001/health |

---

## Useful commands

```bash
# Stream logs from all services
docker compose logs -f

# Stop everything
docker compose down

# ⚠️ Full reset — erases all memory volumes
docker compose down -v
```

---

## Switching providers later

You can swap the AI provider at any time by editing `.env` and restarting:

| Provider | `AI_PROVIDER` | `AI_MODEL` example | Key source |
|----------|---------------|--------------------|------------|
| **OpenRouter** *(recommended)* | `openrouter` | `openrouter/owl-alpha` | [openrouter.ai/keys](https://openrouter.ai/keys) |
| Anthropic | `anthropic` | `claude-opus-4-5` | [console.anthropic.com](https://console.anthropic.com) |
| Groq | `groq` | `llama-3.1-8b-instant` | [console.groq.com](https://console.groq.com) |
| Ollama (local) | `ollama` | `llama3.2` | No key needed |
| OpenAI | `openai` | `gpt-4o` | [platform.openai.com](https://platform.openai.com) |
| Together AI | `together` | `meta-llama/Llama-3-70b` | [api.together.xyz](https://api.together.xyz) |

---

## Next steps

- Read the full [README](../README.md) for architecture details, the memory system, and agent configuration.
- Explore `docs/lina-implementation-spec.md` for LINA's identity and ethical framework.
- Check `docs/EXECUTIVE_REVIEW.md` for a high-level product overview.
