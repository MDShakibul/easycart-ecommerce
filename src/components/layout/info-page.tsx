export interface InfoSection {
  id?: string;
  heading: string;
  body: string[];
}

export interface InfoPageProps {
  title: string;
  description: string;
  updated: string;
  sections: InfoSection[];
}

export function InfoPage({
  title,
  description,
  updated,
  sections,
}: InfoPageProps) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
      <header className="border-b border-line pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-base text-ink-soft">{description}</p>
        <p className="mt-4 text-xs text-ink-muted">Last updated {updated}</p>
      </header>

      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.heading} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              {section.heading}
            </h2>
            <div className="mt-3 space-y-3">
              {section.body.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}