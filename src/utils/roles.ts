export const ADMIN_ROLES = [
    {
      name: "Admin",
      id: 0,
      color: "green"
    },
    {
      name: "Moderator",
      id: 1,
      color: "purple"
    },
];

export const getAdminRoles = (id:number) => {
    const status = ADMIN_ROLES.find(option => option.id === id);
    if (!status) {
        return {
          colorScheme: "red",
          name: "Unknown"
        };
      }
    
      return {
        colorScheme: status.color,
        name: status.name,
        id: status.id
      };
};


export const ADMIN_ACCESS_ROUTES = [
    "/home/topup/create",
];  