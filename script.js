/* =====================================================
   PRIVATE REPO PAGE · 5 random scenes
   Edit the CONFIG below, upload the 3 files, done.
   Tips: ?scene=1 ... ?scene=5 forces a scene,
         ?repo=my-project sets the repo name shown.
   ===================================================== */
(() => {
  "use strict";

  const CONFIG = {
    name: "Ibrahim",
    // Put your footer anchor in the URL so visitors land on your email/contact section.
    portfolioUrl: "https://YOUR-USERNAME.github.io/YOUR-PORTFOLIO/#footer" // <-- change this
  };

  // Repo name is dynamic: add ?repo=project-name to the link on each portfolio button.
  // Without it, a generic "private-repo" is shown.
  const REPO = (() => {
    const raw = new URLSearchParams(location.search).get("repo") || "";
    const clean = raw.replace(/[^\w.\-]/g, "").slice(0, 40);
    return clean || "private-repo";
  })();

  /* ---------- helpers ---------- */
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  };
  const portfolioBtn = (label = "Take me to the portfolio →", cls = "btn small") => {
    const a = el("a", cls, label);
    a.href = CONFIG.portfolioUrl;
    return a;
  };

  /* =====================================================
     SCENE 1 · Fake terminal hack
     ===================================================== */
  async function sceneTerminal(ctx) {
    const repo = REPO;
    ctx.root.innerHTML = `
      <section class="window term" aria-label="Fake terminal">
        <div class="titlebar"><i class="dot r"></i><i class="dot y"></i><i class="dot g"></i>
          <span>visitor@mainframe: ~/${repo}</span></div>
        <div class="term-body"></div>
      </section>`;
    const body = $(".term-body", ctx.root);
    let formEl = null;
    const scroll = () => { body.scrollTop = body.scrollHeight; };
    const line = (text = "", cls = "") => {
      const d = el("div", "ln " + cls, text);
      body.insertBefore(d, formEl);
      scroll();
      return d;
    };
    const type = async (text, cls = "", speed = 22) => {
      const d = line("", cls);
      for (const ch of text) { d.textContent += ch; scroll(); await ctx.wait(speed); }
      return d;
    };

    await type(`$ git clone git@github.com:${CONFIG.name.toLowerCase()}/${repo}.git`, "cmd", 26);
    await ctx.wait(400);
    line(`Cloning into '${repo}'...`, "dim");
    await ctx.wait(900);
    line("ERROR: Permission denied (publickey).", "err");
    line("fatal: Could not read from remote repository.", "err");
    await ctx.wait(700);
    line("█ ACCESS DENIED █  アクセス拒否", "banner");
    await ctx.wait(900);
    await type("Launching counter-hack: brute-force.exe ...", "warn", 18);

    const bar = line("", "bar");
    const status = line("", "dim");
    const tries = [
      "trying password: 123456 ... ✗", "trying password: admin ... ✗",
      "trying password: letmein ... ✗", "trying password: ilovenaruto ... ✗",
      "trying password: password123 ... ✗", "asking the server nicely ... ✗",
      "bribing the firewall with ramen ... ✗", "pressing random keys very fast ... ✗"
    ];
    let p = 0;
    while (p < 99) {
      p = Math.min(99, p + rand(3, 9));
      const filled = Math.floor(p / 5);
      bar.textContent = `[${"█".repeat(filled)}${"░".repeat(20 - filled)}] ${p}%`;
      status.textContent = pick(tries);
      await ctx.wait(170);
    }
    await ctx.wait(1100);
    line("ERROR: target's security is stronger than your WiFi password.", "err");
    await ctx.wait(700);
    line("Nice try 😏  This repo is private.", "big");
    line("Type 'help' to poke around, or 'portfolio' to go back.", "dim");

    // interactive prompt
    formEl = el("form", "prompt");
    formEl.innerHTML = `<span class="ps1">visitor@mainframe:~$</span>
      <input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Terminal input">`;
    body.appendChild(formEl);
    const input = $("input", formEl);
    if (window.matchMedia("(hover: hover)").matches) input.focus({ preventScroll: true });
    ctx.on(body, "click", () => input.focus({ preventScroll: true }));

    const eggs = {
      naruto: "Believe it! 🍥 ...but it's still private.",
      hokage: "Only the Hokage can read this repo. You are not the Hokage.",
      goku: "Kamehame— ACCESS DENIED. 💥",
      luffy: "Gomu Gomu no... Permission Denied! 🏴‍☠️",
      sasuke: "Chidori can't break a private repo. 🌩️",
      pikachu: "Pika-pika... 403 ⚡",
      hack: "Hacking in progress... 0.0001% done. See you in 3 years. 🕒",
      matrix: "There is no spoon. There is also no access. 🥄"
    };

    const run = (raw) => {
      const [cmd, ...args] = raw.toLowerCase().split(/\s+/);
      const rest = args.join(" ");
      switch (cmd) {
        case "help":
          line("Available commands:", "ok");
          line("  help        show this list");
          line("  ls          list files");
          line("  cat <file>  read a file (good luck)");
          line("  whoami      who are you?");
          line("  sudo ...    try your luck");
          line("  clear       clean the screen");
          line("  portfolio   leave and go to the portfolio");
          line("  (there are secret commands too 👀)", "dim");
          break;
        case "ls":
          line("src/ 🔒   .env 🔒   secrets.txt   todo.md   waifu.png");
          break;
        case "cat":
          if (rest === "secrets.txt") line("Access denied. Also, the secret is that there is no secret. 🤫", "warn");
          else if (rest === "todo.md") { line("[x] make repo private"); line("[ ] let you in  (never)"); }
          else if (rest === ".env") line("Nice try 😏 even the env file has trust issues.", "err");
          else if (rest === "waifu.png") line("(｡♥‿♥｡) she's private too.", "ok");
          else if (!rest) line("cat: which file? try 'ls'.", "dim");
          else line(`cat: ${rest}: No such file (or it's hiding).`, "err");
          break;
        case "whoami":
          line("A very curious visitor 👀 (logged in the vibes only)", "ok");
          break;
        case "sudo":
          line("visitor is not in the sudoers file. This incident will be reported. 🚨", "err");
          break;
        case "rm":
          line("rm: nice try. I keep backups of my backups. 💾", "warn");
          break;
        case "clear":
          $$(".ln", body).forEach((n) => n.remove());
          break;
        case "date":
          line(new Date().toString(), "dim");
          break;
        case "ping":
          line("pong 🏓 (faster than you at guessing passwords)", "ok");
          break;
        case "portfolio": case "exit": case "home": case "cd":
          line("Teleporting you back... ✨", "ok");
          ctx.later(() => { window.location.href = CONFIG.portfolioUrl; }, 700);
          break;
        default:
          if (eggs[cmd]) line(eggs[cmd], "ok");
          else line(`command not found: ${cmd}. try 'help'`, "err");
      }
    };

    const hist = []; let hi = 0;
    ctx.on(input, "keydown", (e) => {
      if (e.key === "ArrowUp" && hist.length) { hi = Math.max(0, hi - 1); input.value = hist[hi]; e.preventDefault(); }
      if (e.key === "ArrowDown" && hist.length) { hi = Math.min(hist.length, hi + 1); input.value = hist[hi] || ""; e.preventDefault(); }
    });
    ctx.on(formEl, "submit", (e) => {
      e.preventDefault();
      const raw = input.value.trim();
      input.value = "";
      line("visitor@mainframe:~$ " + raw, "cmd");
      if (raw) { hist.push(raw); hi = hist.length; run(raw); }
      scroll();
    });
  }

  /* =====================================================
     SCENE 2 · 403 Forbidden + "IP logged" gag
     ===================================================== */
  async function sceneForbidden(ctx) {
    ctx.root.innerHTML = `
      <section class="window forbidden">
        <div class="laser"></div>
        <p class="kana">禁止区域 · RESTRICTED ZONE</p>
        <h1 class="glitch" data-text="403">403</h1>
        <h2 class="glitch-sm">FORBIDDEN</h2>
        <p class="lead">Whoa there! You just walked into a private repository.</p>
        <div class="logbox" aria-live="polite"></div>
        <p class="verdict"></p>
      </section>`;
    const box = $(".logbox", ctx.root);
    const verdict = $(".verdict", ctx.root);

    const ua = navigator.userAgent;
    const os = (navigator.userAgentData && navigator.userAgentData.platform) ||
      (/Windows/.test(ua) ? "Windows" : /Android/.test(ua) ? "Android" :
       /iPhone|iPad|iPod/.test(ua) ? "iOS" : /Mac/.test(ua) ? "macOS" :
       /Linux/.test(ua) ? "Linux" : "Unknown OS");
    const browser = /Edg\//.test(ua) ? "Edge" : /OPR\//.test(ua) ? "Opera" :
      /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" :
      /Safari\//.test(ua) ? "Safari" : "Mystery Browser";
    let tz = "somewhere on Earth";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || tz; } catch (e) { /* ignore */ }

    const rows = [
      ["alert", "[ALERT] Intruder detected 👁️"],
      ["info", `> OS .......... ${os}`],
      ["info", `> Browser ..... ${browser}`],
      ["info", `> Screen ...... ${screen.width}x${screen.height}`],
      ["info", `> Language .... ${navigator.language}`],
      ["info", `> Timezone .... ${tz}`],
      ["info", `> Local time .. ${new Date().toLocaleTimeString()}`],
      ["alert", "[ALERT] Your IP has been logged. Calling the cyber police... 🚓"]
    ];
    for (const [cls, text] of rows) {
      box.appendChild(el("div", cls, text));
      await ctx.wait(650);
    }
    await ctx.wait(1300);
    verdict.textContent = "...just kidding 😄 nothing was saved. It's only a private repo. The real thing lives in my portfolio!";
    const wrap = el("div"); wrap.style.marginTop = "14px";
    wrap.appendChild(portfolioBtn());
    verdict.after(wrap);
  }

  /* =====================================================
     SCENE 3 · Crack the vault
     ===================================================== */
  function sceneVault(ctx) {
    const SECRET = "1337", MAX = 5;
    ctx.root.innerHTML = `
      <section class="window vault">
        <p class="kana">金庫 · THE VAULT</p>
        <h2 class="title">Crack the code to unlock <span class="mono-pink">${REPO}</span></h2>
        <div class="slots" aria-live="polite"><b></b><b></b><b></b><b></b></div>
        <p class="msg">Enter the 4-digit code.</p>
        <div class="keypad"></div>
        <p class="meta">Attempts left: <b class="left">${MAX}</b> <button class="link hintbtn" type="button" hidden>need a hint?</button></p>
        <div class="result" hidden></div>
      </section>`;
    const root = $(".vault", ctx.root);
    const slots = $$(".slots b", root);
    const msg = $(".msg", root);
    const leftEl = $(".left", root);
    const hintBtn = $(".hintbtn", root);
    const result = $(".result", root);
    const pad = $(".keypad", root);

    let code = "", left = MAX, locked = false, tries = 0;
    const wrongs = [
      "Nope. Wrong code, but nice confidence. 😌",
      "Cold. Like Antarctica cold. 🧊",
      "My grandma guesses better. And she's a bot.",
      "Are you just mashing the keypad? 🎹",
      "Last chance. The guards are stretching... 🥋"
    ];

    function render() {
      slots.forEach((s, i) => {
        s.textContent = code[i] || "";
        s.classList.toggle("on", i === code.length && !locked);
      });
    }
    function press(d) {
      if (locked || code.length >= 4) return;
      code += d; render();
      if (code.length === 4) ctx.later(check, 250);
    }
    function back() { if (!locked) { code = code.slice(0, -1); render(); } }
    function clear() { if (!locked) { code = ""; render(); } }

    function check() {
      if (code === SECRET) return win();
      tries++; left--;
      leftEl.textContent = left;
      root.classList.add("shake");
      ctx.later(() => root.classList.remove("shake"), 450);
      if (["1234", "0000", "1111", "4321"].includes(code)) msg.textContent = "Seriously? That's what EVERYONE tries first. 🙄";
      else msg.textContent = wrongs[Math.min(tries - 1, wrongs.length - 1)];
      if (tries >= 3) hintBtn.hidden = false;
      code = ""; render();
      if (left <= 0) alarm();
    }

    function win() {
      locked = true; render();
      msg.textContent = "🔓 VAULT OPEN";
      result.hidden = false; result.className = "result";
      result.innerHTML = "🎉 OK fine, you cracked it! Honestly impressed.<br>The repo is still private, but get in touch and we can talk. My contact is in the portfolio footer:<br>";
      result.appendChild(portfolioBtn("Take me to the contact →", "btn small alt"));
    }

    function alarm() {
      locked = true;
      document.body.classList.add("alarm");
      root.classList.add("alarm");
      msg.textContent = "🚨 SECURITY ALERTED 🚨 Guards are on the way!";
      result.hidden = false; result.className = "result bad";
      result.textContent = "Vault locked down. Cooling off for a moment...";
      ctx.later(() => {
        result.textContent = "Calm down, agent. ";
        const retry = el("button", "btn small", "Reset vault");
        retry.type = "button";
        retry.addEventListener("click", () => {
          document.body.classList.remove("alarm");
          root.classList.remove("alarm");
          left = MAX; tries = 0; code = ""; locked = false;
          leftEl.textContent = left;
          msg.textContent = "Vault reset. Try again.";
          result.hidden = true;
          render();
        });
        result.appendChild(retry);
        result.appendChild(document.createTextNode(" "));
        result.appendChild(portfolioBtn("Or go back to the portfolio", "btn small alt"));
      }, 3500);
    }

    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].forEach((k) => {
      const b = el("button", "", k);
      b.type = "button";
      b.setAttribute("aria-label", k === "C" ? "Clear" : k === "⌫" ? "Backspace" : k);
      b.addEventListener("click", () => (k === "C" ? clear() : k === "⌫" ? back() : press(k)));
      pad.appendChild(b);
    });
    hintBtn.addEventListener("click", () => {
      msg.textContent = "Hint: hackers call themselves 'l33t'. Read that as numbers. 😉";
    });
    ctx.on(document, "keydown", (e) => {
      if (/^\d$/.test(e.key)) press(e.key);
      else if (e.key === "Backspace") back();
    });
    ctx.onCleanup(() => document.body.classList.remove("alarm"));
    render();
  }

  /* =====================================================
     SCENE 4 · Catch the repo
     ===================================================== */
  function sceneCatch(ctx) {
    ctx.root.innerHTML = `
      <section class="window catch">
        <p class="kana">捕獲ミッション · CATCH MISSION</p>
        <h2 class="title">Catch <span class="mono-pink">${REPO}</span> to get in</h2>
        <div class="arena">
          <div class="runner">
            <div class="bubble">Catch me!</div>
            <div class="folder">📁</div>
            <span class="lock">🔒</span>
            <span class="fname">${REPO}</span>
          </div>
        </div>
        <p class="meta">Dodges: <b class="count">0</b></p>
        <p class="final" hidden></p>
      </section>`;
    const arena = $(".arena", ctx.root);
    const runner = $(".runner", ctx.root);
    const bubble = $(".bubble", ctx.root);
    const countEl = $(".count", ctx.root);
    const finalEl = $(".final", ctx.root);
    const RW = 120, RH = 120;
    const taunts = ["Too slow!", "Nani?!", "Missed me!", "Hehe~", "Over here!", "Is that all? 😏", "Zoom zoom!", "Try harder!", "Sugoi dodge!"];
    let count = 0, last = 0, done = false;

    const place = (x, y) => { runner.style.left = x + "px"; runner.style.top = y + "px"; };
    const bounds = () => {
      const r = arena.getBoundingClientRect();
      return { w: r.width, h: r.height, left: r.left, top: r.top };
    };
    const center = () => { const b = bounds(); place((b.w - RW) / 2, (b.h - RH) / 2); };

    function dodge(px, py) {
      const now = Date.now();
      if (now - last < 220) return;
      last = now;
      const b = bounds();
      let best = null, bestD = -1;
      for (let i = 0; i < 24; i++) {
        const x = rand(0, Math.max(0, Math.floor(b.w - RW)));
        const y = rand(0, Math.max(0, Math.floor(b.h - RH)));
        const d = Math.hypot(x + RW / 2 - px, y + RH / 2 - py);
        if (d > bestD) { bestD = d; best = [x, y]; }
      }
      place(best[0], best[1]);
      count++;
      countEl.textContent = count;
      bubble.textContent = pick(taunts);
      if (count >= 10 && !done) {
        done = true;
        finalEl.hidden = false;
        finalEl.textContent = "Even I can't catch it. It's private. 🔒";
        finalEl.after(Object.assign(el("div"), { style: "margin-top:14px" }));
        finalEl.nextElementSibling.appendChild(portfolioBtn());
      }
    }

    function near(e) {
      const b = bounds();
      const px = e.clientX - b.left, py = e.clientY - b.top;
      const rx = parseFloat(runner.style.left) + RW / 2;
      const ry = parseFloat(runner.style.top) + RH / 2;
      if (Math.hypot(px - rx, py - ry) < 130) dodge(px, py);
    }
    ctx.on(arena, "pointermove", (e) => { if (e.pointerType === "mouse") near(e); });
    ctx.on(arena, "pointerdown", near);
    ctx.on(runner, "click", () => {
      bubble.textContent = "You caught me?! ...it's private lol 🔒";
    });
    ctx.on(window, "resize", center);
    center();
  }

  /* =====================================================
     SCENE 5 · Guard Bot chat
     ===================================================== */
  async function sceneGuard(ctx) {
    ctx.root.innerHTML = `
      <section class="window chat">
        <div class="chat-head">
          <div class="avatar">🛡️</div>
          <div><b>Guard Bot</b><small>● online · Security level: OVER 9000</small></div>
        </div>
        <div class="msgs" aria-live="polite"></div>
        <div class="chips"></div>
        <form class="chat-form">
          <input type="text" maxlength="140" placeholder="Ask nicely..." autocomplete="off" aria-label="Message to Guard Bot">
          <button class="btn small" type="submit">Send</button>
        </form>
      </section>`;
    const msgs = $(".msgs", ctx.root);
    const chips = $(".chips", ctx.root);
    const form = $(".chat-form", ctx.root);
    const input = $("input", form);

    const say = (who, content) => {
      const d = el("div", "bub " + who);
      if (typeof content === "string") d.textContent = content; else d.appendChild(content);
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
      return d;
    };
    const botSay = async (content) => {
      const t = say("bot", el("span", "typing", "● ● ●"));
      await ctx.wait(rand(550, 950));
      t.remove();
      say("bot", content);
    };

    const ladder = [
      "Request denied.",
      "Have you tried asking nicely?",
      "That was nice. Still no.",
      "Bribery detected. I only accept cookies 🍪... still no.",
      "I'm paid in exposure and I still say no.",
      "Okay okay... you're persistent. I respect that."
    ];
    const pool = [
      "Still no. But I admire the effort. 💪",
      "My answer is the same. It has been the same since 1970.",
      "Error 403: Mercy not found.",
      "You could just check the portfolio, you know? 👀",
      "I'm legally required to say no. (Not really, I just like it.)"
    ];
    const rules = [
      { re: /recruit|hire|hiring|job|interview/i, say: "A recruiter?! 👔 Then you absolutely need the portfolio. Ibrahim is very hireable.", cta: true },
    tent = "...just kidding 😈 nothing was saved. It's only a private repo. The real thing lives in my portfolio!";
    const wrap = el("div"); wrap.style.marginTop = "14px";
    wrap.appendChild(portfolioBtn());
    verdict.after(wrap);
  }

  /* =====================================================
     SCENE 3 · Crack the vault
     ===================================================== */
  function sceneVault(ctx) {
    const SECRET = "1337", MAX = 5;
    ctx.root.innerHTML = `
      <section class="window vault">
        <p class="kana">☠ THE VAULT · LAST WARNING</p>
        <h2 class="title">Crack the code to unlock <span class="mono-pink">${REPO}</span></h2>
        <div class="slots" aria-live="polite"><b></b><b></b><b></b><b></b></div>
        <p class="msg">Enter the 4-digit code.</p>
        <div class="keypad"></div>
        <p class="meta">Attempts left: <b class="left">${MAX}</b> <button class="link hintbtn" type="button" hidden>need a hint?</button></p>
        <div class="result" hidden></div>
      </section>`;
    const root = $(".vault", ctx.root);
    const slots = $$(".slots b", root);
    const msg = $(".msg", root);
    const leftEl = $(".left", root);
    const hintBtn = $(".hintbtn", root);
    const result = $(".result", root);
    const pad = $(".keypad", root);

    let code = "", left = MAX, locked = false, tries = 0;
    const wrongs = [
      "Nope. Wrong code, but nice confidence. 😌",
      "Cold. Like Antarctica cold. 🧊",
      "My grandma guesses better. And she's a bot.",
      "Are you just mashing the keypad? 🎹",
      "Last chance. The guards are stretching... 🥋"
    ];

    function render() {
      slots.forEach((s, i) => {
        s.textContent = code[i] || "";
        s.classList.toggle("on", i === code.length && !locked);
      });
    }
    function press(d) {
      if (locked || code.length >= 4) return;
      code += d; render();
      if (code.length === 4) ctx.later(check, 250);
    }
    function back() { if (!locked) { code = code.slice(0, -1); render(); } }
    function clear() { if (!locked) { code = ""; render(); } }

    function check() {
      if (code === SECRET) return win();
      tries++; left--;
      leftEl.textContent = left;
      root.classList.add("shake");
      ctx.later(() => root.classList.remove("shake"), 450);
      if (["1234", "0000", "1111", "4321"].includes(code)) msg.textContent = "Seriously? That's what EVERYONE tries first. 🙄";
      else msg.textContent = wrongs[Math.min(tries - 1, wrongs.length - 1)];
      if (tries >= 3) hintBtn.hidden = false;
      code = ""; render();
      if (left <= 0) alarm();
    }

    function win() {
      locked = true; render();
      msg.textContent = "🔓 VAULT OPEN";
      result.hidden = false; result.className = "result";
      result.innerHTML = "🎉 OK fine, you cracked it! Honestly impressed.<br>The repo is still private, but get in touch and we can talk. My contact is in the portfolio footer:<br>";
      result.appendChild(portfolioBtn("Take me to the contact →", "btn small alt"));
    }

    function alarm() {
      locked = true;
      document.body.classList.add("alarm");
      root.classList.add("alarm");
      msg.textContent = "🚨 SECURITY ALERTED 🚨 Guards are on the way!";
      result.hidden = false; result.className = "result bad";
      result.textContent = "Vault locked down. Cooling off for a moment...";
      ctx.later(() => {
        result.textContent = "Calm down, agent. ";
        const retry = el("button", "btn small", "Reset vault");
        retry.type = "button";
        retry.addEventListener("click", () => {
          document.body.classList.remove("alarm");
          root.classList.remove("alarm");
          left = MAX; tries = 0; code = ""; locked = false;
          leftEl.textContent = left;
          msg.textContent = "Vault reset. Try again.";
          result.hidden = true;
          render();
        });
        result.appendChild(retry);
        result.appendChild(document.createTextNode(" "));
        result.appendChild(portfolioBtn("Or go back to the portfolio", "btn small alt"));
      }, 3500);
    }

    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].forEach((k) => {
      const b = el("button", "", k);
      b.type = "button";
      b.setAttribute("aria-label", k === "C" ? "Clear" : k === "⌫" ? "Backspace" : k);
      b.addEventListener("click", () => (k === "C" ? clear() : k === "⌫" ? back() : press(k)));
      pad.appendChild(b);
    });
    hintBtn.addEventListener("click", () => {
      msg.textContent = "Hint: hackers call themselves 'l33t'. Read that as numbers. 😉";
    });
    ctx.on(document, "keydown", (e) => {
      if (/^\d$/.test(e.key)) press(e.key);
      else if (e.key === "Backspace") back();
    });
    ctx.onCleanup(() => document.body.classList.remove("alarm"));
    render();
  }

  /* =====================================================
     SCENE 4 · Catch the repo
     ===================================================== */
  function sceneCatch(ctx) {
    ctx.root.innerHTML = `
      <section class="window catch">
        <p class="kana">⚠ CONTAINMENT BREACH · CATCH IT</p>
        <h2 class="title">Catch <span class="mono-pink">${REPO}</span> to get in</h2>
        <div class="arena">
          <div class="runner">
            <div class="bubble">Catch me!</div>
            <div class="folder">📁</div>
            <span class="lock">🔒</span>
            <span class="fname">${REPO}</span>
          </div>
        </div>
        <p class="meta">Dodges: <b class="count">0</b></p>
        <p class="final" hidden></p>
      </section>`;
    const arena = $(".arena", ctx.root);
    const runner = $(".runner", ctx.root);
    const bubble = $(".bubble", ctx.root);
    const countEl = $(".count", ctx.root);
    const finalEl = $(".final", ctx.root);
    const RW = 120, RH = 120;
    const taunts = ["Too slow...", "Behind you.", "I see you.", "Nope.", "Over here...", "Cute try. 😈", "Can't touch this.", "Try harder.", "Hehehe..."];
    let count = 0, last = 0, done = false;

    const place = (x, y) => { runner.style.left = x + "px"; runner.style.top = y + "px"; };
    const bounds = () => {
      const r = arena.getBoundingClientRect();
      return { w: r.width, h: r.height, left: r.left, top: r.top };
    };
    const center = () => { const b = bounds(); place((b.w - RW) / 2, (b.h - RH) / 2); };

    function dodge(px, py) {
      const now = Date.now();
      if (now - last < 220) return;
      last = now;
      const b = bounds();
      let best = null, bestD = -1;
      for (let i = 0; i < 24; i++) {
        const x = rand(0, Math.max(0, Math.floor(b.w - RW)));
        const y = rand(0, Math.max(0, Math.floor(b.h - RH)));
        const d = Math.hypot(x + RW / 2 - px, y + RH / 2 - py);
        if (d > bestD) { bestD = d; best = [x, y]; }
      }
      place(best[0], best[1]);
      count++;
      countEl.textContent = count;
      bubble.textContent = pick(taunts);
      if (count >= 10 && !done) {
        done = true;
        finalEl.hidden = false;
        finalEl.textContent = "Even I can't catch it. It's private. 🔒";
        finalEl.after(Object.assign(el("div"), { style: "margin-top:14px" }));
        finalEl.nextElementSibling.appendChild(portfolioBtn());
      }
    }

    function near(e) {
      const b = bounds();
      const px = e.clientX - b.left, py = e.clientY - b.top;
      const rx = parseFloat(runner.style.left) + RW / 2;
      const ry = parseFloat(runner.style.top) + RH / 2;
      if (Math.hypot(px - rx, py - ry) < 130) dodge(px, py);
    }
    ctx.on(arena, "pointermove", (e) => { if (e.pointerType === "mouse") near(e); });
    ctx.on(arena, "pointerdown", near);
    ctx.on(runner, "click", () => {
      bubble.textContent = "You caught me?! ...it's private lol 🔒";
    });
    ctx.on(window, "resize", center);
    center();
  }

  /* =====================================================
     SCENE 5 · Guard Bot chat
     ===================================================== */
  async function sceneGuard(ctx) {
    ctx.root.innerHTML = `
      <section class="window chat">
        <div class="chat-head">
          <div class="avatar">💀</div>
          <div><b>Guard Bot</b><small>● online · Security level: OVER 9000</small></div>
        </div>
        <div class="msgs" aria-live="polite"></div>
        <div class="chips"></div>
        <form class="chat-form">
          <input type="text" maxlength="140" placeholder="Ask nicely..." autocomplete="off" aria-label="Message to Guard Bot">
          <button class="btn small" type="submit">Send</button>
        </form>
      </section>`;
    const msgs = $(".msgs", ctx.root);
    const chips = $(".chips", ctx.root);
    const form = $(".chat-form", ctx.root);
    const input = $("input", form);

    const say = (who, content) => {
      const d = el("div", "bub " + who);
      if (typeof content === "string") d.textContent = content; else d.appendChild(content);
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
      return d;
    };
    const botSay = async (content) => {
      const t = say("bot", el("span", "typing", "● ● ●"));
      await ctx.wait(rand(550, 950));
      t.remove();
      say("bot", content);
    };

    const ladder = [
      "Request denied.",
      "Have you tried asking nicely?",
      "That was nice. Still no.",
      "Bribery detected. I only accept cookies 🍪... still no.",
      "I'm paid in exposure and I still say no.",
      "Okay okay... you're persistent. I respect that."
    ];
    const pool = [
      "Still no. But I admire the effort. 💪",
      "My answer is the same. It has been the same since 1970.",
      "Error 403: Mercy not found.",
      "You could just check the portfolio, you know? 👀",
      "I'm legally required to say no. (Not really, I just like it.)"
    ];
    const rules = [
      { re: /recruit|hire|hiring|job|interview/i, say: "A recruiter?! 👔 Then you absolutely need the portfolio. Ibrahim is very hireable.", cta: true },
      { re: /owner|i am ibrahim|my repo|i made|i own/i, say: "Sure, and I'm the Hokage. Show me a signed commit. ✍️" },
      { re: /sudo|hack|exploit|bypass/i, say: "I know karate. And firewalls. And 3 kinds of antivirus. 🥋" },
      { re: /naruto|goku|luffy|anime|one piece|sasuke|gojo/i, say: "Oh, a person of culture! 🍥 ...access is still denied though." },
      { re: /^(hi|hello|hey|yo|sup)\b/i, say: "Hello, intruder. 👋 State your business." },
      { re: /\bwhy\b/i, say: "Because it's private. That's why. End of story. 📕" },
      { re: /please|pls|plz/i, say: "Manners noted. +1 respect. Access: still no. 🎩" },
      { re: /source|code|repo|access|let me/i, say: "The code is private. It's in the name. It's literally in the name. 🔒" }
    ];

    let n = 0, nudged = false, chain = Promise.resolve();
    const nudge = async () => {
      nudged = true;
      const wrap = el("div");
      wrap.appendChild(document.createTextNode("Here, take this instead — the good stuff is public:"));
      wrap.appendChild(el("br"));
      wrap.appendChild(portfolioBtn());
      await botSay(wrap);
    };
    const respond = async (text) => {
      n++;
      const rule = rules.find((r) => r.re.test(text));
      const reply = rule ? rule.say : (n <= ladder.length ? ladder[n - 1] : pick(pool));
      await botSay(reply);
      if (!nudged && ((rule && rule.cta) || n >= ladder.length)) await nudge();
    };
    const send = (text) => {
      text = text.trim();
      if (!text) return;
      say("me", text);
      chain = chain.then(() => respond(text));
    };

    ["Let me in 🙏", "I'm a recruiter", "I'm the owner", "sudo open repo", "Pretty please 🥺"].forEach((t) => {
      const c = el("button", "chip", t);
      c.type = "button";
      c.addEventListener("click", () => send(t));
      chips.appendChild(c);
    });
    ctx.on(form, "submit", (e) => { e.preventDefault(); send(input.value); input.value = ""; });

    await botSay("Halt! 🛑 I am Guard Bot, protector of this private repo.");
    await botSay("State your business, human.");
  }

  /* =====================================================
     Scene manager
     ===================================================== */
  const SCENES = [
    { name: "Terminal", run: sceneTerminal },
    { name: "403 Forbidden", run: sceneForbidden },
    { name: "The Vault", run: sceneVault },
    { name: "Catch the Repo", run: sceneCatch },
    { name: "Guard Bot", run: sceneGuard }
  ];

  let teardown = null;
  let currentIndex = -1;

  function loadScene(i) {
    if (teardown) teardown();
    currentIndex = i;
    const root = $("#stage");
    root.innerHTML = "";
    const cleanups = [];
    let alive = true;
    const ctx = {
      root,
      on(target, ev, fn, opts) { target.addEventListener(ev, fn, opts); cleanups.push(() => target.removeEventListener(ev, fn, opts)); },
      wait(ms) { return new Promise((res) => { const t = setTimeout(res, ms); cleanups.push(() => clearTimeout(t)); }); },
      later(fn, ms) { const t = setTimeout(fn, ms); cleanups.push(() => clearTimeout(t)); },
      onCleanup(fn) { cleanups.push(fn); }
    };
    teardown = () => { alive = false; cleanups.forEach((fn) => fn()); root.innerHTML = ""; };

    $("#sceneTag").textContent = `Scene ${i + 1}/${SCENES.length} · ${SCENES[i].name}`;
    try { localStorage.setItem("lastScene", String(i)); } catch (e) { /* ignore */ }
    Promise.resolve(SCENES[i].run(ctx)).catch((err) => { if (alive) console.error(err); });
  }

  function randomOther(avoid) {
    let i;
    do { i = rand(0, SCENES.length - 1); } while (i === avoid && SCENES.length > 1);
    return i;
  }

  function firstScene() {
    const q = parseInt(new URLSearchParams(location.search).get("scene"), 10);
    if (q >= 1 && q <= SCENES.length) return q - 1;
    let last = -1;
    try { last = parseInt(localStorage.getItem("lastScene"), 10); } catch (e) { /* ignore */ }
    return randomOther(Number.isNaN(last) ? -1 : last);
  }

  /* ---------- digital rain + creepy whispers ---------- */
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function rain() {
    if (reducedMotion) return;
    const box = $("#rain");
    const chars = "01{}<>/;#$%&*+=?!".split("");
    for (let i = 0; i < 30; i++) {
      const text = Array.from({ length: rand(5, 12) }, () => pick(chars)).join("\n");
      const b = el("span", "bit", text);
      b.style.left = rand(0, 100) + "%";
      b.style.setProperty("--s", rand(11, 18) + "px");
      b.style.setProperty("--d", rand(8, 18) + "s");
      b.style.setProperty("--delay", "-" + rand(0, 18) + "s");
      b.style.setProperty("--o", (rand(10, 34) / 100).toFixed(2));
      box.appendChild(b);
    }
  }

  function whispers() {
    if (reducedMotion) return;
    const w = $("#whisper");
    const lines = ["I SEE YOU", "TURN BACK", "YOU SHOULDN'T BE HERE", "WE ARE WATCHING", "LEAVE", "ACCESS FORBIDDEN"];
    const fire = () => {
      w.textContent = pick(lines);
      w.classList.remove("on");
      void w.offsetWidth; // restart animation
      w.classList.add("on");
      setTimeout(fire, rand(14000, 28000));
    };
    setTimeout(fire, rand(9000, 16000));
  }

  /* ---------- boot ---------- */
  document.title = `Private Repo · ${CONFIG.name}`;
  $$("[data-portfolio]").forEach((a) => { a.href = CONFIG.portfolioUrl; });
  $$("[data-name]").forEach((n) => { n.textContent = CONFIG.name; });
  $("#shuffle").addEventListener("click", () => loadScene(randomOther(currentIndex)));
  rain();
  whispers();
  loadScene(firstScene());
})();
