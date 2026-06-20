export interface HomeUser {
  /** Initials shown in the top-right avatar. */
  initials: string;
  /** First name used in the "Hello, …" greeting. */
  greetingName: string;
  /** Whether the bell shows an unread dot. */
  hasNotifications: boolean;
}
