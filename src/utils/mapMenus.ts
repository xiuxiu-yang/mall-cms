import { IBreakCrumb } from '@/base-ui/breakcrumb'
import { UserMenus } from '@/service/login/type'
import { RouteRecordRaw } from 'vue-router'
export let firstMenu: string
export default function (userMenus: UserMenus[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  const Allroutes: RouteRecordRaw[] = []
  const routesFile = require.context('../router/main', true, /\.ts/)
  routesFile.keys().forEach((item) => {
    const route = require('../router/main' + item.substr(1))
    console.log(route)
    Allroutes.push(route.default)
  })

  const _recurse = (userMenus: UserMenus[]) => {
    for (const menu of userMenus) {
      if (menu.type === 2) {
        const route = Allroutes.find((item) => item.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu.url
        }
      } else {
        _recurse(menu.children)
      }
    }
  }
  _recurse(userMenus)
  return routes
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breakCrumb?: IBreakCrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 2 && currentPath === menu.url) {
      return menu
    } else if (menu.type === 1) {
      const findmenu = pathMapToMenu(
        menu.children ?? [],
        currentPath,
        breakCrumb
      )
      if (currentPath.split('/').length === 4 && findmenu) {
        breakCrumb?.push({ name: menu.name, path: menu.url, id: menu.id })
        breakCrumb?.push({ name: findmenu.name, id: findmenu.id })
        return findmenu
      }
    } else if (menu.type === 2 && currentPath.split('/').length === 6) {
      const findmenu = pathMapToMenu(
        menu.children ?? [],
        currentPath,
        breakCrumb
      )
      if (findmenu) {
        breakCrumb?.push({ name: menu.name, path: menu.url, id: menu.id })
        breakCrumb?.push({ name: findmenu.name, id: findmenu.id })
        return findmenu
      }
    } else if (menu.type === 3 && currentPath === menu.url) {
      return menu
    }
  }
}
export function pathBreakCrumbs(
  userMenus: any[],
  currentPath: string
): IBreakCrumb[] {
  const breakCrumbs: IBreakCrumb[] = []
  pathMapToMenu(userMenus, currentPath, breakCrumbs)
  return breakCrumbs
}

export function menuMaptoPermission(userMenus: any[]) {
  const permission: any[] = []

  const _recurse = (userMenus: any[]) => {
    for (const menu of userMenus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurse(menu.children ?? [])
      } else if (menu.type === 3) {
        permission.push(menu.permission)
      }
    }
  }
  _recurse(userMenus)
  return permission
}

export function menuMaptoId(userMenus: any) {
  const menuId: number[] = []

  const _recurse = (menuList: any) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurse(menu.children)
      } else {
        menuId.push(menu.id)
      }
    }
  }

  _recurse(userMenus)
  return menuId
}
