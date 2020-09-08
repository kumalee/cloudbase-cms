// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  const canAdmin = currentUser?.customUserId ? true: false;
  console.log('canAdmin:', canAdmin);
  return {
    canAdmin,  // && currentUser.access === 'admin',
  };
}
