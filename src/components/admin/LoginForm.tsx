'use client'

import { useActionState } from 'react'
import { login, type LoginState } from '@/app/verwaltung/actions'

const initialState: LoginState = { error: '' }

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState)

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment px-6">
      <form
        action={formAction}
        className="w-full max-w-sm bg-cream border border-brass/40 rounded-2xl p-8 shadow-sm"
      >
        <p className="eyebrow mb-2">Acla Viglia Radons</p>
        <h1 className="font-serif text-soapstone text-2xl mb-6">
          Belegung verwalten
        </h1>

        <label
          htmlFor="password"
          className="block text-sm font-medium text-soapstone mb-2"
        >
          Passwort
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          className="w-full px-4 py-2.5 rounded-lg border border-brass/50 bg-parchment text-ink focus:outline-none focus:ring-2 focus:ring-brass"
        />

        {state.error && (
          <p className="mt-3 text-sm text-[#B1564A]">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full px-4 py-2.5 rounded-full bg-soapstone text-parchment font-medium hover:bg-larch transition-colors disabled:opacity-50"
        >
          {isPending ? 'Anmelden …' : 'Anmelden'}
        </button>
      </form>
    </div>
  )
}
