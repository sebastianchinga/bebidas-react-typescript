import {createOpenRouter} from '@openrouter/ai-sdk-provider'

export const openrouter = createOpenRouter({
    api_keys: import.meta.env.VITE_OPENROUTER_KEY
})