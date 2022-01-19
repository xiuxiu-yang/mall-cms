import ctRequest from '../../index'
enum IDashboardPath {
  categoryCount = '/goods/category/count',
  categoryFavor = '/goods/category/favor',
  categorySale = '/goods/category/sale',
  addressSale = '/goods/address/sale'
}

export function requestCategoryCount() {
  return ctRequest.get({
    url: IDashboardPath.categoryCount
  })
}

export function requestCategoryFavor() {
  return ctRequest.get({
    url: IDashboardPath.categoryFavor
  })
}

export function requestCategorySale() {
  return ctRequest.get({
    url: IDashboardPath.categorySale
  })
}

export function requestAddressSale() {
  return ctRequest.get({
    url: IDashboardPath.addressSale
  })
}
