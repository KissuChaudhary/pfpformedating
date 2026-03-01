import { spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'

const res = spawnSync('supabase', ['gen', 'types', 'typescript', '--schema', 'public'], {
  encoding: 'utf-8'
})

if (res.status !== 0) {
  console.error(res.stderr || 'Failed to run supabase CLI')
  process.exit(res.status || 1)
}

const outPath = resolve(process.cwd(), 'types', 'supabase.ts')
mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, res.stdout, 'utf-8')
console.log(`Wrote ${outPath}`)
