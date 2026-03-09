import { useEffect, useMemo, useState, type ChangeEvent, type SubmitEvent } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore";
export default function Header() {

    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    });
    const { pathname } = useLocation();
    const { fetchCategories, categories, searchRecipes, showNotification } = useAppStore();

    const isHome = useMemo(() => pathname === '/', [pathname])

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validar
        if (Object.values(searchFilters).includes('')) {
            showNotification({text: 'Completa los campos', error: true})
            return;
        }

        // Consultar las recetas
        searchRecipes(searchFilters);
    }

    return (
        <header className={isHome ? 'bg-image bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img src="/logo.svg" alt="logotipo" className="w-32" />
                    </div>

                    <nav className="flex gap-4">
                        <NavLink to={'/'} className={({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>Inicio</NavLink>
                        <NavLink to={'/favoritos'} className={({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>Favoritos</NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form
                        onSubmit={handleSubmit}
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                    >
                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >
                                Nombre o Ingredientes
                            </label>

                            <input
                                type="text"
                                id="ingredient"
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                                name="ingredient"
                                className="bg-white p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café" />
                        </div>

                        <div className="space-y-4">
                            <label
                                htmlFor="category"
                                className="block text-white uppercase font-extrabold text-lg"
                            >
                                Categoría
                            </label>

                            <select
                                id="category"
                                name="category"
                                onChange={handleChange}
                                value={searchFilters.category}
                                className="bg-white p-3 w-full rounded-lg focus:outline-none"
                            >
                                <option value="">-- Seleccione --</option>
                                {categories.drinks.map(drink => (
                                    <option value={drink.strCategory} key={drink.strCategory}>{drink.strCategory}</option>
                                ))}
                            </select>
                        </div>

                        <input type="submit" value="Buscar Recetas" className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase" />
                    </form>
                )}

            </div>
        </header>
    )
}
