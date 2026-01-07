import { useUserStore } from '@/stores/user'

/**
 * traQ OAuth認証が必要なAPI呼び出しをガードするComposable
 *
 * @returns requireTraqAuth - traQ認証チェック付きで関数を実行するラッパー
 * @returns isTraqAuthenticated - traQ認証済みかどうか
 */
export const useTraqAuthGuard = () => {
  const userStore = useUserStore()

  const isTraqAuthenticated = () => !!userStore.user?.authentication?.traqAuth

  /**
   * traQ認証チェック付きで関数を実行する
   * @param fn - Promiseを返す関数
   * @throws traQ認証されていない場合はエラーをスロー
   */
  const requireTraqAuth = async <T>(fn: () => Promise<T>): Promise<T> => {
    if (!isTraqAuthenticated()) {
      throw new Error('traQ認証が必要です')
    }
    return fn()
  }

  return {
    requireTraqAuth,
    isTraqAuthenticated
  }
}
