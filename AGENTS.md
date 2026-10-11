<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Rural Camps decisions
- Tours/stays/prices live in `src/lib/catalog.ts` (phase 1) and the server recomputes booking totals from it — never trust browser prices.
- Booking requests and enquiries are written only via server functions with the admin client after zod validation; tables have RLS on with no public policies.
