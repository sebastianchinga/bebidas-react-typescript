import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createRecipesSlice, type RecipesSliceType } from './recipeSlice';
import { createFavoritesSlice, type FavoritesSliceType } from './favoritesSlice'
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice';

// RecipesSliceType: Es el type del slice
// ...a: Trae como argumentos los métodos get, set y api que serán obviamente una copia
export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>()(
    devtools((...a) => ({
        // Retorna una copia del slice creado donde le mandaremos los tres métodos con ...a
        ...createRecipesSlice(...a),
        ...createFavoritesSlice(...a),
        ...createNotificationSlice(...a)
    }))
)