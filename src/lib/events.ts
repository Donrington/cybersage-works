// Cross-section signal: the studio lightbox asks the index to open a project row.

export const OPEN_PROJECT_EVENT = "works:open-project";

export function openProject(projectId: string) {
  window.dispatchEvent(new CustomEvent<string>(OPEN_PROJECT_EVENT, { detail: projectId }));
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
