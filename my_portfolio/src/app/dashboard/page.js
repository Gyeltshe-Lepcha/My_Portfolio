import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { logoutAction } from "@/actions/authActions";
import { createShareLinkAction, toggleShareLinkAction, updateContactAction, updateHeroAction, updateProfileAction, updateSectionJsonAction } from "@/actions/dashboardActions";
import { getPortfolioByOwnerId } from "@/services/portfolioService";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");

  const portfolio = await getPortfolioByOwnerId(session.user.id);
  const shareLinks = process.env.DATABASE_URL
    ? await prisma.shareLink.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
      })
    : [];
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return (
    <main className="cinematic-shell min-h-screen px-4 py-8 md:px-8">
      <div className="cinematic-ambient" aria-hidden="true">
        <div className="cinematic-ambient__color cinematic-ambient__color--dawn" />
        <div className="cinematic-ambient__glow cinematic-ambient__glow--one" />
        <div className="cinematic-ambient__glow cinematic-ambient__glow--two" />
        <div className="cinematic-ambient__fog cinematic-ambient__fog--one" />
        <div className="cinematic-ambient__grain" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-white/50 bg-white/55 p-5 shadow-[0_24px_90px_rgba(91,33,182,0.12)] backdrop-blur-xl lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.28em] text-purple-600">Admin</p>
            <h1 className="mt-2 text-2xl font-extrabold text-gray-950">Cinematic CMS</h1>
          </div>
          <nav className="grid gap-2 text-sm font-semibold text-gray-700">
            {["Profile", "Hero", "Sections", "Contact", "Share Links"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="rounded-xl px-4 py-3 hover:bg-white/55">
                {item}
              </a>
            ))}
          </nav>
          <div className="mt-8 grid gap-3">
            <Link href="/" className="rounded-xl border border-white/60 px-4 py-3 text-center font-semibold text-gray-800">
              View portfolio
            </Link>
            <form action={logoutAction}>
              <button className="w-full rounded-xl bg-gray-950 px-4 py-3 font-semibold text-white">Logout</button>
            </form>
          </div>
        </aside>

        <section className="space-y-6">
          <DashboardCard id="profile" title="Profile & URLs" subtitle="Controls public identity and human-readable routes.">
            <form action={updateProfileAction} className="grid gap-4 md:grid-cols-2">
              <Field name="displayName" label="Display name" defaultValue={portfolio.profile.displayName} />
              <Field name="username" label="Username URL" defaultValue={portfolio.owner.username || "lepcha"} />
              <Field name="slug" label="Portfolio slug" defaultValue={portfolio.owner.slug || "lepcha"} />
              <Field name="location" label="Location" defaultValue={portfolio.profile.location} />
              <Field name="headline" label="Headline" defaultValue={portfolio.profile.headline} className="md:col-span-2" />
              <Textarea name="bio" label="Bio" defaultValue={portfolio.profile.bio} className="md:col-span-2" />
              <Field name="avatarUrl" label="Avatar URL" defaultValue={portfolio.profile.avatarUrl} className="md:col-span-2" />
              <SubmitButton>Save profile</SubmitButton>
            </form>
          </DashboardCard>

          <DashboardCard id="hero" title="Hero Section" subtitle="Edit the cinematic first viewport without changing layout.">
            <form action={updateHeroAction} className="grid gap-4 md:grid-cols-2">
              <Field name="eyebrow" label="Eyebrow" defaultValue={portfolio.hero.eyebrow} />
              <Field name="title" label="Title prefix" defaultValue={portfolio.hero.title} />
              <Field name="highlighted" label="Highlighted name" defaultValue={portfolio.hero.highlighted} />
              <Field name="imageUrl" label="Hero image URL" defaultValue={portfolio.hero.imageUrl} />
              <Textarea name="subtitle" label="Subtitle" defaultValue={portfolio.hero.subtitle} className="md:col-span-2" />
              <Field name="primaryCta" label="Primary CTA" defaultValue={portfolio.hero.primaryCta} />
              <Field name="secondaryCta" label="Secondary CTA" defaultValue={portfolio.hero.secondaryCta} />
              <Field name="badgeLabel" label="Badge label" defaultValue={portfolio.hero.badgeLabel} />
              <Field name="badgeTitle" label="Badge title" defaultValue={portfolio.hero.badgeTitle} />
              <SubmitButton>Save hero</SubmitButton>
            </form>
          </DashboardCard>

          <DashboardCard id="contact" title="Contact Section" subtitle="Manage the final call-to-action and footer identity.">
            <form action={updateContactAction} className="grid gap-4 md:grid-cols-2">
              <Field name="title" label="Title" defaultValue={portfolio.contact.title} className="md:col-span-2" />
              <Textarea name="description" label="Description" defaultValue={portfolio.contact.description} className="md:col-span-2" />
              <Field name="email" label="Email" defaultValue={portfolio.contact.email || ""} />
              <Field name="primaryCta" label="Primary CTA" defaultValue={portfolio.contact.primaryCta} />
              <Field name="secondaryCta" label="Secondary CTA" defaultValue={portfolio.contact.secondaryCta} />
              <SubmitButton>Save contact</SubmitButton>
            </form>
          </DashboardCard>

          <DashboardCard id="sections" title="Section Content" subtitle="Edit every cinematic frontend section without redesigning the UI.">
            <div className="grid gap-5">
              <JsonSection title="About" section="about" value={portfolio.about} />
              <JsonSection title="Services" section="services" value={portfolio.services} />
              <JsonSection title="Projects" section="projects" value={portfolio.projects} />
              <JsonSection title="Education" section="education" value={portfolio.education} />
              <JsonSection title="Gallery" section="gallery" value={portfolio.gallery} />
              <JsonSection title="Social Links" section="socialLinks" value={portfolio.socialLinks} />
            </div>
          </DashboardCard>

          <DashboardCard id="share-links" title="Share Links" subtitle="Generate premium human-readable portfolio URLs and track usage.">
            <form action={createShareLinkAction} className="grid gap-4 md:grid-cols-2">
              <Field name="title" label="Title" defaultValue="Portfolio share" />
              <Field name="customAlias" label="Custom alias" placeholder="john-doe" />
              <Field name="note" label="Note" />
              <Field name="expiresAt" label="Expiration date" type="date" />
              <SubmitButton>Create share link</SubmitButton>
            </form>

            <div className="mt-6 grid gap-3">
              {shareLinks.map((link) => (
                <div key={link.id} className="rounded-xl border border-white/50 bg-white/45 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-bold text-gray-950">{link.title || "Portfolio share"}</p>
                      <p className="text-sm text-gray-600">{appUrl}/view/{link.customAlias || link.slug}</p>
                      <p className="text-xs text-gray-500">Visits: {link.visitCount} · Last opened: {link.lastOpenedAt?.toLocaleString?.() || "Never"}</p>
                    </div>
                    <form action={toggleShareLinkAction}>
                      <input type="hidden" name="id" value={link.id} />
                      <input type="hidden" name="active" value={String(link.active)} />
                      <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white">
                        {link.active ? "Disable" : "Enable"}
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </section>
      </div>
    </main>
  );
}

function DashboardCard({ id, title, subtitle, children }) {
  return (
    <article id={id} className="rounded-2xl border border-white/50 bg-white/55 p-5 shadow-[0_24px_90px_rgba(91,33,182,0.12)] backdrop-blur-xl md:p-7">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-950">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
      </div>
      {children}
    </article>
  );
}

function Field({ label, className = "", ...props }) {
  return (
    <label className={`grid gap-2 ${className}`}>
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <input {...props} className="rounded-xl border border-white/60 bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500" />
    </label>
  );
}

function Textarea({ label, className = "", ...props }) {
  return (
    <label className={`grid gap-2 ${className}`}>
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <textarea {...props} rows={5} className="rounded-xl border border-white/60 bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500" />
    </label>
  );
}

function JsonSection({ title, section, value }) {
  return (
    <form action={updateSectionJsonAction} className="rounded-xl border border-white/50 bg-white/40 p-4">
      <input type="hidden" name="section" value={section} />
      <label className="grid gap-2">
        <span className="text-sm font-bold text-gray-800">{title}</span>
        <textarea
          name="items"
          rows={8}
          defaultValue={JSON.stringify(value, null, 2)}
          className="font-mono text-xs rounded-xl border border-white/60 bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
        />
      </label>
      <button className="mt-3 rounded-lg bg-gray-950 px-4 py-2 text-sm font-semibold text-white">
        Save {title}
      </button>
    </form>
  );
}

function SubmitButton({ children }) {
  return (
    <button className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 md:col-span-2">
      {children}
    </button>
  );
}
