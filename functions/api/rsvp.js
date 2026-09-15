function clean(value, max = 120) {
  return String(value ?? "").replace(/[\r\n\t<>]/g, " ").trim().slice(0, max);
}

function json(body, status = 200) {
  return Response.json(body, { status });
}

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const name = clean(data.name, 80);
    const attendance = data.attendance === "yes" ? "yes" : "no";
    if (!name) return json({ ok: false, error: "name-required" }, 400);
    if (!env.RSVP_DB) return json({ ok: false, error: "database-not-configured" }, 503);

    await env.RSVP_DB
      .prepare("INSERT INTO rsvps (name, attendance, created_at) VALUES (?, ?, datetime('now'))")
      .bind(name, attendance)
      .run();

    return json({ ok: true });
  } catch (error) {
    console.error("RSVP save failed:", error);
    return json({ ok: false, error: "invalid-request" }, 400);
  }
}

export async function onRequestGet({ request, env }) {
  if (!env.RSVP_DB || !env.ADMIN_KEY || request.headers.get("x-admin-key") !== env.ADMIN_KEY) {
    return json({ ok: false }, 401);
  }

  try {
    const result = await env.RSVP_DB
      .prepare("SELECT id, name, attendance, created_at FROM rsvps ORDER BY id DESC")
      .all();
    return json({ ok: true, rsvps: result.results });
  } catch (error) {
    console.error("RSVP list failed:", error);
    return json({ ok: false }, 500);
  }
}