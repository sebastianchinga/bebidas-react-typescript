import {createOpenRouter} from '@openrouter/ai-sdk-provider'

// The SDK expects an explicit `apiKey` property when running in the browser.
// Vite exposes variables starting with `VITE_` via `import.meta.env`. Make sure
// you restart the dev server after changing `.env` so the value is injected.
export const openrouter = createOpenRouter({
    apiKey: import.meta.env.VITE_OPENROUTER_KEY as string // should be defined in .env
})