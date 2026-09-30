import { WorkIndex } from "./WorkIndex";

/** Proof of Work: a numbered, year-grouped index of every shipped project. */
export function ProofOfWork() {
  return (
    <section id="work" aria-labelledby="work-heading" className="container-x section-y">
      <h2 id="work-heading" className="type-h2">
        Proof of work
      </h2>
      <WorkIndex />
    </section>
  );
}
