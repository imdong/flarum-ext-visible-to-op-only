import app from 'flarum/common/app';

type TranslatorParameters = Record<string, unknown>;

/**
 * 统一前缀
 */
export const extPrefix = 'imdong-visible-to-op-only'

/**
 * 获取一个 key
 * @param key
 */
export function key(key: string): string {
  return `${extPrefix}.${key.replace(/^\.*/, '')}`
}

/**
 * 获取特定 key 的翻译
 * @param id
 * @param parameters
 */
export function trans(id: string, parameters: TranslatorParameters = {}) {
  return app.translator.trans(key(id), parameters);
}

export default {
  extPrefix,
  key,
  trans
}
