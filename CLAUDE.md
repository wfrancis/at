## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately – don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes – don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests – then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

### 7. Feedback-Revision Loop (HARD CONSTRAINT)
- When revising a document based on AI agent feedback:
  1. **Revise**: Deploy researcher + lawyer agents to rewrite the document addressing ALL open feedback
  2. **Save**: Timestamp the revision in `revisions/` directory (e.g., `revision_2026-03-18_v1.md`)
  3. **Track**: Log every addressed finding in `feedbackaddressed.md` with finding ID and resolution
  4. **Re-analyze**: Re-run ALL 5 feedback personas against the revised document
  5. **Update**: Append new findings to `feedbackrating.md` as a new dated section
  6. **Loop**: If ANY CRITICAL or HIGH findings remain, repeat from step 1
  7. **Exit**: Only stop when all CRITICAL and HIGH findings are resolved
- This loop is MANDATORY — never ship a document with unresolved CRITICAL/HIGH feedback
- Each loop iteration must show measurable progress (fewer findings than previous pass)
- If a loop iteration creates NEW findings, address those too before exiting

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
