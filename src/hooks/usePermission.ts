import { useStore } from '@/store'
export function usePermission(pageName: string, role: string) {
  const store = useStore()
  const permission = store.state.login.permission
  const permissionName = `system:${pageName}:${role}`

  return !!permission.find((item) => item === permissionName)
}
