import {includeIgnoreFile} from '@eslint/compat'
import oclif from 'eslint-config-oclif'
import prettier from 'eslint-config-prettier'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const gitignorePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '.gitignore')

export default [
  includeIgnoreFile(gitignorePath),
  ...oclif,
  prettier,
  {
    rules: {
      '@stylistic/padding-line-between-statements': 'off',
      'perfectionist/sort-classes': 'warn',
      'perfectionist/sort-object-types': 'warn',
      'perfectionist/sort-objects': 'warn'
    }
  }
]
