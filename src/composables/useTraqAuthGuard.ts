import { useUserStore } from '@/stores/user'

/**
 * traQ OAuth認証またはAdmin権限が必要なAPI呼び出しをガードするComposable
 *
 * @returns requireTraqAuth - traQ認証またはAdmin権限チェック付きで関数を実行するラッパー
 * @returns isTraqAuthenticated - traQ認証済みかどうか
 * @returns isAdmin - Admin権限を持っているかどうか
 * @returns canEditProblem - 問題編集権限があるかどうか（Admin または traQ認証済み）
 */
export const useTraqAuthGuard = () => {
  const userStore = useUserStore()

  const isAdmin = () => userStore.user?.role === 'Admin'
  const isTraqAuthenticated = () => !!userStore.user?.authentication?.traqAuth
  const canEditProblem = () => isAdmin() || isTraqAuthenticated()

  /**
   * traQ認証またはAdmin権限チェック付きで関数を実行する
   * @param fn - Promiseを返す関数
   * @throws traQ認証もAdmin権限もない場合はエラーをスロー
   */
  const requireTraqAuth = async <T>(fn: () => Promise<T>): Promise<T> => {
    if (!canEditProblem()) {
      throw new Error('traQ認証またはAdmin権限が必要です')
    }
    return fn()
  }

  return {
    requireTraqAuth,
    isTraqAuthenticated,
    isAdmin,
    canEditProblem
  }
}
