import { ref, watch } from 'vue'
import { type LocationQueryValue, useRoute, useRouter } from 'vue-router'

/**
 * URL のクエリパラメータと双方向に同期した reactive な任意の型の state を作る Composable
 *
 * @template T - state の型
 * @param param - クエリパラメータ名
 * @param parser - クエリパラメータの配列の state への変換関数
 * @param serializer - state の値のクエリパラメータへの変換関数
 * @param pushHistory - state の変更時に履歴を push するかどうか
 * @returns 同期された state
 */
export const useQueryParam = <T>(
  param: string,
  parser: (queryValues: string[]) => T,
  serializer: (stateValue: T) => string | string[] | null | undefined,
  pushHistory = true
) => {
  const parseQueryValue = (value: LocationQueryValue | LocationQueryValue[]) => {
    const queryValues: LocationQueryValue[] = Array.isArray(value) ? value : [value]
    return parser(queryValues.filter((v): v is string => v != null))
  }

  const route = useRoute()
  const router = useRouter()
  const state = ref<T>(parseQueryValue(route.query[param]))

  // ページ遷移時にクエリパラメータを state に反映
  watch(
    () => route.query[param],
    (newVal: LocationQueryValue | LocationQueryValue[]) => {
      state.value = parseQueryValue(newVal)
    },
    { immediate: true }
  )

  // state の変更時にクエリパラメータを更新
  watch(state, async () => {
    const to = { query: { ...route.query, [param]: serializer(state.value) } }
    try {
      if (pushHistory) await router.push(to)
      else await router.replace(to)
    } catch (error) {
      console.error(`Failed to update query parameter: ${param}`, error)
    }
  })

  return state
}

/**
 * URL のクエリパラメータと双方向に同期した reactive な整数の state を作る Composable
 *
 * @param param - クエリパラメータ名
 * @param defaultValue - クエリパラメータが存在しない場合のデフォルト値
 * @param pushHistory - state の変更時に履歴を push するかどうか
 * @returns 同期された state
 */
export const useQueryParamInt = <T>(param: string, defaultValue: T, pushHistory = true) => {
  return useQueryParam<number | T>(
    param,
    (queryValues: string[]) => {
      const value = parseInt(queryValues[0])
      return isNaN(value) ? defaultValue : value
    },
    (stateValue: number | T) => stateValue?.toString(),
    pushHistory
  )
}

/**
 * URL のクエリパラメータと双方向に同期した reactive な真偽値の state を作る Composable
 *
 * @param param - クエリパラメータ名
 * @param defaultValue - クエリパラメータが存在しない場合のデフォルト値
 * @param pushHistory - state の変更時に履歴を push するかどうか
 * @returns 同期された state
 */
export const useQueryParamBool = (param: string, defaultValue: boolean, pushHistory = true) => {
  return useQueryParam<boolean>(
    param,
    (queryValues: string[]) =>
      ({ true: true, false: false })[queryValues[0]?.toLowerCase()] ?? defaultValue,
    (stateValue: boolean) => stateValue?.toString(),
    pushHistory
  )
}
