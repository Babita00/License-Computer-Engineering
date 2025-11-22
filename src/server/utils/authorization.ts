import { userRole } from './../constants/userRole'
import { type User } from '../model/user.entity'

export function isSuperAdmin(user: User): boolean {
  return Boolean(user) && user.role === userRole.SUPER_ADMIN
}

export function isAdmin(user: User): boolean {
  return Boolean(user) && user.role === userRole.ADMIN
}

export function isAdminOrSuperAdmin(user: User): boolean {
  return (
    Boolean(user) &&
    (user.role === userRole.ADMIN || user.role === userRole.SUPER_ADMIN)
  )
}
