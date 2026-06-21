## Tech-Stack used

- React 19 (Vite)
- tailwindcss
- Zustand (for Global State Management)
- vitest (unit testing)
- husky (commit & push guards)

## Tech Features

- CI/CD pipeline to ensure unit tests succeed before merging to "main" branch and block merging if it fails
- commit message and pre-push guards to control naming conventions
- SEO optimization using react-helmet-async

## If I have more time

- Add more unit tests (currently only added for critical logic hooks)
- Implement E2E testing

## Installation

To run the chrome extention locally, use the following commands

`git clone https://github.com/shadyhussein99/ecom-experts`

Install the dependencies

`pnpm install`

Run the application

`pnpm dev`

## To clear local storage after persisting products (frest start)

Kill the running server and run `pnpm dev` again, I added a small logic to reset the persisted products on fresh start

## Deployment Link

https://ecom-experts.netlify.app/

## Documentation for System Architecture

[system-architecture.html](https://github.com/user-attachments/files/29181009/system-architecture.html)
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Product Selection Flow · ecom-experts</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📹</text></svg>" />
<style>
  :root {
    --bg: #f5f7fc;
    --bg-2: #eef2f9;
    --panel: #ffffff;
    --panel-2: #f4f7fc;
    --line: #dbe2ef;
    --line-soft: #e9eef6;
    --txt: #16203a;
    --txt-dim: #4d5a78;
    --txt-faint: #7a86a3;
    --accent: #0ea271;
    --accent-2: #0891b2;
    --accent-3: #7c3aed;
    --warn: #b45309;
    --danger: #e11d48;
    --primary: #0ea271;
    --radius: 16px;
    --radius-sm: 10px;
    --mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
    --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    --shadow: 0 14px 34px -20px rgba(28,46,86,.20);
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    font-family: var(--sans);
    color: var(--txt);
    background:
      radial-gradient(1100px 600px at 12% -8%, rgba(16,185,129,.10), transparent 60%),
      radial-gradient(1000px 600px at 90% 0%, rgba(124,58,237,.08), transparent 55%),
      var(--bg);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  .wrap { max-width: 1120px; margin: 0 auto; padding: 0 22px; }

  /* Typography */
  h1, h2, h3 { line-height: 1.2; margin: 0; letter-spacing: -0.02em; }
  .eyebrow {
    font-size: 12px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase;
    color: var(--accent-2);
  }
  p { margin: 0 0 14px; color: var(--txt-dim); }
  .ic { color: var(--accent); font-family: var(--mono); background: rgba(14,162,113,.08);
        border: 1px solid rgba(14,162,113,.22); padding: 1px 7px; border-radius: 6px; font-size: .86em; white-space: nowrap; }
  .ic.v { color: var(--accent-3); background: rgba(124,58,237,.08); border-color: rgba(124,58,237,.22); }
  .ic.c { color: var(--accent-2); background: rgba(8,145,178,.08); border-color: rgba(8,145,178,.22); }

  /* Hero */
  header.hero { padding: 84px 0 40px; position: relative; }
  .badge-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 22px; }
  .pill {
    font-size: 12px; font-weight: 600; color: var(--txt-dim);
    border: 1px solid var(--line); background: #ffffff;
    padding: 6px 12px; border-radius: 999px; display: inline-flex; align-items: center; gap: 7px;
  }
  .pill .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px rgba(14,162,113,.6); }
  .hero h1 { font-size: clamp(34px, 6vw, 60px); font-weight: 800; color: #000; }
  .hero h1 .grad { color: inherit; }
  .hero .lede { font-size: clamp(16px, 2.2vw, 20px); max-width: 720px; margin-top: 18px; color: var(--txt-dim); }
  .scroll-hint { margin-top: 30px; font-size: 13px; color: var(--txt-faint); display: inline-flex; gap: 8px; align-items: center; }
  .scroll-hint .arrow { animation: bob 1.6s ease-in-out infinite; }
  @keyframes bob { 0%,100%{ transform: translateY(0);} 50%{ transform: translateY(4px);} }

  /* Sections */
  section { padding: 46px 0; border-top: 1px solid var(--line-soft); }
  .sec-head { margin-bottom: 30px; }
  .sec-head h2 { font-size: clamp(24px, 3.6vw, 34px); font-weight: 800; margin-top: 8px; }
  .sec-head p { margin-top: 12px; max-width: 760px; }
  .num { color: var(--txt-faint); font-variant-numeric: tabular-nums; }

  /* Cards and grid */
  .grid { display: grid; gap: 18px; }
  .g2 { grid-template-columns: 1fr 1fr; }
  .g3 { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 860px){ .g2, .g3 { grid-template-columns: 1fr; } }

  .card {
    background: linear-gradient(180deg, var(--panel), var(--bg-2));
    border: 1px solid var(--line); border-radius: var(--radius);
    padding: 22px; box-shadow: var(--shadow);
  }
  .card h3 { font-size: 17px; font-weight: 700; margin-bottom: 6px; }
  .card .sub { font-size: 13px; color: var(--txt-faint); margin-bottom: 12px; }
  .store-card { position: relative; overflow: hidden; }
  .store-card::before {
    content:""; position:absolute; inset:0 auto 0 0; width: 4px;
    background: linear-gradient(var(--accent), var(--accent-2));
  }
  .store-card.alt::before { background: linear-gradient(var(--accent-3), var(--accent-2)); }
  .tag { display:inline-block; font-family: var(--mono); font-size: 12px; color: var(--accent);
         background: rgba(14,162,113,.08); border:1px solid rgba(14,162,113,.22); border-radius: 6px; padding: 2px 8px; }
  .tag.v { color: var(--accent-3); background: rgba(124,58,237,.08); border-color: rgba(124,58,237,.22); }

  ul.clean { margin: 8px 0 0; padding: 0; list-style: none; }
  ul.clean li { position: relative; padding-left: 22px; margin: 7px 0; color: var(--txt-dim); font-size: 14.5px; }
  ul.clean li::before { content:"›"; position:absolute; left: 4px; top: -1px; color: var(--accent); font-weight: 700; }

  /* Architecture diagram */
  .arch { display:flex; flex-direction: column; align-items: center; gap: 0; }
  .node {
    background: linear-gradient(180deg, var(--panel), var(--panel-2));
    border: 1px solid var(--line); border-radius: 14px; padding: 16px 20px; text-align:center;
    min-width: 220px; box-shadow: var(--shadow);
  }
  .node .t { font-weight: 700; font-size: 15px; }
  .node .m { font-family: var(--mono); font-size: 11.5px; color: var(--txt-faint); margin-top: 3px; }
  .node.root { border-color: rgba(8,145,178,.5); box-shadow: 0 0 0 1px rgba(8,145,178,.12), var(--shadow); }
  .node.store { border-color: rgba(14,162,113,.45); }
  .node.store.alt { border-color: rgba(124,58,237,.4); }
  .connector { width: 2px; height: 26px; background: linear-gradient(var(--line), var(--accent-2)); }
  .branch { display:flex; gap: 26px; justify-content:center; flex-wrap: wrap; width: 100%; }
  .branch .col { display:flex; flex-direction: column; align-items: center; flex: 1; min-width: 240px; }
  .arch-stores { display:flex; gap: 18px; flex-wrap: wrap; justify-content: center; margin-top: 8px; width:100%; }

  /* Product card anatomy */
  .anatomy { display:grid; grid-template-columns: 1.1fr .9fr; gap: 22px; align-items: stretch; }
  @media (max-width: 860px){ .anatomy { grid-template-columns: 1fr; } }
  .callchain { display:flex; flex-direction: column; gap: 8px; }
  .cc-step { display:flex; align-items:center; gap: 12px; padding: 11px 14px; border: 1px solid var(--line);
             border-radius: 12px; background: var(--panel); font-size: 13.5px; box-shadow: var(--shadow); }
  .cc-step .i { width: 26px; height: 26px; border-radius: 8px; display:grid; place-items:center; font-family: var(--mono);
                font-size: 12px; font-weight: 700; flex-shrink:0; background: rgba(8,145,178,.10); color: var(--accent-2); border:1px solid rgba(8,145,178,.25); }
  .cc-step .desc small { color: var(--txt-faint); }
  .cc-arrow { text-align:center; color: var(--txt-faint); font-size: 12px; line-height: 1; }

  /* Persistence timeline */
  .timeline { display:flex; flex-direction: column; gap: 0; margin-top: 8px; }
  .tl-item { display:flex; gap: 16px; }
  .tl-rail { display:flex; flex-direction: column; align-items:center; }
  .tl-dot { width: 30px; height: 30px; border-radius: 50%; background: var(--panel-2); border: 2px solid var(--accent);
            display:grid; place-items:center; flex-shrink:0; }
  .tl-line { width: 2px; flex: 1; background: linear-gradient(var(--accent), var(--line)); min-height: 18px; }
  .tl-body { padding-bottom: 24px; }
  .tl-body h4 { margin: 3px 0 4px; font-size: 15px; font-weight: 700; }
  .tl-body p { font-size: 13.5px; margin: 0; }
  .tl-item:last-child .tl-line { display:none; }

  .keynote { display:flex; gap: 14px; align-items:flex-start; padding: 16px 18px; border-radius: 14px;
             background: rgba(251,191,36,.12); border:1px solid rgba(180,83,9,.28); margin: 18px 0; }
  .keynote .em { font-size: 22px; line-height: 1; }
  .keynote .txt { font-size: 14px; color: #92400e; }
  .keynote .txt b { color: var(--warn); }

  /* Takeaways */
  .take { display:grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
  @media (max-width: 720px){ .take { grid-template-columns: 1fr; } }
  .take .t { background: var(--panel); border:1px solid var(--line); border-radius: 14px; padding: 16px 18px; box-shadow: var(--shadow); }
  .take .t .n { font-family: var(--mono); font-size: 12px; color: var(--accent-2); }
  .take .t h4 { margin: 6px 0 5px; font-size: 15px; font-weight: 700; }
  .take .t p { font-size: 13px; margin: 0; }

  /* Reveal on scroll */
  .reveal { opacity: 0; transform: translateY(18px); transition: opacity .6s ease, transform .6s ease; }
  .reveal.in { opacity: 1; transform: none; }
</style>
</head>
<body>

<!-- HERO -->
<header class="hero">
  <div class="wrap">
    <div class="badge-row reveal">
      <span class="pill"><span class="dot"></span> ecom-experts · System Builder</span>
      <span class="pill">Zustand state</span>
      <span class="pill">React + TypeScript</span>
    </div>
    <h1 class="reveal">How products flow through<br><span class="grad">the System Builder and System Architecture</span></h1>
    <p class="lede reveal">A visual walkthrough of how a selection travels from a <b style="color:var(--txt)">ProductCard</b> in
      the builder steps, into a single Zustand store, out to the live <b style="color:var(--txt)">Order Summary</b>,
      and finally onto disk through the <b style="color:var(--txt)">save for later</b> persistence layer.</p>
    <div class="scroll-hint reveal"><span class="arrow">↓</span> Scroll to explore the flow below</div>
  </div>
</header>

<!-- BIG PICTURE -->
<section>
  <div class="wrap">
    <div class="sec-head reveal">
      <div class="eyebrow"><span class="num">01</span> · The big picture</div>
      <h2>One page, two halves, one source of truth</h2>
      <p>The <span class="ic">SystemBuilder</span> page splits into two columns: the interactive <b style="color:var(--txt)">BuilderSteps</b> on the left
        and the read-along <b style="color:var(--txt)">OrderSummary</b> on the right. They never talk to each other directly;
        they both subscribe to the same Zustand store, so a change on one side instantly reflects on the other.</p>
    </div>

    <div class="card reveal" style="padding: 30px 22px;">
      <div class="arch">
        <div class="node root">
          <div class="t">SystemBuilder</div>
        </div>
        <div class="connector"></div>

        <div class="branch">
          <div class="col">
            <div class="node">
              <div class="t">BuilderSteps</div>
            </div>
            <div class="connector" style="background:linear-gradient(var(--line),var(--accent));"></div>
          </div>
          <div class="col">
            <div class="node">
              <div class="t">OrderSummary</div>
            </div>
            <div class="connector" style="background:linear-gradient(var(--line),var(--accent));"></div>
          </div>
        </div>

        <div class="arch-stores">
          <div class="node store">
            <div class="t">useProductsStore</div>
            <div class="m" style="color:var(--accent)">selectedProducts · setQuantity · saveForLater</div>
          </div>
          <div class="node store alt">
            <div class="t">useMockProductResponseStore</div>
            <div class="m" style="color:var(--accent-3)">catalog data · loading status</div>
          </div>
        </div>
        <div class="connector"></div>
        <div class="node store" style="border-color:var(--line)">
          <div class="t">localStorage</div>
        </div>
      </div>
    </div>

    <div class="grid g2" style="margin-top: 18px;">
      <div class="card store-card reveal">
        <span class="tag">selection state</span>
        <h3 style="margin-top:10px;">useProductsStore</h3>
        <div class="sub">The single source of truth for the cart</div>
        <ul class="clean">
          <li><span class="ic">selectedProducts</span>, a keyed map of everything chosen</li>
          <li><span class="ic">setQuantity()</span>, add, update, or remove a line</li>
          <li><span class="ic">saveForLater()</span>, flush the map to localStorage</li>
        </ul>
      </div>
      <div class="card store-card alt reveal">
        <span class="tag v">catalog state</span>
        <h3 style="margin-top:10px;">useMockProductResponseStore</h3>
        <div class="sub">The product catalog plus its loading lifecycle</div>
        <ul class="clean">
          <li><span class="ic c">data.cameras</span>, the fetched product list</li>
          <li><span class="ic c">status</span>, idle / loading / success / error</li>
          <li><span class="ic c">loadProducts()</span>, mock fetch on page mount</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- INSIDE BUILDERSTEPS -->
<section>
  <div class="wrap">
    <div class="sec-head reveal">
      <div class="eyebrow"><span class="num">02</span> · Inside BuilderSteps</div>
      <h2>A 4-step accordion, selection lives in step 1</h2>
      <p>BuilderSteps renders four collapsible sections, only one open at a time. The
        <b style="color:var(--accent)">Cameras</b> step is where real product selection happens today; the rest are scaffolding.
        Each header shows a live count from <span class="ic">useSelectedProductCounts()</span>, which counts
        <i>distinct products</i> per section (not quantities).</p>
    </div>

    <div class="sec-head reveal">
      <h2 style="font-size:24px;">Anatomy of a selection</h2>
      <p>A <span class="ic">ProductCard</span> owns one <i>local</i> piece of state, the highlighted color, via the
        <span class="ic">useProductCard</span> hook. Quantity, the <i>shared</i> state, is delegated to the store. Here is the exact call chain.</p>
    </div>

    <div class="anatomy reveal" style="grid-template-columns:1fr;">
      <div class="callchain">
        <div class="cc-step"><span class="i">1</span><div class="desc"><b>CardVariants</b> → <span class="ic v">setSelectedVariantId(id)</span><br><small>Local React state. No store write yet.</small></div></div>
        <div class="cc-arrow">↓</div>
        <div class="cc-step"><span class="i">2</span><div class="desc"><b>CardStepper</b> → <span class="ic">setSelectedQuantity(n)</span><br><small>Guards: no color selected → <i>"Please select a color"</i>.</small></div></div>
        <div class="cc-arrow">↓</div>
        <div class="cc-step"><span class="i">3</span><div class="desc">hook calls <span class="ic">setQuantity(&#123;productID, variantID&#125;, n)</span><br><small>variantID is <span class="ic v">null</span> when the product has no variants.</small></div></div>
        <div class="cc-arrow">↓</div>
        <div class="cc-step"><span class="i">4</span><div class="desc">store mutates <span class="ic">selectedProducts</span><br><small>Every subscriber (incl. OrderSummary) re-renders.</small></div></div>
      </div>
    </div>
  </div>
</section>

<!-- DATA MODEL -->
<section>
  <div class="wrap">
    <div class="sec-head reveal">
      <div class="eyebrow"><span class="num">03</span> · The data model</div>
      <h2>One map, keyed by <span style="color:var(--accent)">variantID ?? productID</span></h2>
      <p>Selections aren't an array; they're a <span class="ic">Record&lt;string, productItem&gt;</span>. The key is the
        variant id when a product has colors, otherwise the bare product id. That single rule is what lets
        <span class="ic">setQuantity</span> add, update, and delete a line without ever scanning a list.</p>
    </div>

    <div class="keynote reveal">
      <div class="txt">Setting a quantity to <b>0</b> is the same gesture as <b>removing</b> an item; the key is deleted from the map.
        That's why the stepper in both the card <i>and</i> the order summary can fully remove a line just by ticking down to zero.</div>
    </div>
  </div>
</section>

<!-- ORDER SUMMARY FLOW -->
<section>
  <div class="wrap">
    <div class="sec-head reveal">
      <div class="eyebrow"><span class="num">04</span> · OrderSummary internals</div>
      <h2>From raw map to priced line items</h2>
    </div>

    <div class="anatomy reveal" style="grid-template-columns:1fr;">
      <div class="callchain" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;">
        <div class="cc-step" style="flex-direction:column;align-items:flex-start;"><span class="i">A</span><div class="desc"><b>useOrderItems</b><br><small>subscribes to selectedProducts plus cameras</small></div></div>
        <div class="cc-step" style="flex-direction:column;align-items:flex-start;"><span class="i">B</span><div class="desc"><b>resolveOrderItems</b><br><small>joins each line to its product/variant → title, icon, price</small></div></div>
        <div class="cc-step" style="flex-direction:column;align-items:flex-start;"><span class="i">C</span><div class="desc"><b>OrderItem rows</b><br><small>each has its own stepper → calls setQuantity</small></div></div>
        <div class="cc-step" style="flex-direction:column;align-items:flex-start;"><span class="i">D</span><div class="desc"><b>useOrderTotals</b><br><small>cameras + static + plan + shipping → savings</small></div></div>
      </div>
    </div>
    <style>@media (max-width:860px){ .callchain[style*="repeat(4"]{ grid-template-columns:1fr 1fr !important; } }</style>

    <div class="keynote reveal">
      <div class="txt">The summary's steppers call the <b>same</b> <span class="ic" style="color:var(--warn);background:rgba(251,191,36,.12);border-color:rgba(180,83,9,.25)">setQuantity</span> action as the builder cards.
        Edit on the right, the card on the left updates too; there is exactly one place the truth lives.</div>
    </div>
  </div>
</section>

<!-- PERSISTENCE -->
<section>
  <div class="wrap">
    <div class="sec-head reveal">
      <div class="eyebrow"><span class="num">05</span> · Persistence</div>
      <h2>Manual save, defensive restore</h2>
      <p>This is the detail most people get wrong: selections are <b style="color:var(--warn)">not auto-saved</b>. Bumping a quantity only
        mutates the in-memory store. Nothing touches localStorage until the user explicitly clicks
        <i>"Save my system for later."</i></p>
    </div>

    <div class="keynote reveal">
      <div class="txt"><b>In-memory is not persisted.</b> Quantity changes live in Zustand only. A refresh restores your <i>last saved</i> system;
        any edits made after the last save are gone. The <span class="ic" style="color:var(--warn);background:rgba(251,191,36,.12);border-color:rgba(180,83,9,.25)">saveForLater()</span> click is the single write path.</div>
    </div>

    <div class="grid g2">
      <div class="card reveal">
        <h3>Writing, <span class="ic">persistSavedSystem</span></h3>
        <div class="timeline" style="margin-top:14px;">
          <div class="tl-item"><div class="tl-rail"><div class="tl-dot"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0ea271" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></div><div class="tl-line"></div></div>
            <div class="tl-body"><h4>User clicks "Save my system for later"</h4><p>OrderTotal calls <span class="ic">saveForLater()</span>.</p></div></div>
          <div class="tl-item"><div class="tl-rail"><div class="tl-dot"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0ea271" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></div><div class="tl-line"></div></div>
            <div class="tl-body"><h4>Serialize and write</h4><p><span class="ic">JSON.stringify(selectedProducts)</span> → <span class="ic">localStorage["savedProducts"]</span>, wrapped in try/catch.</p></div></div>
          <div class="tl-item"><div class="tl-rail"><div class="tl-dot"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0ea271" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></div></div>
            <div class="tl-body"><h4>Toast feedback</h4><p>Returns a <span class="ic">boolean</span> → success or error toast.</p></div></div>
        </div>
      </div>

      <div class="card reveal">
        <h3>Restoring, <span class="ic">loadSavedSystem</span></h3>
        <div class="timeline" style="margin-top:14px;">
          <div class="tl-item"><div class="tl-rail"><div class="tl-dot"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0ea271" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></div><div class="tl-line"></div></div>
            <div class="tl-body"><h4>Store initializes</h4><p><span class="ic">getInitialSelectedProducts()</span> runs as the store is created.</p></div></div>
          <div class="tl-item"><div class="tl-rail"><div class="tl-dot"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0ea271" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></div><div class="tl-line"></div></div>
            <div class="tl-body"><h4>Read and validate</h4><p>Parse JSON, then <span class="ic">isValidEntry</span> filters every entry (string ids, <span class="ic">quantity &gt; 0</span>). Bad data is silently dropped.</p></div></div>
          <div class="tl-item"><div class="tl-rail"><div class="tl-dot"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0ea271" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></div></div>
            <div class="tl-body"><h4>Fallback</h4><p><span class="ic">loadSavedSystem() ?? DEFAULT_SELECTED_PRODUCTS</span>, so empty or invalid storage yields the two seed cameras.</p></div></div>
        </div>
      </div>
    </div>

    <div class="reveal" style="margin-top:18px;">
      <div class="card">
        <h3>🧹 Dev-only safety net</h3>
        <div class="sub">resetSavedDataOnNewServerRun.ts</div>
        <p style="font-size:13.5px;">Vite stamps each dev server run with a unique id. On load, if the stored
          <span class="ic">devServerRunId</span> differs, the saved products are cleared, so a code change during development
          never leaves you debugging against stale cached selections.</p>
        <ul class="clean">
          <li>Runs from <span class="ic">main.tsx</span> before React hydrates</li>
          <li>Production builds are untouched</li>
          <li>No versioning / migration; schema changes rely on <span class="ic">isValidEntry</span> to discard mismatches</li>
        </ul>
      </div>
    </div>

    <p style="font-size:13px;color:var(--txt-faint);margin-top:18px;">No backend, no cross-device sync; persistence is 100% client-side localStorage.</p>
  </div>
</section>

<!-- TAKEAWAYS -->
<section>
  <div class="wrap">
    <div class="sec-head reveal">
      <div class="eyebrow"><span class="num">06</span> · In a nutshell</div>
      <h2>Six things to notice</h2>
    </div>
    <div class="take reveal">
      <div class="t"><div class="n">01</div><h4>One store, two readers</h4><p>BuilderSteps writes, OrderSummary reads and edits, both via <span class="ic">useProductsStore</span>. No prop drilling, no duplicated cart state.</p></div>
      <div class="t"><div class="n">02</div><h4>The key is the trick</h4><p><span class="ic">variantID ?? productID</span> keys the map, making add/update/remove O(1) and quantity-0 a natural delete.</p></div>
      <div class="t"><div class="n">03</div><h4>Color is local, quantity is shared</h4><p>The highlighted swatch is component state; only quantity reaches the store. Stepping without a color toasts a warning.</p></div>
      <div class="t"><div class="n">04</div><h4>Summary is a pure projection</h4><p><span class="ic">resolveOrderItems</span> joins selection ⨝ catalog; <span class="ic">computeOrderTotals</span> folds in static sections, plan and shipping.</p></div>
      <div class="t"><div class="n">05</div><h4>Persistence is opt-in</h4><p>Only <i>Save for later</i> writes to localStorage. Reload restores the last saved system; validation guards against junk.</p></div>
      <div class="t"><div class="n">06</div><h4>Everything is client-side</h4><p>Catalog is mocked, cart lives in the browser. No API round-trips for selection or persistence.</p></div>
    </div>
  </div>
</section>

<!-- TESTING AND QUALITY GATES -->
<section>
  <div class="wrap">
    <div class="sec-head reveal">
      <div class="eyebrow"><span class="num">07</span> · Testing &amp; quality gates</div>
      <h2>What guards the main branch</h2>
      <p>Three automated checks keep the repo consistent: unit tests run in CI on every pull request, while two local Git
        hooks (managed by <b style="color:var(--txt)">Husky</b>) enforce naming conventions before code ever leaves your machine.</p>
    </div>

    <div class="grid g3">
      <div class="card store-card reveal">
        <span class="tag">CI · GitHub Actions</span>
        <h3 style="margin-top:10px;">Unit tests</h3>
        <div class="sub">.github/workflows/tests.yml</div>
        <p style="font-size:13.5px;">Runs on every <span class="ic">pull_request</span> targeting <span class="ic">main</span>.</p>
        <ul class="clean">
          <li>Reads Node from <span class="ic">.nvmrc</span> (fallback <span class="ic">18</span>) and caches deps</li>
          <li>Installs <span class="ic">pnpm</span> via Corepack → <span class="ic">pnpm install</span></li>
          <li>Executes <span class="ic">pnpm exec vitest run</span></li>
          <li>A failing test blocks the PR ✗</li>
        </ul>
      </div>

      <div class="card store-card alt reveal">
        <span class="tag v">git hook · commit-msg</span>
        <h3 style="margin-top:10px;">Commit message format</h3>
        <div class="sub">.husky/commit-msg</div>
        <p style="font-size:13.5px;">Validates the <b style="color:var(--txt)">first line</b> of every commit.</p>
        <ul class="clean">
          <li>Must match <span class="ic">&lt;type&gt;/&lt;description&gt;</span></li>
          <li>type ∈ <span class="ic v">feat · fix · chore · refactor</span></li>
          <li><span class="ic">Merge</span> / <span class="ic">Revert</span> commits are skipped</li>
          <li>e.g. <span class="ic">feat/add login button</span></li>
        </ul>
      </div>

      <div class="card store-card reveal">
        <span class="tag">git hook · pre-push</span>
        <h3 style="margin-top:10px;">Branch name format</h3>
        <div class="sub">.husky/pre-push</div>
        <p style="font-size:13.5px;">Validates the <b style="color:var(--txt)">destination branch</b> before a push.</p>
        <ul class="clean">
          <li>Must match <span class="ic">&lt;type&gt;/&lt;kebab-case&gt;</span></li>
          <li>Lowercase words separated by dashes</li>
          <li>Pushes to <span class="ic">main</span> and branch deletions are skipped</li>
          <li>e.g. <span class="ic">feat/this-is-my-branch-name</span></li>
        </ul>
      </div>
    </div>

    <div class="keynote reveal">
      <div class="txt">Together: <b>Husky</b> blocks badly-named commits and branches locally, and <b>GitHub Actions</b> blocks any PR
        whose Vitest suite fails, so <span class="ic" style="color:var(--warn);background:rgba(251,191,36,.12);border-color:rgba(180,83,9,.25)">main</span>
        only ever receives conventionally-named, test-passing changes.</div>
    </div>
  </div>
</section>

<script>
(function () {
  "use strict";

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
})();
</script>
</body>
</html>




