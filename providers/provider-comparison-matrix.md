# Provider Comparison Matrix v1

## Purpose
Initial provider matrix for HamMediaLabs. This should be reviewed regularly because free tiers change.

## AI providers
| Provider | Role | Free-first value | Strength | Risk | Default status |
|---|---|---:|---|---|---|
| Google AI Studio / Gemini | Primary reasoning and long-context tasks | High | Strong free tier, long context, multimodal | Quotas and policy changes | Primary |
| Groq | Fast generation and lightweight agents | High | Very fast inference | Quota changes | Primary speed layer |
| OpenRouter | Model variety and fallback routing | Medium/High | Multiple free models and OpenAI-compatible API | Free model limits can shift | Fallback / experimentation |
| Hugging Face | OSS model testing and niche models | Medium | Wide model ecosystem | Inconsistent limits/performance | Experimental |
| Cloudflare Workers AI | Edge inference and simple tasks | Medium | Fits Cloudflare hosting stack | Smaller model set and quotas | Edge fallback |
| GitHub Models | Developer experimentation | Medium | Good for repo-linked workflows | Access/limits can vary | Dev/testing |

## Hosting providers
| Provider | Role | Strength | Risk | Default status |
|---|---|---|---|---|
| Cloudflare Pages | Static sites and edge hosting | Strong free static hosting, DNS ecosystem | Dynamic backend limits | Primary static host |
| GitHub Pages | Simple static sites and docs | Easy repo-based deployment | Limited backend features | Secondary static host |
| Vercel | Modern frontend prototypes | Great DX | Free tier constraints/commercial limits to verify | Selective |
| Netlify | Static sites and forms | Mature workflow | Limits and usage billing | Selective fallback |
| Supabase | Database/auth/storage | Fast MVP backend | Free project limits and pausing | Primary DB candidate |
| Neon | Postgres alternative | Serverless Postgres | Free limits/pausing | DB fallback |

## Social/distribution providers
| Provider | Role | Strength | Risk | Default status |
|---|---|---|---|---|
| Reddit | Validation and community signal | Strong authentic traffic signal | Anti-spam enforcement | Manual-first |
| TikTok | Viral short-form reach | High discovery potential | Automation and trust risk | Manual/high-control |
| Instagram | Visual/social distribution | Large audience | Meta trust gates | Manual/high-control |
| YouTube Shorts | Durable short-form discovery | Search + recommendation | Quality demands | Recommended |
| X | Fast trend testing | Real-time discovery | Automation risk | Controlled |
| Pinterest | Evergreen traffic | Strong for visual/how-to niches | Niche dependent | Test |

## Current recommendation
Use a multi-provider architecture:
- Gemini for long-context planning and richer generation
- Groq for fast content variations
- OpenRouter as model fallback
- Cloudflare Pages/GitHub Pages for static brands
- Supabase/Neon for structured data

## Sources to re-check
- Provider official pricing/limits pages
- Free LLM API directories
- Hosting free tier pages
- Platform automation policies
