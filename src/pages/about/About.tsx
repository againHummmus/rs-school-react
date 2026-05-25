function About() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl p-6">
      <div className="flex flex-col gap-4 border border-foreground bg-foreground/10 rounded-3xl p-6 backdrop-blur-lg">
        <h1 className="text-background font-display text-center text-5xl">
          Seems like you want to learn more about this project! :3
        </h1>
      </div>
      <div className="flex flex-col gap-4 border border-foreground bg-foreground/10 rounded-3xl p-6 backdrop-blur-lg">
        <p className="text-lg leading-relaxed">
          This is an anime search application built as part of the{' '}
          <a href='https://rs.school/courses/reactjs' target="_blank" rel="noopener noreferrer" className="underline hover:opacity-75">RS School React Course</a>. It allows you to search for
          anime titles using the{' '}
          <a
            href="https://jikan.moe"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-75"
          >
            Jikan API
          </a>{' '}
          — an unofficial MyAnimeList REST API. For now it includes features like pagination, search history persistence, and error handling. The project is built with the following technologies:
        </p>
        <ul className="text-base list-disc list-inside space-y-1">
          <li>
            <strong>React 19</strong> with functional components and hooks
          </li>
          <li>
            <strong>TypeScript</strong> for type safety
          </li>
          <li>
            <strong>Vite</strong> for fast development and builds
          </li>
          <li>
            <strong>Tailwind CSS</strong> for styling
          </li>
          <li>
            <strong>React Router</strong> for client-side navigation
          </li>
          <li>
            <strong>Vitest</strong> + <strong>React Testing Library</strong> for
            unit tests
          </li>
        </ul>
      </div>
    </div>
  );
}

export default About;
