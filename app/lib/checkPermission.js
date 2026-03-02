

export function hasPermission(permissionName) {
    try {
      const permissions = localStorage.getItem('permission');
      return permissions.includes(permissionName);
    } catch (error) {
      console.error('Failed to check permission:', error);
      return false;
    }
  }
  