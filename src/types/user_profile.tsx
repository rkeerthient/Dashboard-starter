export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  acl: {
    roleId: string;
    roleName: string;
    on: string;
    accountId: string;
    onType: string;
  }[];
}
