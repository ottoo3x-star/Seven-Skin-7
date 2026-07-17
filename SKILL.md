---
name: b2b-service-website
description: "Build and operate high-converting B2B service company websites for agencies managing multiple clients. Use for: local service businesses (recovery, towing, legal, HVAC, security, logistics, etc.) targeting institutional or commercial clients. Covers the full agency lifecycle: PRD intake, design brainstorm, AI image generation, component build, Google Maps, lead capture form, CRM integration (HubSpot, GoHighLevel, Salesforce, Pipedrive, Zapier), UTM lead tracking, GA4/Meta Pixel/GTM analytics, multi-client project management, and client handoff."
---

# B2B Service Website — Agency Framework

Builds high-converting, visually polished websites for local/regional service companies and manages the full agency lifecycle: from client intake through CRM hookup, lead tracking, analytics, and monthly reporting.

**Primary KPIs:** Form submissions (repo/service orders) and inbound phone calls.

## Workflow Overview

1. **Agency Setup** — Register client, establish project naming, configure secrets
2. **Intake** — Extract all brand, content, CRM, and tracking info from the client PRD
3. **Design** — Brainstorm 3 approaches, select one, commit fully
4. **Images** — Generate 4 AI images in parallel before writing any code
5. **Build** — Scaffold all 13 components in order
6. **Tracking** — Add UTM capture, conversion events, and analytics pixels
7. **CRM** — Upgrade to full-stack if needed, wire form to CRM and email
8. **Polish** — Mobile CTA bar, scroll animations, map
9. **Deliver** — Checkpoint, publish, client handoff

---

## Step 0: Agency Project Setup

Before starting any client work, establish the project identity:

**Client slug:** lowercase-hyphenated, e.g. `done-rite-recovery`, `apex-hvac`

**Static assets path:** `/home/ubuntu/webdev-static-assets/{client-slug}/` — isolate each client's images here before uploading to CDN.

**Agency client registry:** Maintain `/home/ubuntu/agency-clients.md` with one row per client (slug, name, domain, status, CRM, checkpoint ID). Update after every delivery.

Read `references/agency-workflow.md` for the full multi-client project structure, white-labeling setup, and delivery modes (one-time vs. retainer vs. landing page sprints).

---

## Step 1: Intake Checklist

Extract from the client PRD. Fields marked † are required for CRM/tracking setup.

| Category | Field | Example |
|---|---|---|
| Identity | Company name | Done Rite Recovery Services |
| Identity | Industry vertical | recovery / hvac / legal / logistics |
| Contact | Phone (formatted + digits-only) | (708) 418-4315 / 7084184315 |
| Contact | Email | info@company.com |
| Contact | Address | 3056 E 170th St, Lansing, IL |
| Brand | Primary color | Signal red / navy / cobalt |
| Content | Hero headline | "Fast, Compliant Vehicle Recovery..." |
| Content | Trust bar items (4 max) | 25+ Years · Licensed · CFPB · 24/7 |
| Content | Services list (6 max) | Name + 1-sentence description |
| Content | Differentiators (5 max) | Fleet, tech, certifications, coverage |
| Content | Testimonials (3) | Quote + author + company |
| Coverage | Service area cities | For map + footer |
| Coverage | Google Maps URL | Business listing URL |
| CRM† | Platform | HubSpot / GHL / Salesforce / Zapier |
| CRM† | Lead notification email | Where to send new lead alerts |
| Tracking† | GA4 Measurement ID | G-XXXXXXXXXX |
| Tracking† | Meta Pixel ID | 15-digit number |
| Tracking† | GTM Container ID | GTM-XXXXXXX (optional) |
| Tracking† | Call tracking number | CallRail forwarding number |

---

## Step 2: Design Brainstorm

After `webdev_init_project`, create `ideas.md` with **3 distinct design approaches**. Each must define: Design Movement, Color Philosophy (OKLCH values), Layout Paradigm, Typography System, Signature Elements, and Animation style.

**Select ONE approach** and state it to the user. Document the chosen style at the top of every component file.

**Anti-patterns:** purple gradients, excessive rounded corners, uniform card grids, Inter-only typography, centered hero layouts.

Read `references/design-patterns.md` for proven palettes, font pairings, and layout paradigms by industry vertical.

---

## Step 3: AI Image Generation

Generate **4 images in a single parallel call** before writing any components.

| Slot | Content | Ratio | Usage |
|---|---|---|---|
| Hero | Fleet/equipment at night, dramatic lighting, city backdrop | 16:9 | Hero background |
| Technology | Key tech close-up (LPR, equipment, tools) | 4:3 | Why Us section |
| Facility | Aerial/wide shot of facility, lot, or office | 16:9 | Storage/About section |
| Agent/Team | Professional staff portrait, cinematic | 3:4 | Contact panel background |

**Prompt formula:** `[subject] + [environment/time] + [lighting style] + [mood] + [camera angle] + [quality descriptors]`

Store CDN URLs immediately. Use `.webp` variants in all `<img>` tags.

---

## Step 4: Component Build Order

Build in this sequence (matches PRD scroll flow):

1. `index.css` — brand tokens, fonts, utility classes (`.btn-primary`, `.section-label`, `.pulse-dot`)
2. `index.html` — Google Fonts link, meta description, analytics pixel scripts
3. `Navbar.tsx` — sticky dark, logo, nav links, phone + CTA
4. `HeroSection.tsx` — full-bleed image, headline, trust badges, animated stat counters
5. `SocialProofSection.tsx` — testimonials, trust stats bar, CTA strip
6. `ServicesSection.tsx` — service cards grid (6 max), scroll reveal, CTA strip
7. `WhyUsSection.tsx` — differentiator bullets, stacked images, CTA strip
8. `StorageSection.tsx` — full-bleed facility image with overlay content
9. `CoverageSection.tsx` — Google Maps + service area list, CTA strip
10. `ContactSection.tsx` — split-panel lead capture form with success state
11. `Footer.tsx` — address, phone, links, compliance badges, `pb-16 lg:pb-0`
12. `StickyMobileCTA.tsx` — mobile-only sticky bottom bar (phone + form)
13. `Home.tsx` — assemble all sections, call `useUTM()` hook

Read `references/component-specs.md` for detailed layout, conversion patterns, and code snippets for each component.

---

## Step 5: Conversion Patterns (Apply on Every Build)

**CTA repetition:** Dark panel strip with primary CTA button at the bottom of every major section.

**Phone number:** In navbar (desktop), hero, contact panel, footer, and mobile sticky bar. Always `href="tel:DIGITSONLY"`. Add `onClick={() => trackPhoneClick(phone)}` from `lib/trackConversion.ts`.

**Form fields:** Company Name, Contact Name, Phone, Email (required), Asset Info, Last Known Location, Notes. Show a success confirmation state after submission.

**Trust signals:** Compliance/certification badges in hero trust bar AND footer. Use `Shield`, `CheckCircle`, `Award`, `Clock` from `lucide-react`.

**Stat counters:** Animate on scroll-into-view using `IntersectionObserver`. See `useCountUp` hook in `references/component-specs.md`.

---

## Step 6: UTM Tracking Setup

Add `hooks/useUTM.ts` and call `useUTM()` in `Home.tsx` to capture and persist UTM parameters in `sessionStorage` on page load. Merge stored UTM data into every form submission payload.

Add `lib/trackConversion.ts` with `trackFormSubmission()` and `trackPhoneClick()` functions that fire to GA4, Meta Pixel, and GTM dataLayer simultaneously.

Read `references/lead-tracking.md` for the full hook implementation, source attribution logic, phone call tracking (CallRail/DNI), lead scoring, and session replay setup.

---

## Step 7: Analytics Pixels

Add tracking scripts to `client/index.html` based on client's provided IDs:

- **GA4:** `gtag.js` script with Measurement ID — mark `generate_lead` and phone click as Key Events
- **Meta Pixel:** Standard pixel with `PageView` on load, `Lead` on form submit, `Contact` on phone click
- **GTM:** Replace direct scripts with GTM container if client manages their own tags

Store all IDs as `VITE_` prefixed secrets in Settings → Secrets.

Read `references/analytics-setup.md` for full script snippets, GTM trigger configuration, Conversions API (server-side), and the monthly client reporting template.

---

## Step 8: CRM Integration

**Decision:** Does the client need real form delivery (email + CRM sync)?

- **Yes** → Run `webdev_add_feature("web-db-user")` to unlock backend routes and database
- **Zapier only** → No upgrade needed; fire a `fetch` POST to the Zapier webhook URL from the frontend

After upgrading, create the `leads` table (schema in `references/crm-integration.md`), add a `POST /api/leads` backend route that: saves to DB → sends email notification → syncs to CRM asynchronously.

Supported CRM platforms: **HubSpot**, **GoHighLevel**, **Salesforce** (Web-to-Lead), **Pipedrive**, **Zapier webhook**.

Read `references/crm-integration.md` for platform-specific API code, the Resend email notification pattern, lead deduplication logic, and the native-form-vs-embed decision guide.

---

## Step 9: Google Maps Integration

Use the built-in `MapView` from `@/components/Map.tsx` — no API key needed.

```tsx
import { MapView } from "@/components/Map";
const handleMapReady = (map: google.maps.Map) => {
  map.setCenter({ lat: LAT, lng: LNG });
  map.setZoom(10);
  new google.maps.Marker({ position: { lat: LAT, lng: LNG }, map });
  new google.maps.Circle({
    map, center: { lat: LAT, lng: LNG }, radius: 80000,
    strokeColor: "#DC2626", fillColor: "#DC2626", fillOpacity: 0.08,
  });
};
<MapView onMapReady={handleMapReady} className="w-full h-full" />
```

---

## Step 10: Delivery & Handoff

1. Run `webdev_save_checkpoint` with a message listing all implemented sections and integrations
2. Verify the client handoff checklist in `references/agency-workflow.md` (content, technical, conversion, delivery)
3. Attach `manus-webdev://{version_id}` in the result message
4. Update `/home/ubuntu/agency-clients.md` with the new client row
5. Suggest 3 next steps: connect CRM (if not done), update placeholder content, publish via the Publish button

---

## Reference Files

| File | When to Read |
|---|---|
| `references/design-patterns.md` | Step 2 — design brainstorm (palettes, fonts, layouts) |
| `references/component-specs.md` | Step 4 — building any of the 13 components |
| `references/agency-workflow.md` | Step 0 — project setup, multi-client management, handoff checklist |
| `references/crm-integration.md` | Step 8 — CRM platform code, DB schema, email notifications |
| `references/lead-tracking.md` | Step 6 — UTM hooks, conversion events, call tracking, lead scoring |
| `references/analytics-setup.md` | Step 7 — GA4/Pixel/GTM scripts, client reporting, KPI benchmarks |
