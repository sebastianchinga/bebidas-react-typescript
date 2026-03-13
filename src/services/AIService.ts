import {streamText} from 'ai';
import { openrouter } from '../lib/ai';

export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openrouter('gpt-4o-mini'),
            prompt,
            system: 'Eres un niño'
        })

        return result.textStream
    }
}