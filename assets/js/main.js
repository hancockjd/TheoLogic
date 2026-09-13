/* ============================================================
   THEO LOGIC — site behavior
   Concept: "The Frame and the Light"

   Loaded with `defer`, so the DOM is parsed before this runs. No dependencies,
   no build step. Every block guards for a missing element so a section can be
   removed from the HTML without throwing.

   Contents
     1. Marquee track
     2. Scroll progress + sticky nav
     3. Mobile menu
     4. Reveal on scroll
     5. Dashboard bars
     6. Vault step panel (tabs)
     7. Inquiry form
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. marquee: build a seamless doubled track ---------- */
  var track = document.getElementById("track");
  if (track) {
    var words = ["Inform", "Engage", "Inspire", "You Too"];
    var unit = "";
    words.forEach(function (w) {
      unit += '<span class="marquee-item">' + w + "<i></i></span>";
    });
    unit += '<span class="marquee-item tag">#IEIU2<i></i></span>';
    // Four copies so the -50% keyframe loops without a visible seam.
    track.innerHTML = unit + unit + unit + unit;
  }

  /* ---------- 2. scroll progress + sticky nav ---------- */
  var prog = document.getElementById("prog");
  var nav = document.getElementById("nav");
  if (prog || nav) {
    var ticking = false;
    function paintScroll() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (prog) prog.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
      if (nav) nav.classList.toggle("stuck", window.scrollY > 40);
      ticking = false;
    }
    // rAF-throttled: the handler fires once per frame at most, not per event.
    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(paintScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    paintScroll();
  }

  /* ---------- 3. mobile menu ---------- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mm");
  if (burger && menu) {
    function setMenu(open) {
      document.body.classList.toggle("menu", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      // Keep the closed menu out of the tab order for keyboard and AT users.
      menu.inert = !open;
    }
    setMenu(false);

    burger.addEventListener("click", function () {
      setMenu(!document.body.classList.contains("menu"));
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    // Escape closes the menu and returns focus to the trigger.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu")) {
        setMenu(false);
        burger.focus();
      }
    });
  }

  /* ---------- 4. reveal on scroll ---------- */
  var revealables = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reduceMotion) {
    // No observer support, or the visitor asked for less motion: show everything.
    revealables.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 5. dashboard bars animate once ---------- */
  var dash = document.getElementById("dash");
  if (dash) {
    function fillBars() {
      dash.querySelectorAll(".fill").forEach(function (f, i) {
        var pct = f.dataset.w + "%";
        if (reduceMotion) {
          f.style.width = pct;
        } else {
          setTimeout(function () { f.style.width = pct; }, 180 * i);
        }
      });
    }
    if (!("IntersectionObserver" in window) || reduceMotion) {
      fillBars();
    } else {
      var dashIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            fillBars();
            dashIO.unobserve(en.target);
          }
        });
      }, { threshold: 0.35 });
      dashIO.observe(dash);
    }
  }

  /* ---------- 6. The Vault: step panel ----------
     Content for the five submission steps. `term` rows are [label, value, class]
     where class is "" | "k" (cyan) | "g" (gold) | "ok" (green).
     ------------------------------------------------------------------ */
  var STEPS = [
    { t: "Encrypted submission",
      b: "Scripts, treatments, tracks, and decks upload over an encrypted channel into isolated storage. Nothing lands in a shared inbox, and nothing is readable by staff until the agreement in step two is executed on both sides.",
      l: ["TLS in transit, encrypted at rest", "Isolated per-submission storage", "File type and size validation on upload"],
      term: [["POST", "/vault/submit", "g"], ["file", "treatment_v3.pdf &middot; 2.4 MB", ""], ["encrypt", "AES-256 &middot; at rest", "k"], ["status", "QUARANTINED &mdash; unread", "ok"]] },
    { t: "Mutual NDA, signed first",
      b: "Before any Theo Logic reader opens the file, both parties execute a mutual non-disclosure and submission release. The envelope is generated automatically from the submission record and routed through the company's e-signature platform.",
      l: ["Auto-generated from submission metadata", "Countersigned by an authorized officer", "Executed copy delivered to both parties"],
      term: [["envelope", "created &middot; NDA-2026-0417", "k"], ["route", "e-signature platform", ""], ["signer", "submitter &mdash; signed", "ok"], ["signer", "Theo Logic &mdash; countersigned", "ok"], ["status", "EXECUTED", "ok"]] },
    { t: "Sealed and timestamped",
      b: "The submission is hashed and written to an append-only record: what was sent, by whom, on what date, and which agreement governs it. That record is what protects both sides if a similar project ever surfaces.",
      l: ["Content hash of every submitted file", "Append-only, tamper-evident audit log", "Chain of custody exportable on request"],
      term: [["hash", "sha256:9f2c&hellip;a10e", "k"], ["sealed", "2026-04-17 09:12:04 EDT", ""], ["governed_by", "NDA-2026-0417", "g"], ["log", "append-only &middot; immutable", "ok"]] },
    { t: "Read by named people only",
      b: "Access is granted per submission, to specific readers, for a specific window. Every open, download, and comment is attributed. Nothing is forwarded outside the record.",
      l: ["Role-based, per-submission access grants", "Time-boxed reader windows", "Every view attributed in the log"],
      term: [["grant", "reader:dev_lead &middot; 14d", "k"], ["open", "2026-04-19 11:03 &middot; logged", ""], ["download", "blocked &mdash; policy", "g"], ["access", "3 named readers", "ok"]] },
    { t: "A documented answer",
      b: "Pass, hold, or option — every submission gets a written decision tied to its record, and material that is passed on is purged on a published schedule.",
      l: ["Written decision attached to the record", "Option and deal terms routed to e-signature", "Scheduled purge of passed material"],
      term: [["decision", "OPTION &mdash; terms attached", "g"], ["envelope", "option agreement sent", "k"], ["notify", "submitter &middot; delivered", "ok"], ["retention", "purge scheduled T+90d", ""]] }
  ];

  var pTitle = document.getElementById("pTitle");
  var pBody = document.getElementById("pBody");
  var pList = document.getElementById("pList");
  var term = document.getElementById("term");
  var panel = document.getElementById("vault-panel");
  var tabs = Array.prototype.slice.call(document.querySelectorAll("#flow .step"));

  if (pTitle && pBody && pList && tabs.length) {
    function paintTerm(rows) {
      if (!term) return;
      term.innerHTML = rows.map(function (r) {
        var cls = r[2] ? ' class="' + r[2] + '"' : "";
        return '<div class="row"><span class="k">' + r[0] + "</span><span" + cls + ">" + r[1] + "</span></div>";
      }).join("") + '<div class="row"><span class="k">&rsaquo;</span><span>_</span></div>';
    }

    function setStep(i, moveFocus) {
      var s = STEPS[i];
      if (!s) return;
      pTitle.textContent = s.t;
      pBody.textContent = s.b;
      pList.innerHTML = s.l.map(function (x) { return "<li>" + x + "</li>"; }).join("");
      paintTerm(s.term);

      tabs.forEach(function (b, j) {
        var on = j === i;
        b.classList.toggle("on", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
        // Roving tabindex: only the active tab is reachable by Tab.
        b.tabIndex = on ? 0 : -1;
      });
      if (panel) panel.setAttribute("aria-labelledby", tabs[i].id);
      if (moveFocus) tabs[i].focus();
    }

    tabs.forEach(function (b) {
      b.addEventListener("click", function () { setStep(+b.dataset.i, false); });
    });

    // Arrow / Home / End keys, per the ARIA tabs pattern.
    document.getElementById("flow").addEventListener("keydown", function (e) {
      var cur = tabs.indexOf(document.activeElement);
      if (cur < 0) return;
      var next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (cur + 1) % tabs.length;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (cur - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = tabs.length - 1;
      if (next !== null) {
        e.preventDefault();
        setStep(next, true);
      }
    });

    setStep(0, false);
  }

  /* ---------- 7. inquiry form ----------
     The form has no backend. Rather than faking a success message, validate,
     then say plainly that nothing was sent. Remove the data-demo attribute (and
     add action/method) to hand submission back to the browser.
     ------------------------------------------------------------------ */
  var form = document.getElementById("inquiry");
  var status = document.getElementById("form-status");
  if (form && form.hasAttribute("data-demo")) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) status.textContent = "Please complete the required fields.";
        return;
      }
      if (status) {
        status.textContent = "Demo only — not sent. Email hello@theologic.com to reach the company.";
      }
    });
  }
})();
